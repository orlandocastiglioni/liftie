import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText, findText } from '../../tools/domutil.js';
import isStale from '../../tools/stale.js';

// Arctic Valley hand-maintains a WordPress block page and the "Lift Status"
// block moves around and changes shape between seasons: the Feb 2026 capture
// had <h2 class="wp-block-heading">Lift Status</h2><p>...</p>, the current
// page has <details><summary>• Lift Status</summary><p>...</p></details>.
// So the block is located by its heading text (either element, bullet
// stripped) and the paragraph that follows it is the report. Inside that one
// paragraph the lifts are "<strong>NAME: </strong>VALUE" rows separated by
// <br>; the colon is sometimes inside the <strong> and sometimes after it.
const HEADING = 'summary, h2.wp-block-heading';

// Arctic Valley never clears the report at the end of the season: through the
// summer the block keeps advertising the last operating day's hours ("Handle
// Tow: 12:00-6:00"), which this parser would happily publish as three open
// lifts in August. The page stamps the report with "Updated <Weekday> <Month>
// <Day>" (no year); see lib/tools/stale.js for the policy, which fails open so
// a reworded stamp can never blank the resort mid-season.

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

function label(node) {
  return findText(node)
    ?.replace(/^[\s•·-]+/, '')
    .trim();
}

function deepText(node) {
  if (Array.isArray(node)) {
    return node.map(deepText).join('');
  }
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  if (node.name === 'script' || node.name === 'style') {
    return '';
  }
  return (node.children ?? []).map(deepText).join('');
}

// date of the "Snow Report / Updated <Weekday> <Month> <Day>" stamp, or
// undefined when the page carries no stamp we recognise - which isStale treats
// as "publish anyway". The year is absent, so resolve to the most recent
// occurrence of that month/day at or before today.
function reportDate(dom) {
  const m = deepText(dom)
    .replace(/\s+/g, ' ')
    .match(/Snow Report\s*Updated\s*(?:[A-Za-z]+\s+)?([A-Za-z]+)\s+(\d{1,2})/i);
  if (!m) {
    return;
  }
  const month = MONTHS.indexOf(m[1].toLowerCase());
  const day = Number.parseInt(m[2], 10);
  if (month < 0 || !day) {
    return;
  }
  const now = new Date();
  const when = new Date(now.getFullYear(), month, day);
  return when > now ? new Date(now.getFullYear() - 1, month, day) : when;
}

// first element sibling after the heading, and only if it is the paragraph -
// if the theme ever wraps it we would rather report nothing than guess
function nextParagraph(node) {
  for (let n = node.next; n; n = n.next) {
    if (n.type === 'text' || n.type === 'comment') {
      continue;
    }
    return n.name === 'p' ? n : undefined;
  }
}

function rows(p) {
  const list = [];
  let row = { name: '', value: '' };
  for (const node of p.children ?? []) {
    if (node.type === 'text') {
      row.value += node.data;
    } else if (node.name === 'br') {
      list.push(row);
      row = { name: '', value: '' };
    } else if (node.name === 'strong') {
      row.name += allText(node);
    }
  }
  list.push(row);
  return list;
}

// the published value is the lift's operating hours, not an open/closed word,
// so nothing here is known to coerce.js: a time range means the lift ran that
// day, and the free-text "On wind hold" misses coerce's `windhold` key.
// Anything else is handed to coerce, which knows the plain words if the
// wording ever changes.
function status(value) {
  if (/wind\s*hold/i.test(value)) {
    return 'hold';
  }
  if (/closed/i.test(value)) {
    return 'closed';
  }
  if (/^\d{1,2}:\d{2}\s*[-–—]\s*\d{1,2}:\d{2}/.test(value)) {
    return 'open';
  }
  return value;
}

export default function parse(dom) {
  const lifts = {};
  if (isStale(reportDate(dom))) {
    return lifts;
  }
  const heading = select(dom, HEADING).find(node => /^lift status$/i.test(label(node) ?? ''));
  const report = heading && nextParagraph(heading);
  if (!report) {
    return lifts;
  }
  for (const row of rows(report)) {
    const name = row.name.trim().replace(/:$/, '').trim();
    const value = row.value.trim().replace(/^:\s*/, '').trim();
    if (name && value) {
      lifts[name] = coerce(status(value));
    }
  }
  return lifts;
}
