import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';

// Mont Sutton is a server-rendered WordPress page. The lift table lives in
// div.lifts-conditions#lifts > table > tbody; the first row is a <th> header
// (no <td>) and is skipped. td[0] is the chairlift number (used as the name).
// STATUS comes from the status cell's CSS class token (ouvert/ferme, both known
// to coerce) - never the visible French text, which is Latin-1-in-UTF-8 mojibake
// ("Fermé" renders as garbage). We read the class of the class-bearing <td>.
export default function parse(dom) {
  const status = {};
  for (const tr of select(dom, 'div.lifts-conditions#lifts tbody tr')) {
    const tds = select(tr, 'td');
    if (tds.length === 0) {
      continue; // header row (<th> only)
    }
    const name = findText(tds[0])?.trim();
    const cell = tds.find(td => td.attribs?.class) ?? tds[tds.length - 1];
    const token = cell?.attribs?.class;
    if (name && token) {
      status[name] = coerce(token);
    }
  }
  return status;
}
