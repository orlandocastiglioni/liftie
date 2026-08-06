import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText, findText } from '../../tools/domutil.js';

/**
 * Shared row helpers for the /dashboard/ panels. Lifts, courses and tree-run
 * areas are all rendered as div.operation-status-item with the same shape:
 *
 *   <div class="operation-status-item ico-lift ico-lift--kg">Kiroro Gondola
 *     <span class="status close">Suspended </span></div>
 *   <div class="operation-status-item"><span class="num">8</span>Asari Course1-A
 *     <br>（Groomed）<span class="status open">Open</span></div>
 *
 * The English dashboard is the default at /dashboard/ (/en/ redirects to it,
 * /ja/ is the Japanese twin), so none of the JP glyph vocabulary in
 * tools/jp-status.js shows up here.
 *
 * NOT USED, on purpose: the same page still carries a legacy sidebar
 * (#sidebar-lifeStatus-container / #sidebar_courseStatus_container) stamped
 * 'Last updated2023-04-13 11:50:36'. It has been frozen since 2023 and lists
 * only nine lifts (no Gateway Express).
 */

// The name is the FIRST text node of the row. The span.num prefix is an
// element, and the （Groomed）/（Ungroomed）note sits in its own text node
// after the <br>, so neither can be folded into the name - grooming is neither
// a status nor a difficulty level.
export function itemName(node) {
  const t = node.children?.find(c => c.type === 'text' && c.data.trim());
  return t?.data.trim();
}

// The status SIGNAL is the second class on span.status, never the text.
const byClass = {
  active: 'open',
  open: 'open',
  close: 'closed'
};

// Fallback for a class we have not seen: the leading English word. Needed
// because none of the display texts survives coerce.js - 'Operating 9:00-15:30'
// and 'Closed 9:00-15:00' normalise to unknown strings and 'Suspended' is not
// in its map, so all three would silently become 'scheduled'.
const byWord = {
  operating: 'open',
  open: 'open',
  closed: 'closed',
  suspended: 'closed'
};

export function itemStatus(node) {
  const span = select(node.children, 'span.status')[0];
  if (!span) {
    return;
  }
  const cls = (span.attribs.class ?? '').split(/\s+/).find(c => c && c !== 'status');
  if (byClass[cls]) {
    return byClass[cls];
  }
  // A free-text note in Japanese can be appended inside the span after a <br>
  // ('Closed緩斜面で滑走が困難なため。Due to…'), so match a leading word rather
  // than the whole cell.
  const word = findText(span)
    ?.trim()
    .match(/^[a-z]+/i)?.[0]
    .toLowerCase();
  // anything still unrecognised goes to coerce, which logs it
  return byWord[word] ?? coerce(findText(span));
}

// The header widget dates the board in JST:
//   <p>Lift and Trail Status<br>2026/02/16 07:26</p>
export function reportedAt(dom) {
  for (const p of select(dom, '.widget-wrap p')) {
    const m = allText(p).match(/(\d{4})\/(\d{2})\/(\d{2})\s+(\d{1,2}):(\d{2})/);
    if (!m) {
      continue;
    }
    const [, y, mo, d, h, min] = m;
    const date = new Date(`${y}-${mo}-${d}T${h.padStart(2, '0')}:${min}:00+09:00`);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }
}
