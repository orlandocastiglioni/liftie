import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// status blocks are headed by h4.p-course__statusList__item-ttl
// (リフト情報 lifts / パーク情報 parks / コース情報 courses); each row is
// <th>name</th><td class="is-open|is-close">
export default function sections(dom) {
  const rows = [];
  let section;
  for (const node of select(dom, '.p-course__statusList__item-ttl, .p-course__status__table tr')) {
    if (/ttl/.test(node.attribs?.class ?? '')) {
      section = findText(node)?.trim();
      continue;
    }
    const name = findText(node.children.find(c => c.name === 'th'));
    const status = node.children.find(c => c.name === 'td')?.attribs.class?.match(/is-(open|close)/)?.[1];
    if (name && status) {
      rows.push({ section, name: name.trim(), status: status === 'close' ? 'closed' : 'open' });
    }
  }
  return rows;
}
