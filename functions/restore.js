import fs from "fs";

const restore = (path, text) => {
  try {
    const json = JSON.parse(text);
    if (json) {
      fs.writeFileSync(path, JSON.stringify(json, null, 2));
      return true;
    }
  } catch (e) {}

  return false;
};

export default restore;
