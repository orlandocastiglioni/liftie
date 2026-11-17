import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * bromontmontagne.com/en/detailed-conditions/ server-renders the whole board
 * (WordPress theme "Bromont"). PHP debug output sometimes leaks into the lift
 * rows as HTML comments and stray text (`time ferme : str ... bool(false)`),
 * so everything here anchors on the element classes, never on text order.
 *
 * WINTER GATE. The same URL carries the summer board all summer - bike trails,
 * the water park and bike-lift rows under #recap-remontes - with a different
 * set of #recap-* blocks. The winter board is the one with #recap-pistes (the
 * alpine trails). No #recap-pistes means "not the ski report": publish nothing,
 * lifts included, rather than the bike lifts.
 *
 * STALE GATE. The board stamps itself "Updated on 16-11-2026 21:12:49"
 * (day-month-year, Montreal wall clock) in div.maj-time; lib/tools/stale.js
 * suppresses a report provably older than its window and fails open when the
 * stamp is missing or unreadable.
 */
export function deepText(node) {
  if (!node) {
    return '';
  }
  if (Array.isArray(node)) {
    return node.map(deepText).join('');
  }
  if (node.type === 'text') {
    return node.data;
  }
  if (node.type === 'comment' || node.name === 'script' || node.name === 'style') {
    return '';
  }
  return (node.children ?? []).map(deepText).join('');
}

export function clean(text) {
  return text.replace(/\s+/g, ' ').trim();
}

export function reportedAt(dom) {
  const m = clean(deepText(select(dom, '.maj-time'))).match(/(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2})/);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute] = m;
  // Montreal wall clock; the hour or so of offset is irrelevant to a 45 day gate
  const when = new Date(`${year}-${month}-${day}T${hour}:${minute}:00-05:00`);
  return Number.isNaN(when.getTime()) ? undefined : when;
}

/** the winter board, or nothing at all */
export function winter(dom) {
  if (!select(dom, '#recap-pistes').length) {
    return false;
  }
  return !isStale(reportedAt(dom));
}

/** 'Open' / 'Closed' / '-' (not offered at that time of day) -> lowercase word or undefined */
export function word(node) {
  const t = clean(deepText(node)).toLowerCase();
  return t && t !== '-' ? t : undefined;
}

export function dated(result, dom) {
  const at = reportedAt(dom);
  if (at) {
    Object.defineProperty(result, 'reportedAt', { value: at.toISOString() });
  }
  return result;
}
