import coerce from '../../tools/coerce.js';
import statusRows from './rows.js';

// four lifts, all in one Wix section; status vocabulary is {Open, Closed}
export default function parse(dom) {
  const status = {};
  for (const row of statusRows(dom, 'comp-kj4cpf91')) {
    status[row.name] = coerce(row.status);
  }
  return status;
}
