import select from '../../select.js';
import coerce from '../../tools/coerce.js';

// ProcessWire page with a UIkit tab widget. `ul.uk-tab > li` carry the stable
// keys (currently-open-runs / currently-closed-runs / all-open-lifts) and
// `ul.uk-switcher > li` holds the panes in the SAME order, so the pane is
// resolved by index. Do not anchor on the pane's wrapper class - it changed
// from .content (2025) to .text-content (2026) - nor on #section-12561.
// Also ignore the ld+json on this page: its @id values carry ?firecrawl=1,
// i.e. it is a frozen crawler artifact, not live data.

// names are wrapped in Word-paste <font>/<span style> chains that differ per
// row, so collect text recursively rather than with findText/allText
function deepText(node) {
  if (node.type === 'text') {
    return node.data ?? '';
  }
  return (node.children ?? []).map(deepText).join('');
}

export function pane(dom, id) {
  const tabs = select(dom, 'section.tabs ul.uk-tab > li');
  const index = tabs.findIndex(li => li.attribs?.id === id);
  const panes = select(dom, 'section.tabs ul.uk-switcher > li');
  if (index < 0 || !panes[index]) {
    return [];
  }
  return (
    select(panes[index], 'p')
      // \s+ also swallows the &nbsp; ( ) that litters the pasted markup
      .map(p => deepText(p).replace(/\s+/g, ' ').trim())
      // the CMS emits <p>&nbsp;</p> spacers, and the closed pane holds a
      // permanent "Check Back for Closed Runs" placeholder
      .filter(name => name && !/^check back/i.test(name))
  );
}

// The page publishes no per-row status token - the tab IS the status, and it
// only ever lists what is OPEN, so a lift on windhold simply disappears.
// The roster is therefore hardcoded to render those as closed; matching is
// loose because the resort retypes the names by hand each season
// ("Bunny Hill Rope Tow" 2025/26 vs "Bunny Hill (Tow Rope)" 2024).
const roster = [
  { name: 'Bunny Hill Rope Tow', match: /bunny/i },
  { name: 'Hematite', match: /hematite/i },
  { name: 'Panorama', match: /panorama/i }
];

export default function parse(dom) {
  const liftStatus = {};
  const seen = new Set();
  for (const row of pane(dom, 'all-open-lifts')) {
    const known = roster.find(lift => lift.match.test(row));
    if (known) {
      seen.add(known.name);
    }
    liftStatus[known?.name ?? row] = coerce('open');
  }
  for (const lift of roster) {
    if (!seen.has(lift.name)) {
      liftStatus[lift.name] = coerce('closed');
    }
  }
  return liftStatus;
}
