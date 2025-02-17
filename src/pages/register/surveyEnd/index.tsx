//라이브러리
import React from 'react';
import { useRecoilValue } from 'recoil';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { ActivityComponentType } from '@stackflow/react';

//파일
import * as _ from './style';
import Header from 'components/Header';
import NextButton from 'components/NextButton';
import RocketImage from 'assets/image/Rocket.png';
import { Auth_Survey, Auth_UserInfo } from 'lib/apis/Auth';
import {
  selectedFoodsStringState,
  selectedStylesStringState,
  stringMbtiState,
  tmiState,
  userInfosState
} from 'atoms/user';
import { useFlow } from 'stackflow';

const SurveyEnd: ActivityComponentType = () => {
  const { replace, pop } = useFlow();
  const { username, birthday, gender } = useRecoilValue(userInfosState);
  const styles = useRecoilValue(selectedStylesStringState);
  const foods = useRecoilValue(selectedFoodsStringState);
  const mbti = useRecoilValue(stringMbtiState);
  const tmi = useRecoilValue(tmiState);

  const handleRegister = async () => {
    try {
      await Auth_UserInfo({
        nickname: username,
        birthdate: birthday,
        gender: gender
      });

      await Auth_Survey({
        Q1: styles,
        Q2: foods,
        Q3: mbti,
        etc: tmi
      });

      for (let i = 0; i < 6; i++) {
        pop();
      }

      replace('Home', {}, { animate: false });
    } catch (error) {
      console.log(error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <AppScreen>
      <_.SurveyEnd_Container>
        <_.SurveyEnd_Header>
          <Header />
        </_.SurveyEnd_Header>
        <_.SurveyEnd_Content>
          <_.SurveyEnd_MainTitle>
            반가워요! 지금부터
            <_.SurveyEnd_Title>여행 계획을 세워볼까요?</_.SurveyEnd_Title>
            <_.SurveyEnd_SubTitle>
              하프와 함께 빠르고 편리한 여행 계획을 세워봐요
            </_.SurveyEnd_SubTitle>
            <_.SurveyEnd_Rocket src={RocketImage} />
          </_.SurveyEnd_MainTitle>
          <_.SurveyEnd_OtherInfo>
            더 알려주고 싶은 것이 있나요?
          </_.SurveyEnd_OtherInfo>
        </_.SurveyEnd_Content>

        <_.SurveyEnd_Bubble1 />
        <_.SurveyEnd_Bubble2 />
        <_.SurveyEnd_Bubble3 />
        <_.SurveyEnd_Bubble4 />
        <_.SurveyEnd_Bubble5 />
        <_.SurveyEnd_Bubble6 />
        <_.SurveyEnd_Bubble7 />
        <NextButton text="시작하기" state={true} onNextClick={handleRegister} />
      </_.SurveyEnd_Container>
    </AppScreen>
  );
};

export default SurveyEnd;
