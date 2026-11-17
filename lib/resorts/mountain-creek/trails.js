import { rows } from './report.js';

// Trail | Status | Difficulty tables, one per peak. The difficulty icon titles
// are Beginner / Intermediate / Difficult / Freestyle, all known to
// normalizeLevel (Freestyle = terrain park). See report.js for the date gate.
export default function trails(dom) {
  return rows(dom, 'Trail');
}
