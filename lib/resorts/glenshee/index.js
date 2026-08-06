import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { findText } from '../../tools/domutil.js';

/**
 * Plain server-rendered HTML, one unauthenticated GET, no JS.
 *
 * The lifts board is the single <div class="span2 twocol"> introduced by an
 * <h4>Lifts</h4>; each lift is
 *   <div class="runtable"><label>Cairnwell Chairlift</label>
 *     <div> <span class="tag open"> Open </span></div>
 *     <div class="col-3"></div></div>
 *
 * The .span2.twocol scope is mandatory, not decoration: a bare .runtable also
 * matches the six Claybookie weather-station rows (Wind Speed, Temperature, …),
 * and span.tag is reused by the cafe rows in div#cafe. Both would show up as
 * phantom lifts.
 *
 * Status comes from the span's own class rather than its text. The three states
 * the site has ever emitted across eight winter captures (2024-01 .. 2026-03)
 * are open / closed / opening, and the text of the third is 'Expected to Open',
 * which coerce.js normalises to 'expectedtoopen' - unknown, so it falls through
 * to the 'scheduled' default while logging an unknown-status line for up to 12
 * rows on every poll. The class maps cleanly onto tokens coerce already knows.
 * The vocabulary cannot be proven closed (style.css defines a bare .tag with no
 * state modifiers), so an unseen class is passed through raw and lands on
 * 'scheduled' rather than being guessed open.
 *
 * Out of season the whole .span2.twocol block is dropped from the page (verified
 * live 2026-08-06) - that publishes an empty report, which is correct here, the
 * centre really has no lifts turning.
 */

const states = {
  open: 'open',
  closed: 'closed',
  opening: 'expected' // 'Expected to Open'; coerce: expected -> scheduled
};

export default function parse(dom) {
  const lifts = {};
  const block = liftsBlock(dom);
  if (!block) {
    return lifts;
  }
  for (const row of select(block, 'div.runtable')) {
    const name = findText(select(row, 'label')[0])?.trim();
    const tag = select(row, 'span.tag')[0];
    if (!name || !tag) {
      continue;
    }
    const state = (tag.attribs.class ?? '').split(/\s+/).find(c => c && c !== 'tag');
    lifts[name] = coerce(states[state] ?? state ?? findText(tag));
  }
  const at = parseStamp(findText(select(dom, 'section.banner.blue.srch h2')[0]));
  if (at) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(lifts, 'reportedAt', { value: at });
  }
  return lifts;
}

function liftsBlock(dom) {
  return select(dom, 'div.span2.twocol').find(block =>
    select(block, 'h4').some(h => findText(h)?.trim().toLowerCase() === 'lifts')
  );
}

const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * The page dates its own board in the banner heading: 'Lift Status at Tue 10
 * Feb 17:00pm'. Two quirks:
 *  - the markup is malformed ('<h2>…</p></h2>'), harmless for htmlparser2;
 *  - the am/pm suffix is decorative, the clock is already 24 hour ('17:00pm',
 *    '09:27am'), so the suffix is ignored rather than applied.
 *
 * There is no year. It is recovered - not invented - from the weekday the page
 * prints alongside the date: for a given day and month only one of the last two
 * years can fall on that weekday (consecutive years shift a fixed date by one
 * or two days), so the match is unambiguous. A stamp that matches neither, or
 * that would resolve into the future or more than a year back, yields nothing.
 * Wall clock is Europe/London, which is BST from late March, so the offset is
 * resolved per instant instead of being hardcoded to GMT.
 */
export function parseStamp(text, now = new Date()) {
  const m = text?.match(/at\s+(\w{3})\w*\s+(\d{1,2})\s+(\w{3})\w*\s+(\d{1,2}):(\d{2})/i);
  if (!m) {
    return;
  }
  const [, dow, day, mon, hour, minute] = m;
  const weekday = weekdays.indexOf(dow.toLowerCase());
  const month = months.indexOf(mon.toLowerCase());
  if (weekday < 0 || month < 0) {
    return;
  }
  const year = now.getUTCFullYear();
  for (const y of [year, year - 1]) {
    const date = new Date(Date.UTC(y, month, Number(day)));
    // rejects 29 Feb in a non-leap year, which rolls over to 1 Mar
    if (date.getUTCMonth() !== month || date.getUTCDate() !== Number(day)) {
      continue;
    }
    if (date.getUTCDay() !== weekday) {
      continue;
    }
    const at = london(y, month, Number(day), Number(hour), Number(minute));
    const age = now.getTime() - at.getTime();
    // an hour of slack for a site clock running ahead of ours
    if (age > -3600e3 && age < 400 * 864e5) {
      return at.toISOString();
    }
  }
}

const london = (() => {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  // offset of Europe/London at a given instant, in milliseconds
  function offset(ts) {
    const p = Object.fromEntries(fmt.formatToParts(new Date(ts)).map(part => [part.type, part.value]));
    return Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute) - ts;
  }
  return (year, month, day, hour, minute) => {
    const wall = Date.UTC(year, month, day, hour, minute);
    // two passes converge either side of a DST switch
    let ts = wall - offset(wall);
    ts = wall - offset(ts);
    return new Date(ts);
  };
})();
