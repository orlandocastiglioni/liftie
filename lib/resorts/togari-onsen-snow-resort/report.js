import select from '../../select.js';

/**
 * togari.jp/winter/en/course_map/ server-renders "Lift Status" and "Course
 * Status" (WordPress theme togari_ski) as tables of td.specT rows, grouped by
 * field (Earth Dragon / Sky Dragon). A row is the name - bare text for a lift,
 * div.specTBox for a course - and a state icon: span.on with icon_maru.svg
 * (running / open) or span.off with icon_batsu.svg (closed).
 *
 * SEASON GATE. The page has no update stamp. It is reset to all-closed after
 * the season, but nothing proves it always will be, so the page's own
 * "Operating Period" (2025.12.20（Sat）～2026.3.29（Sun）) is the guard: once
 * that season has ended, nothing is published from April through November.
 * December onward always publishes - if the period is not updated for the new
 * season, the gate must fail open rather than blank the resort in winter.
 */
function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function clean(s) {
  return s.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

export function seasonEnd(dom) {
  const period = select(dom, 'th.title').find(th => /Operating Period/i.test(text(th)));
  const value = period && clean(text(select(period.parent, 'td')[0]));
  const dates = [...(value ?? '').matchAll(/(\d{4})\.(\d{1,2})\.(\d{1,2})/g)];
  const last = dates.at(-1);
  if (!last) {
    return;
  }
  const [, y, m, d] = last;
  return new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T23:59:59+09:00`);
}

export function offSeason(dom, now = new Date()) {
  const end = seasonEnd(dom);
  if (!end || Number.isNaN(end.getTime())) {
    return false;
  }
  const month = now.getMonth();
  return now > end && month >= 3 && month <= 10;
}

const STATES = { maru: 'open', batsu: 'closed', sankaku: 'hold' };

export function rows(dom, title) {
  if (offSeason(dom)) {
    return [];
  }
  const heading = select(dom, 'h2.mTitle').find(h => clean(text(h)) === title);
  const section = heading?.parent;
  return (section ? select(section, 'td.specT') : []).flatMap(td => {
    const box = select(td, '.specTBox')[0];
    const name = clean(
      box
        ? text(box)
        : td.children
            .filter(c => c.type === 'text')
            .map(text)
            .join('')
    );
    const icon = select(td, 'img')[0]?.attribs.src ?? '';
    const state = STATES[icon.match(/icon_([a-z]+)\.svg/)?.[1]];
    return name ? [{ name, status: state ?? 'scheduled' }] : [];
  });
}

/** the Course Guide boxes: h4.title and a span.levelN with the grade word */
export function levels(dom) {
  const map = new Map();
  for (const box of select(dom, '.whiteCol__Box--Col3Con')) {
    const name = clean(text(select(box, 'h4.title')[0]));
    const span = select(box, 'span').find(s => /^level\d$/.test(s.attribs.class ?? ''));
    if (name && span) {
      map.set(name, { cls: span.attribs.class, grade: clean(text(span)) });
    }
  }
  return map;
}
