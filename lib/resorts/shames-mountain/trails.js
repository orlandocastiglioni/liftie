import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Shames (My Mountain Co-op) publishes no per-lift status and no open/closed
 * trail roster - the only run-level data on the snow-report page is a prose
 * "Groomed Runs" list: an <h4 id="runs">Groomed Runs:</h4> heading followed by
 * a single <p> of comma-separated run names, e.g.
 *   "Big Bunny, Boomerang, ... , Boa, and Exhibition."
 *
 * This is a GROOMING list, not a full roster: it enumerates only the runs
 * groomed/skiable that day and never lists closed runs, so every name we emit
 * is reported open (coerce maps 'open'/'groomed' -> open downstream). No
 * difficulty is published on this page, so rows carry name + status only.
 *
 * Parsing is deliberately tolerant of the hand-typed prose: strip the trailing
 * period, split on commas, and drop the Oxford "and " from the final token.
 * Compound entries such as "Lower & Upper Boundary Trail" contain no comma and
 * survive as a single run.
 */
export default function parse(dom) {
  const p = select(dom, 'h4#runs + p')[0];
  if (!p) {
    return [];
  }
  const text = allText(p)
    .trim()
    .replace(/\.\s*$/, '');
  return text
    .split(',')
    .map(name => name.replace(/^\s*and\s+/i, '').trim())
    .filter(Boolean)
    .map(name => ({ name, status: 'open' }));
}
