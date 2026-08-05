import select from '../../select.js';

/**
 * The Loppet publishes no structured trail data of its own: the ski report is a
 * Google Doc that loppet.org embeds in an <iframe> on its conditions page. We
 * read the doc's own /pub rendering (the ?embedded=true variant carries a
 * frame-breakout script).
 *
 * It is a hand-written document, so the only durable hooks are div.doc-content
 * and the one-line-per-<p> structure - the cN class names Google emits are
 * regenerated on every republish. Name and status are separate <span>s inside
 * the same <p>, so we work off the paragraph's whole text.
 *
 * In summer the same document becomes a trail-mowing bulletin with no
 * "NAME: status" lines; returning [] then is correct, not a parser failure.
 */

// everything below one of these headings is dated race/closure prose, full of
// colons that would otherwise parse as trails
const STOP =
  /^(loppet event trail closures|wirth high school ski race schedule|single track bike\/hiking trails|facility & trail updates|event updates)/i;

// colon-bearing lines that are not trails ('TRAIL HOURS: Open 6am-10pm')
const NOT_A_TRAIL = /^(trail hours|upcoming closures)$/i;

// 'NAME: value' - the name is short and colon-free, the value is free prose
const ROW = /^([^:]{2,60}?)\s*:\s*(.*)$/;

// the natural-snow parks prefix their status with a distance ('WIRTH: ~20km Open')
const DISTANCE = /^~?\s*[\d.]+\s*km\b\s*/i;

// a trailing qualifier - '(lighted)', '(natural snow)' - is not part of the name
const QUALIFIER = /\s*\([^)]*\)\s*$/;

const MINOR_WORD = /^(a|an|and|at|for|in|of|on|the|to)$/i;

function paragraphText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(paragraphText).join('');
}

// names are written in caps in the source; title-case them to match the rest of
// liftie, but leave anything already mixed-case as the crew wrote it
function titleCase(name) {
  if (/[a-z]/.test(name)) {
    return name;
  }
  return name
    .toLowerCase()
    .split(' ')
    .map((word, i) => (i > 0 && MINOR_WORD.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}

// 'closed' is checked first because a value can read 'Closed - Needs more snow'.
// Anything else non-empty ('Ungroomed', 'rolled') means skiable but not
// machine-groomed, i.e. open - and neither word is known to coerce, so it would
// otherwise degrade to 'scheduled'.
function statusOf(value) {
  if (/\bclosed\b/i.test(value)) {
    return 'closed';
  }
  return 'open';
}

export default function parse(dom) {
  const doc = select(dom, '.doc-content')[0];
  if (!doc) {
    return [];
  }
  const rows = [];
  for (const p of select(doc, 'p')) {
    // Google Docs pads its spans with non-breaking spaces
    const line = paragraphText(p)
      .replace(/\u00a0/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!line) {
      continue;
    }
    if (STOP.test(line)) {
      break;
    }
    // a paragraph without a colon is a section heading ('Natural Ski Trails')
    const row = line.match(ROW);
    if (!row || NOT_A_TRAIL.test(row[1])) {
      continue;
    }
    // 'CHAIN OF LAKES:' can appear with its detail on the following paragraph -
    // an empty value carries no status, so drop the row
    const value = row[2].replace(DISTANCE, '').trim();
    const name = titleCase(row[1].replace(QUALIFIER, '').trim());
    if (!value || !name) {
      continue;
    }
    // no difficulty is published for these trails, so no level is reported
    rows.push({ name, status: statusOf(value) });
  }
  return rows;
}
