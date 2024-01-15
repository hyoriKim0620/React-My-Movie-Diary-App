import dayjs from "dayjs";

export const getYMDFormat = (date: string) => {
  const newDate = dayjs(date).format("YYYY년 MM월 DD일");

  return newDate;
};
