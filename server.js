import "dotenv/config";

import { Hono } from "hono";
import { serve } from "@hono/node-server";

import domains from "./lib/domains.js";
import run from "./functions/run.js";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    domains: domains.all(),
  });
});

app.get("/run", async (c) => {
  return c.json({
    result: await run({
      domains: domains.all(),
      days: [],
      logger: console,
    }),
  });
});

app.get("/add/:domain{.*}", async (c) => {
  try {
    const domain = c.req.param("domain");
    return c.json({
      success: domains.add(domain),
    });
  } catch (e) {
    c.status = 400;
    return c.json({
      success: false,
      error: e.message,
    });
  }
});

app.get("/remove/:domain{.*}", async (c) => {
  try {
    const domain = c.req.param("domain");
    return c.json({
      success: domains.remove(domain),
    });
  } catch (e) {
    c.status = 400;
    return c.json({
      success: false,
      error: e.message,
    });
  }
});

serve(app);
