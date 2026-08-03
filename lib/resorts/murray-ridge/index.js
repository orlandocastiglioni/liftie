import coerce from '../../tools/coerce.js';
import report, { commaList } from './report.js';

// The hill has exactly two lifts (per recon); the daily post never lists a
// full roster, only a "LIFTS OPEN: <comma-list>" line. So we key off the known
// roster and derive open/closed from membership in that list - a lift not named
// on the LIFTS OPEN line is closed. Names carry no status token of their own.
const LIFTS = ['T-Bar', 'Bunny Hill'];
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export default function parse(dom) {
  const open = new Set(commaList(report(dom), /lifts?\s+open\s*:?/i).map(norm));
  const status = {};
  for (const lift of LIFTS) {
    status[lift] = coerce(open.has(norm(lift)) ? 'open' : 'closed');
  }
  return status;
}
