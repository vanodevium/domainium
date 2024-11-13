import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 0;

import { domain as RDAPCheck } from "node-rdap";
import psl from "psl";
import dateDiff from "./date-diff.mjs";

const domainCheck = async (domain) => {
  try {
    return await RDAPCheck(psl.parse(domain).domain).then((data) => {
      for (let event of data.events) {
        if (event.eventAction === "expiration") {
          return dateDiff(Date.now(), Date.parse(event.eventDate));
        }
      }

      return -1;
    });
  } catch (e) {
    return -1;
  }
};

export default domainCheck;
