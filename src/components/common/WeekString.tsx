import React from "react";

function getCurrentYearMonthWeek(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // JS 월은 0~11
  const day = today.getDate();

  // 이번 달 1일부터 오늘까지 며칠?
  const week = Math.ceil(day / 7); // 1~7일 = 1주, 8~14일 = 2주 ...

  return `${year}년 ${month}월 ${week}주`;
}


export default function WeekString () {
  const [weekText, setWeekText] = React.useState(getCurrentYearMonthWeek());

  React.useEffect(() => {
    // 하루가 바뀌면 자동 업데이트 (옵션)
    const interval = setInterval(() => {
      setWeekText(getCurrentYearMonthWeek());
    }, 1000 * 60 * 60); // 한 시간마다 체크
    return () => clearInterval(interval);
  }, []);

  return <span>{weekText}</span>;
};

