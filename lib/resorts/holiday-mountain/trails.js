import { rows } from './report.js';

// the "Slopes" table, minus the snowtubing lane (not a ski trail); see report.js
export default function trails(dom) {
  return rows(dom, 'Slopes').filter(({ name }) => !/tubing/i.test(name));
}
