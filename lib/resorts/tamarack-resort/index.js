import { collect } from '../../tools/domutil.js';
import { isSummerReport, rowName, rowStatus } from './status.js';

// Lift rows carry an operating-schedule qualifier in the name - "Buttercup
// Chair - Open Weds-Sun" in winter, "Tamarack Express: Friday-Saturday" and
// "Tamarack Express: Sunday-Thursday" in the summer bike report, which are the
// same physical lift listed twice. Dropping everything from " - " / ": " keeps
// the lift key stable as the schedule changes and collapses those two summer
// rows back into one lift. No Tamarack lift name contains either delimiter.
function liftName(node) {
  return rowName(node)
    ?.split(/\s-\s|:\s/)[0]
    .trim();
}

// Scope to .mWPSLiftsWrap AND to the .type_lift list: a second "liftsList"
// with class type_freestyleTerrain lives inside the TRAILS wrapper and its
// rows also carry class liftItem - those are terrain parks, handled by
// trails.js. The selector is area-agnostic on purpose: the report is one
// "Tamarack Resort" .mWPSAreaWrap in winter but three bike-park areas in
// summer.
const SELECTOR = '.mWPSLiftsWrap .mWPSList.type_lift .mWPSItem.liftItem';
const PARSE = {
  name: liftName,
  status: rowStatus
};

// no lifts while the page is the summer bike-park report (status.js)
export default function parse(dom) {
  return isSummerReport(dom) ? {} : collect(dom, SELECTOR, PARSE);
}
