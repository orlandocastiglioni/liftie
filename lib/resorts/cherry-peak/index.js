import coerce from '../../tools/coerce.js';
import isFresh from './fresh.js';
import statusRows from './rows.js';

// four lifts, all in one Wix section; status vocabulary is {Open, Closed}
export default function parse(dom) {
  const status = {};
  // last winter's report left up all year publishes nothing - see fresh.js
  if (!isFresh(dom)) {
    return status;
  }
  for (const row of statusRows(dom, 'comp-kj4cpf91')) {
    status[row.name] = coerce(row.status);
  }
  return status;
}
