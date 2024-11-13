import "dotenv/config";

import cron from "./functions/run-cron.mjs";

await cron(true);
