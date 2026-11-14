import { rows } from './table.js';

export default function parse(dom) {
  return Object.fromEntries(rows(dom, 'Lift').map(({ name, status }) => [name, status]));
}
