import { rows } from './facilities.js';

/**
 * Pistes come back titled by their map number only ("1", "4a"), so they
 * publish as "Piste 1", "Piste 4a". The grade is the facility `type`:
 * easy-piste / medium-piste / difficult-piste2, mapped as hochzeiger maps the
 * same Micado codes (green / blue / black); a skiroute gets no level and
 * carries grade 'skiroute'.
 */
const LEVELS = {
  'easy-piste': 'green',
  'medium-piste': 'blue',
  'difficult-piste': 'black',
  'difficult-piste2': 'black'
};

export default function parse(body) {
  const list = rows(body);
  const out = list.map(({ facility, name, status }) => ({
    name: /^\d+[a-z]?$/i.test(name) ? `Piste ${name}` : name,
    status,
    level: LEVELS[facility.type],
    grade: /skiroute/i.test(facility.type ?? '') ? 'skiroute' : undefined
  }));
  if (list.reportedAt) {
    Object.defineProperty(out, 'reportedAt', { value: list.reportedAt });
  }
  return out;
}
