import sslChecker from "ssl-checker";

const ssl = async (domain) => {
  try {
    return (
      await sslChecker(domain, {
        timeout: 5 * 1000,
      })
    ).daysRemaining;
  } catch (_) {}
  return -1;
};

export default ssl;
