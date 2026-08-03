import select from '../select.js';
import { findText } from './domutil.js';

const levels = { easy: 'green', intermediate: 'blue', advanced: 'black', expert: 'doubleBlack' };

/**
 * Shared trail parser for Nordic Pulse areas (nordic-pulse.com). The public
 * per-area JSON feed (api2.nordic-pulse.com/.../data-npww) is 403 to direct
 * requests, but the "?embed=true" page server-renders that same payload into
 * the Angular TransferState blob in <script id="ng-state">. We pull the
 * data-npww body out of that blob and map its trails.
 *
 * Resorts use it by pointing "trails" at their nordic-pulse embed page and
 * re-exporting this parser as their trails.js.
 */
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
