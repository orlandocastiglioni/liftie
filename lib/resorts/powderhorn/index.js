import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';

// powderhorn.com moved to a new WordPress theme for 26/27 ("pgri" blocks) and
// the old .bg-grey h3 / font-awesome icon markup is gone - the parser found
// no lifts from then on. The Lift Status block is now a
// .pgri-clist--lifts list: per-area p.pgri-clist__area headings, then one
// .pgri-clist__row per lift with span.pgri-clist__name and a
// span.pgri-clist__pill whose modifier class is the state. The theme's CSS
// styles --open, --groomed, --closed and --hold pills; the pill text
// (Closed / Open / ...) is the fallback for a modifier it has never seen.
const pills = {
  open: 'open',
  groomed: 'open',
  closed: 'closed',
  hold: 'hold'
};

function clean(node) {
  return allText(node ?? {})
    .replace(/\s+/g, ' ')
    .trim();
}

export default function parse(dom) {
  const lifts = {};
  for (const row of select(dom, '.pgri-clist--lifts .pgri-clist__row')) {
    const name = clean(select(row, '.pgri-clist__name')[0]);
    const pill = select(row, '.pgri-clist__pill')[0];
    if (!name || !pill) {
      continue;
    }
    const modifier = (pill.attribs.class ?? '').match(/pgri-clist__pill--([\w-]+)/)?.[1];
    lifts[name] = pills[modifier] ?? coerce(clean(pill));
  }
  return lifts;
}
