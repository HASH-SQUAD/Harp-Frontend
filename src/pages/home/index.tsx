//라이브러리
import React, { useState, useEffect } from 'react';

// 파일
import * as _ from './style';
import useStatusBarHeight from 'hooks/useStatusBarHeight';

interface DateData {
  id: number;
  day: string;
  date: number;
  state: boolean;
}

const Home = () => {
  const statusBarHeight = useStatusBarHeight();
  const [date, setData] = useState<DateData[]>([]);

  useEffect(() => {
    const today = new Date();
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const dates: DateData[] = [];

    for (let i = -3; i <= 3; i++) {
      const newDate = new Date();
      newDate.setDate(today.getDate() + i);

      dates.push({
        id: newDate.getTime(),
        day: daysOfWeek[newDate.getDay()],
        date: newDate.getDate(),
        state: i === 0
      });
    }

    setData(dates);
  }, []);

  return (
    <_.Home_Container>
      <_.Home_Layout StatusBarSize={`${statusBarHeight}px`}>
        <_.Home_Calendar>
          {date.map((day) => (
            <_.Home_Calendar_Content key={day.id}>
              <_.Home_Calendar_Content_Day State={day.state}>
                {day.day}
              </_.Home_Calendar_Content_Day>
              <_.Home_Calendar_Content_Date>
                {day.date}
                <_.Home_Calendar_Content_Point />
              </_.Home_Calendar_Content_Date>
            </_.Home_Calendar_Content>
          ))}
        </_.Home_Calendar>

        

      </_.Home_Layout>
    </_.Home_Container>
  );
};

export default Home;
