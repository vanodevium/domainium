import fs from "fs";

function restore(path, text) {
  try {
    const json = JSON.parse(text);
    if (json) {
      fs.writeFileSync(path, JSON.stringify(json, null, 2));
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

export default restore;
