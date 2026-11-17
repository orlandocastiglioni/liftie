import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * Elm Creek's cross-country trails, from Three Rivers Park District's shared
 * "Trail Conditions - Cross-Country Skiing" page (Drupal, the district that
 * also runs lib/resorts/hyland-hills). Each park is an <h3> followed by one
 * <p> of <br>-separated lines, every line a <strong> label and its value:
 *
 *   Good, Groomed: Valley Trail
 *   Fair, Groomed (Poor Track): Lake Trail, Northern Lights Trail
 *   Fair, Tracked: Eagle Trail, Monarch Trail       (colon outside <strong>)
 *   Closed: All Trails
 *   Notes: ...
 *   Updated: February 6, 2026 8:15 AM
 *
 * A label holding "Closed" closes its trails; any condition word (Good, Fair,
 * Poor, Groomed, Tracked, Packed, Ungroomed, Open) opens them - "Poor" is
 * still skiable by the page's own definitions. Notes / Updated / Multi-use
 * lines are not trails. Names are split on commas and "&" (2025: "Eagle &
 * Monarch Trails"), and a park may run over several <p>s. "All trails" expands to the roster below, which is
 * every trail the 2025 and 2026 winter captures name; a name not on it is
 * published as written. The district writes "Northern Lights" and
 * "Northern Lights Trail" interchangeably, so a trailing " Trail" is dropped.
 *
 * The downhill hill at Elm Creek publishes no per-run status anywhere (the
 * activity board only says the area is open or closed), so this is the
 * nordic side only, hence "no": { "lifts": true }.
 *
 * The block is never cleared: through summer 2026 it read "Closed: All Trails,
 * Closed for the season, Updated: April 1, 2026". The Updated line gates
 * every row through stale.js and travels as reportedAt; no date fails open.
 */
const PARK = /^elm creek/i;
const ROSTER = ['Valley', 'Lake', 'Northern Lights', 'Creek', 'Eagle', 'Monarch'];
const SKIP = /^(notes|updated|multi-use)/i;
const CLOSED = /closed/i;
const OPEN = /good|fair|poor|groomed|tracked|packed|open/i;

export default function parse(dom) {
  const lines = parkLines(dom);
  const list = [];
  if (!lines) {
    return list;
  }
  const reportedAt = updated(lines);
  if (reportedAt) {
    Object.defineProperty(list, 'reportedAt', { value: reportedAt });
    if (isStale(new Date(reportedAt))) {
      return list;
    }
  }
  const status = new Map();
  for (const { label, value } of lines) {
    if (SKIP.test(label)) {
      continue;
    }
    const state = CLOSED.test(label) ? 'closed' : OPEN.test(label) ? 'open' : undefined;
    if (!state) {
      continue;
    }
    const names = /^all trails$/i.test(value)
      ? ROSTER
      : value
          .split(/,|&| and /)
          .map(trailName)
          .filter(Boolean);
    for (const name of names) {
      // a trail listed under two grooming lines keeps its first reading, and
      // an "open" reading wins over a "closed" one
      if (!status.has(name) || state === 'open') {
        status.set(name, state);
      }
    }
  }
  for (const [name, s] of status) {
    list.push({ name, status: s });
  }
  return list;
}

function parkLines(dom) {
  const h3 = select(dom, 'h3').find(h => PARK.test(textOf(h)));
  if (!h3) {
    return;
  }
  // every <p> up to the next park heading (2025 split one park over two)
  const paragraphs = [];
  for (let node = h3.next; node && node.name !== 'h3' && node.name !== 'h2'; node = node.next) {
    if (node.name === 'p') {
      paragraphs.push(node);
    }
  }
  if (!paragraphs.length) {
    return;
  }
  // split each paragraph on <br> into lines, keeping the <strong> label apart
  const lines = [];
  for (const p of paragraphs) {
    let line = { label: '', value: '' };
    for (const node of p.children ?? []) {
      if (node.name === 'br') {
        lines.push(line);
        line = { label: '', value: '' };
      } else if (node.name === 'strong' && !line.value.trim()) {
        line.label += textOf(node);
      } else {
        line.value += node.type === 'text' ? node.data : textOf(node);
      }
    }
    lines.push(line);
  }
  return lines
    .map(({ label, value }) => ({
      label: clean(label).replace(/:$/, '').trim(),
      value: clean(value).replace(/^:/, '').trim()
    }))
    .filter(l => l.label);
}

function trailName(raw) {
  // "Lake Trail", and "Eagle & Monarch Trails" once split
  const name = clean(raw).replace(/\s+trails?$/i, '');
  return ROSTER.find(r => r.toLowerCase() === name.toLowerCase()) ?? name;
}

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

// "February 6, 2026 8:15 AM" / "March 20, 2026, 9:05 AM": Minneapolis wall
// clock. Only the day matters against a 45-day window, so it is dated at
// local noon (18:00 UTC is noon CST; CDT shifts it an hour, harmlessly).
// A line with no year ("March 24, 3:13 PM") is left undated: fail open.
function updated(lines) {
  const line = lines.find(l => /^updated/i.test(l.label));
  const m = line && /^([a-z]+)\.? (\d{1,2}),? (\d{4})/i.exec(line.value);
  const month = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
  if (month < 0) {
    return;
  }
  return new Date(Date.UTC(Number(m[3]), month, Number(m[2]), 18)).toISOString();
}

function clean(str) {
  return str.replace(/[\s ]+/g, ' ').trim();
}

function textOf(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textOf).join('');
}
