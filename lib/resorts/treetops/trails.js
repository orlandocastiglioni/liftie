import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * The accordion group labels are "Terrain Parks", "Beginner Runs",
 * "Intermediate Runs", "Most Difficult Runs" and "Expert Runs" - none of
 * which liftie's levels map recognises with the trailing noun attached. The
 * noun is stripped first and the rest mapped explicitly, so an unfamiliar
 * group label yields no level instead of a wrong one. Treetops grades on six
 * steps and uses both "Most Difficult" (single black) and "Expert" (the two
 * glades, double black), which is exactly liftie's black / doubleBlack split.
 */
const levels = {
  terrain: 'terrainPark',
  beginner: 'green',
  intermediate: 'blue',
  mostdifficult: 'black',
  expert: 'doubleBlack'
};

/**
 * 31 runs in a Beaver Builder accordion on /live/, one group per difficulty.
 *
 *   <div class="p-2 w-50 list-group-item"><div class="row">
 *     <p class="col-2"><span class="run-status open">&bull;</span></p>
 *     <p class="col-10"><span class="run-name">Sitzmark</span></p>
 *   </div></div>
 *
 * Status is the MODIFIER CLASS on span.run-status, not its text (the text is
 * a bullet). The page's own stylesheet defines exactly two modifiers, .open
 * and .closed; a bare .run-status is left undefined and coerces to scheduled.
 *
 * Rows are read by zipping .run-status with .run-name inside each group
 * rather than by iterating .list-group-item: the Expert group packs its two
 * runs into a SINGLE .list-group-item, so a row-wrapper loop silently drops
 * "Rollaway". Zipping also survives the wrapper churn between page versions
 * (2024 put both classes on col-N spans, 2026 nests spans inside col-N <p>s);
 * .run-status / .run-name / the accordion label are the three stable hooks.
 */
export default function parse(dom) {
  const rows = [];
  for (const group of select(dom, '.fl-accordion-item')) {
    const label = findText(select(group, '.fl-accordion-button-label')[0]) ?? '';
    const level =
      levels[
        label
          .replace(/\s*(runs?|parks?)\s*$/i, '')
          .replace(/[\s_-]+/g, '')
          .toLowerCase()
      ];
    const statuses = select(group, '.run-status');
    const names = select(group, '.run-name');
    names.forEach((node, i) => {
      const name = findText(node)?.trim();
      if (!name) {
        return;
      }
      const status = statuses[i]?.attribs.class?.split(/\s+/).find(c => c === 'open' || c === 'closed');
      rows.push({ name, status, level });
    });
  }
  return rows;
}
