import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * holimont.com/slope-report/ is an Elementor page. The slope-report post type
 * behind it is empty over REST (acf is [], content is blank paragraphs), so
 * the rendered page is the only source.
 *
 * Each lift is one column (.elementor-widget-wrap): an h4 with the lift's
 * name, an h6 with its status (Open / Closed), then its slopes as pairs of
 * icon lists - one of names, each with an SVG grade icon, followed by one of
 * bare Open / Closed texts in the same order. The pairs are zipped in
 * document order. Grade icons: a green circle (#009444), a blue square
 * (#2b3990, unrotated rect) and a black diamond (#231f20, the rect rotated
 * 45 degrees). The legend and the snow-cam headings sit outside any lift
 * column with a status, so they never read as rows.
 *
 * The page heading dates the report ("Saturday, January 3rd, 2026 - Day# 22",
 * off-season "Tuesday, April 7th, 2026 - Closed for the Ski Season") and the
 * slope statuses are left as they were, so rows are gated on it through
 * lib/tools/stale.js. Fails open when no heading carries a date.
 */
const STATUSES = new Set(['open', 'closed']);
const DATE =
  /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})\b/i;

function textOf(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textOf).join(' ');
}

function clean(node) {
  return textOf(node).replace(/\s+/g, ' ').trim();
}

export function reportDate(dom) {
  for (const h2 of select(dom, 'h2.elementor-heading-title')) {
    const m = DATE.exec(clean(h2));
    if (m) {
      return new Date(`${m[1]} ${m[2]}, ${m[3]}`);
    }
  }
}

function closest(node, cls) {
  let n = node.parent;
  while (n && !(n.attribs?.class ?? '').split(/\s+/).includes(cls)) {
    n = n.parent;
  }
  return n;
}

function grade(li) {
  const svg = select(li, 'svg')[0];
  if (!svg) {
    return;
  }
  if (select(svg, 'circle').length) {
    return 'green';
  }
  const rect = select(svg, 'rect')[0];
  if (!rect) {
    return;
  }
  return /rotate/.test(rect.attribs.transform ?? '') ? 'black' : 'blue';
}

export function lifts(dom) {
  if (isStale(reportDate(dom))) {
    return [];
  }
  const out = [];
  for (const h4 of select(dom, 'h4.elementor-heading-title')) {
    const wrap = closest(h4, 'elementor-widget-wrap');
    const name = clean(h4);
    if (!name || !wrap) {
      continue;
    }
    // some lifts (Chipmunk in January) publish their slopes but no h6 status
    const h6 = clean(select(wrap, 'h6.elementor-heading-title')[0]);
    const status = STATUSES.has(h6.toLowerCase()) ? h6 : undefined;
    const trails = [];
    let names;
    for (const ul of select(wrap, 'ul.elementor-icon-list-items')) {
      const items = select(ul, 'li.elementor-icon-list-item');
      const texts = items.map(li => clean(select(li, '.elementor-icon-list-text')[0]));
      if (items.every(li => select(li, 'svg').length)) {
        names = items.map((li, i) => ({ name: texts[i], level: grade(li) }));
      } else if (names && texts.every(t => STATUSES.has(t.toLowerCase()))) {
        names.forEach((row, i) => {
          if (row.name && texts[i]) {
            trails.push({ ...row, status: texts[i] });
          }
        });
        names = undefined;
      }
    }
    if (status || trails.length) {
      out.push({ name, status, trails });
    }
  }
  return out;
}
