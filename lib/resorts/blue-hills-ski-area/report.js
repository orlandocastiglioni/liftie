import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * bluehillsboston.com/conditions/ is a hand-edited WordPress (Kadence blocks)
 * page. Under an <h1>Conditions</h1> sits the report date as plain text
 * ("March 15, 2026"), then an <h2>LIFTS</h2> section and an
 * <h2>TRAILS OPEN</h2> section, each a run of Kadence info boxes: the name in
 * h5.kt-blocks-info-box-title, an icon, and for trails an optional
 * <p class="kt-blocks-info-box-text"><strong>X</strong></p> ("X = Closed").
 *
 * The icons are the Kadence custom-icon ids the editor picks per row:
 *   lifts   kb-custom-3353 check mark = running, kb-custom-3347 cross = not
 *   trails  fas_circle = green, kb-custom-3289 square = blue,
 *           kb-custom-3287 diamond = black
 * (shapes checked against the inline SVG paths in the 2026-11-17 capture;
 * the headline "Lifts: 2 Trails: 4" agrees with both readings). A lift with an
 * icon outside that table is skipped rather than guessed.
 *
 * The page is never cleared at season end - in November 2026 it still showed
 * the 2026-03-15 closing-weekend report - so the date gates every row through
 * stale.js. No date found fails open, as stale.js prescribes.
 */
const LIFT_ICONS = {
  'kb-custom-3353': 'open',
  'kb-custom-3347': 'closed'
};

const TRAIL_LEVELS = {
  fas_circle: 'green',
  'kb-custom-3289': 'blue',
  'kb-custom-3287': 'black'
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const DATE = new RegExp(`^(${MONTHS.join('|')}) (\\d{1,2}), (\\d{4})$`);

// the "X = Closed" legend is itself an info box inside the trails section
const LEGEND = /^x\s*=/i;

export default function report(dom) {
  const content = select(dom, '.entry-content')[0] ?? dom;
  const result = { lifts: [], trails: [] };
  let section;
  let reportedAt;
  walk(content, node => {
    if (node.name === 'h2') {
      const heading = textOf(node).toUpperCase();
      if (heading === 'LIFTS') {
        section = 'lifts';
      } else if (heading.startsWith('TRAILS')) {
        section = 'trails';
      }
      return true;
    }
    if (!reportedAt && node.name === 'p') {
      const m = DATE.exec(textOf(node));
      if (m) {
        reportedAt = localNoon(m);
      }
    }
    if (section && node.attribs?.class?.split(/\s+/).includes('wp-block-kadence-infobox')) {
      const box = infobox(node);
      if (box.name && !LEGEND.test(box.name)) {
        result[section].push(box);
      }
      return true;
    }
  });
  if (reportedAt && isStale(new Date(reportedAt))) {
    return { lifts: [], trails: [], reportedAt };
  }
  result.reportedAt = reportedAt;
  return result;
}

export function liftStatus(box) {
  return LIFT_ICONS[box.icon];
}

export function trailLevel(box) {
  return TRAIL_LEVELS[box.icon];
}

function infobox(node) {
  const title = select(node, '.kt-blocks-info-box-title')[0];
  const icon = select(node, '.kb-svg-icon-wrap')[0]
    ?.attribs.class.split(/\s+/)
    .find(c => c.startsWith('kb-svg-icon-') && c !== 'kb-svg-icon-wrap')
    ?.slice('kb-svg-icon-'.length);
  const marker = select(node, '.kt-blocks-info-box-text')[0];
  return {
    name: title ? textOf(title) : '',
    icon,
    crossed: marker ? /^x$/i.test(textOf(marker)) : false
  };
}

// depth-first; a visitor returning true does not descend
function walk(node, visit) {
  for (const child of node.children ?? []) {
    if (child.type === 'tag' && !visit(child)) {
      walk(child, visit);
    }
  }
}

function textOf(node) {
  return collect(node)
    .replace(/[\s ]+/g, ' ')
    .trim();
}

function collect(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(collect).join('');
}

// a calendar day with no time: date it at local noon in Boston so the
// zone never moves it across midnight
function localNoon([, month, day, year]) {
  return new Date(Date.UTC(Number(year), MONTHS.indexOf(month), Number(day), 17)).toISOString();
}
