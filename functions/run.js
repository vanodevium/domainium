import expCheck from "./check/domain.js";
import sslCheck from "./check/ssl.js";

const devNull = () => {};
const defaultOptions = {
  domains: [],
  days: [],
  logger: {
    debug: devNull,
    info: devNull,
    warning: devNull,
    error: devNull,
  },
};

/**
 *
 * @param {{
 *     domains: string[],
 *     days?: number[],
 *     logger?: {},
 * }} options
 * @returns {Promise<{result: {}, ok: boolean}>}
 */
const run = async (options) => {
  options = Object.assign({}, defaultOptions, options);

  let ok = true;

  const result = {};
  const promises = [];

  options.domains.map((domain) => {
    result[domain] = {};
    promises.push(
      expCheck(domain).then((exp) => (result[domain].domainDaysUntil = exp)),
    );
    promises.push(
      sslCheck(domain).then((ssl) => (result[domain].sslDaysUntil = ssl)),
    );
  });

  try {
    await Promise.all(promises).then(async () => {
      for (const [domain, data] of Object.entries(result)) {
        options.logger.debug(domain, data);

        if (options.days.includes(data.domainDaysUntil)) {
          ok = false;
          options.logger.warning(
            `Domain ${domain} will expire in ${data.domainDaysUntil} day(s)`,
          );
        }

        if (options.days.includes(data.sslDaysUntil)) {
          ok = false;
          options.logger.warning(
            `SSL ${domain} will expire in ${data.sslDaysUntil} day(s)`,
          );
        }
      }
    });
  } catch (e) {
    options.logger.error(e.message);

    options.logger.warning("Houston, we have a problem");
  }

  if (ok) {
    options.logger.info("All domains are OK");
  }

  return {
    result,
    ok,
  };
};

export default run;
