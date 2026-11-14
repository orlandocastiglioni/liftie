import { rows } from './rows.js';

export default function parse(dom) {
  return Object.fromEntries(rows(dom, 'lifts-open').map(({ name, status }) => [name, status]));
}
