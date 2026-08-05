import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

/**
 * WordPress plugin "ski-area-snow-report": one <p> per row, with a different
 * class per section - slope = lifts, trail, terrain-park, tubing. Only
 * p.slope-access-name is a lift (8 rows: 4 chairs + 4 rope tows);
 * p.tubing-access-name is the tubing hill and must stay out.
 *
 *   <p class="slope-access-name"><strong>Chair 1:</strong>
 *      <img class="status-icon" src=".../red-x-32.png"> Closed</p>
 *
 * Status comes from allText, which concatenates only the row's DIRECT text
 * children - i.e. the status word, whatever else the plugin wraps in tags.
 * A fixed child index would break across plugin versions: the 2025-04-24
 * capture has the identical markup with no status-icon <img> at all.
 *
 * Vocabulary is binary - the plugin's admin is a single "Status
 * (Closed/Open)" toggle and no third icon exists on the server - and coerce
 * knows both words.
 */
export default {
  selector: 'p.slope-access-name',
  parse(node) {
    const name = findText(select(node, 'strong')[0])?.replace(/:\s*$/, '').trim();
    if (!name) {
      return;
    }
    return { name, status: allText(node) };
  }
};
