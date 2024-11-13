import "dotenv/config";

import run from "./functions/run.js";
import days from "./functions/days.js";
import domains from "./lib/domains.js";

await run({
  domains: domains.all(),
  days,
});
