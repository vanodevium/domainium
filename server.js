import { Hono } from "hono";
import { serve } from "@hono/node-server";
import load from "./functions/load.js";

const FILE = "./domains.json";

const app = new Hono();

app.get("/", (c) => c.json(load(FILE)));

serve(app);
