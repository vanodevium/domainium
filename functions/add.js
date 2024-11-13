import psl from "psl";
import load from "./load.js";
import restore from "./restore.js";
import normalize from "./normalize.js";

const add = (path, domain) => {
  const parsed = psl.parse(normalize(domain));
  if (parsed.error || !parsed.domain) {
    throw Error(parsed.error?.message || `Unrecognized domain: ${domain}`);
  }
  const domains = load(path);
  return !!restore(
    path,
    JSON.stringify(Array.from(new Set(domains).add(parsed.input))),
  );
};

export default add;
