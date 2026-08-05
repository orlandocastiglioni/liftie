import { rows, status } from './feed.js';

// difficulty is Green | Blue | Black, all known to normalizeLevel. Sundance
// Park is the terrain park (its own section on the page) but the feed tags it
// Black, so its level is overridden here.
const levels = {
  'sundance-park': 'terrainPark'
};

// "MK Tubing" is the tubing park, which lives in its own /tubingTrails node as
// well - keeping it here would count the tubing hill as a green run.
const skip = new Set(['mk-tubing']);

export default function parse(body) {
  return rows(body)
    .filter(trail => !skip.has(trail.id))
    .map(trail => ({
      name: trail.name,
      status: status(trail.status),
      level: levels[trail.id] ?? trail.difficulty
    }));
}
