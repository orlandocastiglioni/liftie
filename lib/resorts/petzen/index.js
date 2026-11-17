import { rows } from './board.js';

export default function parse(dom) {
  return Object.fromEntries(rows(dom, 'lifts').map(({ name, status }) => [name, status]));
}
