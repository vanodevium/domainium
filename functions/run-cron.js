if (!process.env.DAYS) {
  console.error("Please set up DAYS environment value");
  process.exit(1);
}

import expCheck from "./domain-check.mjs";
import sslCheck from "./ssl-check.mjs";
import load from "./load.mjs";

const DOMAINS = load("./.domains.json");

const DAYS = process.env.DAYS.split(",")
  .filter(Boolean)
  .map((i) => +i);

const cron = async (notify = false) => {
  let ok = true;

  const result = {};
  const promises = [];

  DOMAINS.map((domain) => {
    result[domain] = {};
    promises.push(expCheck(domain).then((exp) => (result[domain].exp = exp)));
    promises.push(sslCheck(domain).then((ssl) => (result[domain].ssl = ssl)));
  });

  try {
    await Promise.all(promises).then(async () => {
      for (const [domain, data] of Object.entries(result)) {
        console.debug(domain, data);

        if (DAYS.includes(data.exp)) {
          ok = false;
          console.warning(`Domain ${domain} will expire in ${data.exp} day(s)`);
        }

        if (DAYS.includes(data.ssl)) {
          ok = false;
          console.warning(`SSL ${domain} will expire in ${data.ssl} day(s)`);
        }
      }
    });
  } catch (e) {
    console.error(e.message);

    console.warning("Houston, we have a problem");
  }

  if (ok && notify) {
    console.info("All domains are OK.");
  }
};

export default cron;
