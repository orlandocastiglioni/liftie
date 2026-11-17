import { trails as pistes, report } from '../../tools/infosnow-portal.js';

/**
 * Pisten, category 2: 38 numbered runs graded blau / rot / schwarz plus six
 * gelb ski routes (31-38, marked but not groomed or patrolled, so grade only).
 * Funparks (5), sledging runs (3) and winter walks (4) come in the same fetch
 * and are left out: they are not ski runs.
 */
export default function trails(dom) {
  return pistes(report(dom), [2]);
}
