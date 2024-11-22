//라이브러리
import React, { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';

//파일
import * as _ from './style';
import Header from 'components/Header';
import SurveyFoodData from 'data/SurveyFood';
import SurveyContent from 'components/SurveyContent';
import NextButton from 'components/NextButton';
import { selectedFoodsState, selectedFoodsStringState } from 'atoms/user';
import { formatSelectedContents } from 'lib/utils/formatSelectedContents';
import { useFlow } from 'stackflow';

const SurveyFood: ActivityComponentType = () => {
  const { push } = useFlow();
  const [selectedFoods, setSelectedFoods] = useRecoilState(selectedFoodsState);
  const [, setSelectedFoodsString] = useRecoilState(selectedFoodsStringState);

  const handleToggle = useCallback(
    (id: number) => {
      setSelectedFoods((prevState) => {
        const selectedCount = prevState.foods.filter(
          (item) => item.state
        ).length;

        const isItemSelected = prevState.foods.find(
          (item) => item.id === id
        )?.state;

        if (isItemSelected) {
          return {
            foods: prevState.foods.map((item) =>
              item.id === id ? { ...item, state: !item.state } : item
            )
          };
        } else if (selectedCount < 2) {
          return {
            foods: prevState.foods.map((item) =>
              item.id === id ? { ...item, state: !item.state } : item
            )
          };
        }
        return prevState;
      });
    },
    [setSelectedFoods]
  );

  const isFormValid = () => {
    const selectedCount = selectedFoods.foods.filter(
      (item) => item.state
    ).length;
    return selectedCount >= 1;
  };

  useEffect(() => {
    setSelectedFoodsString(formatSelectedContents(selectedFoods.foods));
  }, [selectedFoods]);

  return (
    <AppScreen>
      <_.SurveyFood_Container>
        <Header title="2" />
        <_.SurveyFood_Content>
          <_.SurveyFood_ProgressText>2/3</_.SurveyFood_ProgressText>
          <_.SurveyFood_MainText>
            당신의 음식 취향을
            <br />
            알려주세요.
            <_.SurveyFood_SubText>
              최대 2개까지 선택할 수 있어요!
            </_.SurveyFood_SubText>
          </_.SurveyFood_MainText>

          <_.SurveyFood_Contents>
            {SurveyFoodData.map((item) => {
              const currentItem = selectedFoods.foods.find(
                (stateItem) => stateItem.id === item.id
              );
              const state = currentItem ? currentItem.state : false;

              return (
                <SurveyContent
                  key={item.id}
                  width={150}
                  text={item.text}
                  img={item.img}
                  state={state}
                  onClick={() => handleToggle(item.id)}
                />
              );
            })}
          </_.SurveyFood_Contents>
        </_.SurveyFood_Content>
        <NextButton
          text="다음"
          state={!!isFormValid()}
          onNextClick={() => {
            push('SurveyMBTI', {});
          }}
        />
      </_.SurveyFood_Container>
    </AppScreen>
  );
};

export default SurveyFood;
