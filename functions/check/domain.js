import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 0;

import { domain as RDAPCheck } from "node-rdap";
import psl from "psl";
import dateDiff from "./../date-diff.js";

const EXPIRATION = "expiration";

const domain = async (domain) => {
  try {
    return await RDAPCheck(psl.parse(domain).domain).then((data) => {
      for (let event of data.events || []) {
        if (event.eventAction === EXPIRATION) {
          return dateDiff(Date.now(), event.eventDate);
        }
      }
    });
  } catch (e) {}

  return -1;
};

export default domain;
