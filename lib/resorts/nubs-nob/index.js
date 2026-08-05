import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Gaslight Media "glm-ski-conditions" WordPress plugin: four sibling blocks
// keyed by data-region, of which only ski-lift-information holds lifts.
// Do not anchor on the wp-block column wrappers - their hashes change on edit.
export const RECORD = 'div.glm-conditions-record';

// status is icon-only (no text, no title attribute) so it has to be
// synthesized; cell-3 is a night-skiing lightbulb and cell-4 a snowmaking
// snowflake - neither is a status
export function status(node) {
  const cell = select(node, '.cell-1')[0];
  if (!cell) {
    return;
  }
  if (select(cell, '.open-icon').length) {
    return 'open';
  }
  if (select(cell, '.closed-icon').length) {
    return 'closed';
  }
}

export function name(node) {
  return findText(select(node, '.cell-0')[0]);
}

export default {
  selector: `div.glm-ski-conditions[data-region="ski-lift-information"] ${RECORD}`,
  parse(node) {
    const s = status(node);
    if (!s) {
      return;
    }
    return { name: name(node), status: s };
  }
};
