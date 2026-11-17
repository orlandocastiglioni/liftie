import { dated, items, status } from './report.js';

/** four lifts: the quad chair, the T-bar and its half-way unload, the magic carpet */
export default function parse(data) {
  return dated(Object.fromEntries(items(data, 'lifts').map(i => [i.name.trim(), status(i)])), data);
}
