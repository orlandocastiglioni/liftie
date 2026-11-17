import { lifts } from './report.js';

// the slopes listed under each lift; a slope served by two lifts (Cascade,
// Greer, Chipmunk, Rabbits Run) keeps its first row. See report.js.
export default function trails(dom) {
  const seen = new Set();
  return lifts(dom)
    .flatMap(lift => lift.trails)
    .filter(({ name }) => !seen.has(name) && seen.add(name));
}
