const normalize = (domain = "") => {
  return domain.trim().replace("http://", "").replace("https://", "");
};

export default normalize;
