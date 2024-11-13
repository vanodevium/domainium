import psl from "psl";
import load from "./load.js";
import restore from "./restore.js";
import normalize from "./normalize.js";

const remove = (path, domain) => {
  const parsed = psl.parse(normalize(domain));
  if (parsed.error || !parsed.domain) {
    throw Error(parsed.error?.message || `Unrecognized domain: ${domain}`);
  }
  const domains = load(path);
  const set = new Set(domains);
  set.delete(parsed.input);
  return !!restore(path, JSON.stringify(Array.from(set)));
};

export default remove;
