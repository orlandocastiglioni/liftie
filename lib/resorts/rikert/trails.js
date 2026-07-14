import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

const levels = { easy: 'green', intermediate: 'blue', advanced: 'black', expert: 'doubleBlack' };

// Nordic Pulse embed page: the Angular TransferState JSON in script#ng-state
// carries the area's trails (open boolean, piste:difficulty, hazard)
export default function parse(dom) {
  const script = select(dom, 'script#ng-state')[0];
  if (!script) {
    return [];
  }
  const state = JSON.parse(findText(script) ?? '{}');
  const data = Object.values(state).find(v => v?.url?.includes('/data-npww'));
  return (data?.body?.trails ?? []).map(t => ({
    name: t.names?.en ?? t.name,
    status: t.hazard ? 'hold' : t.open ? 'open' : 'closed',
    level: levels[t['piste:difficulty']]
  }));
}
