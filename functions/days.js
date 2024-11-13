const days = (process.env.DAYS || "")
  .split(",")
  .filter(Boolean)
  .map((i) => +i);

export default days;
