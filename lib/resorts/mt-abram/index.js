import coerce from '../../tools/coerce.js';
import rows from './rows.js';

// the grid mixes lifts, trails and connector routes; lifts are recognizable by name
export const isLift = name => /chair|t-bar|carpet|tow|gondola|machine/i.test(name);

export default function parse(dom) {
  return Object.fromEntries(
    rows(dom)
      .filter(r => !r.level && isLift(r.name))
      .map(({ name, status }) => [name, coerce(status)])
  );
}
