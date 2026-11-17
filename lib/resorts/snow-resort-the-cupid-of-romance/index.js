import { dated, items } from './report.js';

// tago on a lift is 天候回復待ち・点検中: stopped for weather or an inspection
const STATES = { cirle: 'open', tago: 'hold', icox: 'closed' };

/** six lifts: Pioneer, Sky, Silk, AI, Romance and Family */
export default function parse(dom) {
  return dated(
    Object.fromEntries(items(dom, 'リフト運行情報').map(([name, c]) => [name, STATES[c] ?? 'scheduled'])),
    dom
  );
}
