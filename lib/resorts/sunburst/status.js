import coerce from '../../tools/coerce.js';

/**
 * Shared status mapping for Sunburst's Ullr widget feed.
 *
 * Two shapes of the same vocabulary reach us:
 *  - lifts use the title-case option list stored on the object's `class`
 *    schema: Open, Closed, Scheduled, Hold, Wind hold, Weather delay, On Demand
 *  - trails use the widget bundle's uppercase enum: OPEN, CLOSED, SCHEDULED,
 *    HOLD, NOT_REPORTED, ARCHIVED
 *
 * coerce already handles open/closed/scheduled/hold and 'Wind hold'
 * (-> windhold). The three below are unknown to it and would silently degrade
 * to 'scheduled', which reads as "about to open" - the wrong way to be wrong.
 */
const overrides = {
  // Ullr lists this next to 'Wind hold', so it is a hold, not a coerce 'delay'
  weatherdelay: 'hold',
  // the lift only turns when a guest asks for it - not currently running
  ondemand: 'scheduled',
  // the operator has not reported: liftie already treats a blank cell as closed
  notreported: 'closed'
};

export default function ullrStatus(raw) {
  const token = String(raw ?? '')
    .replace(/[\s_-]+/g, '')
    .toLowerCase();
  return overrides[token] ?? coerce(raw);
}
