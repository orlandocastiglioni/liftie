import { rows } from './widget.js';

/** the lifts category of every sector: TK drag lifts, TS/TSD chairs, TMX gondolas, carpets */
export default function parse(dom) {
  const list = rows(dom, 'lifts');
  const lifts = Object.fromEntries(list.map(({ name, status }) => [name, status]));
  if (list.reportedAt) {
    Object.defineProperty(lifts, 'reportedAt', { value: list.reportedAt });
  }
  return lifts;
}
