const dateDiff = (a, b) => {
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
};

export default dateDiff;
