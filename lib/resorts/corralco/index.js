import { collect } from '../../tools/domutil.js';
import reportedAt from './reported-at.js';
import status from './status.js';

// Lumiplan "Mountain Report" page (the resort's own estado.corralco.com
// redirects here). Same row shape as lib/tools/lumiplan.js, but deliberately
// not `export { default } from '../../tools/lumiplan.js'`: the shared tool runs
// every name through to-title-case, which corrupts a leading accented capital
// ("Águilas" -> "áGuilas"). Corralco has such a name in its trail section and
// the page already ships properly cased names, so take them verbatim.
//
// Row children are [0] type icon, [1] content, [2] pictos. Inside [2] the FIRST
// img is alt="statut damage" (grooming) and the SECOND is alt="statut ouverture"
// - read 2/1 or grooming gets published as the lift status.
export default function lifts(dom) {
  const ls = collect(dom, '.POI_title:contains(Lifts) + .liaisons .POI_info', {
    name: '1/0/0',
    status: {
      child: '2/1',
      attribute: 'src',
      regex: /lp_runway_trail_(\w+)\.svg$/,
      fn: status
    }
  });
  const at = reportedAt(dom);
  if (at) {
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
