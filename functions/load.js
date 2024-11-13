import fs from "fs";

const load = (path) =>
  JSON.parse(fs.readFileSync(path).toString("utf-8")) || [];

export default load;
