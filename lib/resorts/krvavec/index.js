import coerce from '../../tools/coerce.js';
import reportedAt from './reported-at.js';
import rows, { STAMP, values } from './rows.js';

/**
 * ŽIČNICE - faq-item 1 of /krvavec-data.json. 13 lifts; names are Slovenian
 * and encode the lift type (Krožna kabinska žičnica = gondola, Šestsedežnica =
 * six pack, Štirisedežnica = quad, Dvo-/Enosedežnica = double/single,
 * Vlečnica = surface tow, Otroški trak = magic carpet). They are unique
 * without their map code, so the code badge is stripped.
 *
 * Do not hardcode the roster: lifts get renamed by sponsor between seasons
 * ('Šestsedežnica Zvoh' in 2025 is 'Šestsedežnica OTP banka Zvoh' in 2026).
 */
export default function lifts(data) {
  const ls = {};
  for (const { name, status } of rows(data, 1)) {
    ls[name] = coerce(status);
  }
  const at = reportedAt(values(data, STAMP)[0]);
  if (at) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
