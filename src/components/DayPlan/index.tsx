import React, { useRef, useEffect, useState, useCallback } from 'react';
import Minus from 'assets/Icon/Minus';
import { schedule } from 'types/schedule';
import { formatTime } from 'lib/utils/formatTime';
import * as _ from './style';
import { formatSelectedDate } from 'lib/utils/formatSelectedDate';
import { PlanResult } from 'types/plan';
import { useFlow } from 'stackflow';

interface DayPlanProps {
  id?: string;
  isUpdated?: boolean;
  day: schedule[];
  dayIndex: number;
  planInfos?: PlanResult;
  setPlanInfos?: React.Dispatch<React.SetStateAction<PlanResult | null>>;
}

const DayPlan = ({
  id,
  isUpdated,
  day,
  dayIndex,
  planInfos,
  setPlanInfos
}: DayPlanProps) => {
  const { push } = useFlow();
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  const calculateDate = (startDate: string | undefined, dayIndex: number) => {
    if (!startDate) return '';

    const [year, month, day] = startDate.split('/').map(Number);
    const start = new Date(year, month - 1, day);

    start.setDate(start.getDate() + dayIndex);

    return formatSelectedDate(start, '.').slice(2);
  };

  const date = calculateDate(planInfos?.startDate, dayIndex);

  const handleUpdatePlan = (timeIndex: number) => {
    push('Memo', {
      id: id ?? '',
      dayIndex: dayIndex,
      timeIndex: timeIndex,
      planInfos: planInfos,
      date: date
    });
  };

  const handleDeletePlanItem = useCallback(
    (dayIndex: number, deletedIndex: number) => {
      if (!planInfos || !setPlanInfos) return;

      const dayKey = `day${dayIndex + 1}` as keyof typeof planInfos.data;

      const currentDay = planInfos.data[dayKey];

      if (!currentDay) return;

      if (Array.isArray(currentDay)) {
        const updatedDay = currentDay.filter(
          (_, index) => index !== deletedIndex
        );
        const updatedPlanInfos = {
          ...planInfos,
          data: {
            ...planInfos.data,
            [dayKey]: updatedDay
          }
        };

        setPlanInfos(updatedPlanInfos);
      }
    },
    [planInfos, setPlanInfos]
  );

  useEffect(() => {
    const newHeights = rightRefs.current.map((ref) =>
      ref ? ref.offsetHeight : 0
    );
    setHeights(newHeights);
  }, [day]);

  const sortedDay = [...day].sort((a, b) => {
    const [hourA, minuteA] = (a.time || '00:00').split(':').map(Number);
    const [hourB, minuteB] = (b.time || '00:00').split(':').map(Number);

    if (hourA === hourB) {
      return minuteA - minuteB;
    } else {
      return hourA - hourB;
    }
  });

  return (
    <_.DayPlan_Layout>
      <_.DayPlan_Times>
        <_.DayPlan_WhatDay>{dayIndex + 1}일차</_.DayPlan_WhatDay>
        <_.DayPlan_Date>{date}</_.DayPlan_Date>
      </_.DayPlan_Times>
      {sortedDay.map((plan, index) => {
        return (
          <_.DayPlan_Content key={index}>
            <_.DayPlan_Left>
              <_.DayPlan_TimeLabel>{formatTime(plan.time)}</_.DayPlan_TimeLabel>
              <_.DayPlan_Step
                style={{ marginTop: `${heights[index] / 6 - 10}px` }}
              >
                {index + 1}
              </_.DayPlan_Step>
            </_.DayPlan_Left>
            <_.DayPlan_Right
              onClick={() => {
                if (!isUpdated) {
                  handleUpdatePlan(index);
                }
              }}
              ref={(el) => (rightRefs.current[index] = el)}
            >
              <_.DayPlan_Activity>{plan.activity}</_.DayPlan_Activity>
              <_.DayPlan_Location>{plan.location}</_.DayPlan_Location>
              {isUpdated && (
                <_.DayPlan_Delete
                  onClick={(e) => {
                    e.stopPropagation();
                    if (handleDeletePlanItem) {
                      handleDeletePlanItem(dayIndex, index);
                    }
                  }}
                >
                  <Minus />
                </_.DayPlan_Delete>
              )}
            </_.DayPlan_Right>
          </_.DayPlan_Content>
        );
      })}
    </_.DayPlan_Layout>
  );
};

export default DayPlan;
