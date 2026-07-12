import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

const sections = {
  beginner: 'green',
  'more-difficult': 'blue',
  'most-difficult': 'black'
};

// per-difficulty <div class="beginner|more-difficult|most-difficult"><table>
// rows: <tr class="status-open|status-natural|status-closed">
//         <td class="status">O<span class="is-vishidden">open</span></td><td class="trail">...
// status-natural means open with natural snow only
export default function parse(dom) {
  const rows = [];
  for (const [cls, level] of Object.entries(sections)) {
    for (const row of select(dom, `div.${cls} table tr`)) {
      const m = row.attribs?.class?.match(/status-([a-z-]+)/);
      const name = findText(select(row.children, 'td.trail')[0])?.trim();
      if (!m || !name) {
        continue;
      }
      const status = m[1] === 'natural' || m[1] === 'open-natural-snow' ? 'open' : m[1];
      rows.push({ name, status, level });
    }
  }
  return rows;
}
