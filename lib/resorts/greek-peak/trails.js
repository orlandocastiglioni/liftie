import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

const emojiLevels = {
  '🟢': 'green',
  '🟦': 'blue',
  '🔵': 'blue',
  '♦': 'black',
  '♦♦': 'doubleBlack',
  '⛰': 'terrainPark'
};

const rank = { open: 0, closed: 1 };

// #gp-trail-table rows: name cell starts with a difficulty emoji,
// day column class carries trail-open/trail-closed (cell text is a time in
// season). The page renders TWO #gp-trail-table tables (a featured subset +
// the full list) with some trails in both - merge by name, open wins.
export default function parse(dom) {
  const byName = new Map();
  for (const row of select(dom, '#gp-trail-table tr')) {
    const tds = row.children.filter(c => c.name === 'td');
    const nameCell = tds.find(c => c.attribs?.class?.includes('trail-col-name'));
    const day = tds.find(c => c.attribs?.class?.includes('trail-col-day'));
    const m = day?.attribs.class.match(/trail-(open|closed)/);
    if (!nameCell || !m) {
      continue;
    }
    const text = allText(nameCell).replace(/\s+/g, ' ').trim();
    const parts = text.match(/^(\S*?)\s*([A-Za-z0-9(].*)$/);
    if (!parts) {
      continue;
    }
    const trail = {
      name: parts[2].trim(),
      status: m[1],
      level: emojiLevels[parts[1]]
    };
    const prev = byName.get(trail.name);
    if (!prev) {
      byName.set(trail.name, trail);
    } else {
      if (rank[trail.status] < rank[prev.status]) {
        prev.status = trail.status;
      }
      prev.level ??= trail.level;
    }
  }
  return [...byName.values()];
}
