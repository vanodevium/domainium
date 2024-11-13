import dayjs from "dayjs";

const dateDiff = (a, b) => {
  return dayjs(b).diff(dayjs(a), "days");
};

export default dateDiff;
