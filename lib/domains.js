import add from "../functions/add.js";
import remove from "../functions/remove.js";
import load from "../functions/load.js";

class Domains {
  FILE = ".domains.json";

  all() {
    return load(this.FILE);
  }

  add(domain) {
    return add(this.FILE, domain);
  }

  remove(domain) {
    return remove(this.FILE, domain);
  }
}

export default new Domains();
