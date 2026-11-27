import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { badge, items, label } from './rows.js';

// One lift per <details> block (rows.js): its name and badge sit in the
// <summary>; the trail rows below carry badges of their own, hence the
// summary scope. Six lifts: Chairs 1-5 and the Prospector Adventure lift
// (the redesign dropped the trailing 'Lift' from its name).
export default function parse(dom) {
  const lifts = {};
  for (const item of items(dom)) {
    const head = select(item, 'summary')[0];
    const name = label(select(head, '.status-list__name')[0]);
    const status = badge(select(head, '.status-badge')[0]);
    if (name && status) {
      lifts[name] = coerce(status);
    }
  }
  return lifts;
}
