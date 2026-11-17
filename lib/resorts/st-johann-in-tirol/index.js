import { rows } from './facilities.js';

export default function parse(body) {
  const list = rows(body);
  const lifts = Object.fromEntries(list.map(({ name, status }) => [name, status]));
  if (list.reportedAt) {
    Object.defineProperty(lifts, 'reportedAt', { value: list.reportedAt });
  }
  return lifts;
}
