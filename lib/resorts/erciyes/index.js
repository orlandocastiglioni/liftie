import coerce from '../../tools/coerce.js';
import rows from './rows.js';

/**
 * Lifts are the 'Teleferikler' rows of the four gate tables (see rows.js);
 * 18 of them, and that is everything the resort publishes.
 *
 * Every lift is qualified with its gate. Erciyes is four separate base areas on
 * one mountain and the gate is part of a lift's identity, but the immediate
 * reason is that it has to be: 'Yürüyen Bant' (magic carpet) is listed under
 * both Tekir Kapı and Hacılar Kapı, and an unqualified name would silently drop
 * one of the two.
 */
export default function parse(dom) {
  const lifts = {};
  for (const row of rows(dom)) {
    if (row.category !== 'teleferikler') {
      continue;
    }
    lifts[row.gate ? `${row.name} (${row.gate})` : row.name] = coerce(row.status);
  }
  return lifts;
}
