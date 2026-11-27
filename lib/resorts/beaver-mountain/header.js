import select from '../../select.js';
import { deepText } from './fresh.js';

/**
 * The conditions page leads with its own totals, above the lift accordion:
 *
 *   <div class="... lifts_runs end">
 *     <h6><span class="number">0</span> <span class="open lifts">Lifts Open</span></h6>
 *   <div class="... lifts_runs end">
 *     <h6 class="open_runs"><span class="number">0</span> <span class="open lifts">Runs Open</span></h6>
 *
 * Those two numbers are the resort's own headline and the cross-check for the
 * per-run board below, which is NOT reset between days: on 2026-11-26, before
 * opening day, the header read "0 Lifts Open 0 Runs Open" while 33 of the 48
 * runs still carried Open / Groomed from early-season grooming and track
 * packing. See trails.js for how the two are reconciled.
 *
 * Returns { lifts, runs }, each a number or undefined when the page does not
 * carry it - an absent header must never be read as zero.
 */
export default function headerCounts(dom) {
  const counts = {};
  for (const h6 of select(dom, '.lifts_runs h6')) {
    const m = deepText(h6)
      .replace(/\s+/g, ' ')
      .match(/(\d+)\s*(Lifts|Runs) Open/i);
    if (m) {
      counts[m[2].toLowerCase()] = Number(m[1]);
    }
  }
  return counts;
}
