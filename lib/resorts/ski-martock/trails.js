import { dated, items, status } from './report.js';

/**
 * thirteen trails. LEVEL is the trail's group: easiest (green), intermediate
 * (blue), freestyle (the terrain park). Martock has no advanced group. The
 * map badge is not added to the name because two trails share badge 6.
 */
const LEVELS = { easiest: 'green', intermediate: 'blue', freestyle: 'terrainPark' };

export default function trails(data) {
  const rows = items(data, 'trails').map(i => ({
    name: i.name.trim(),
    status: status(i),
    level: LEVELS[i.group],
    grade: i.group
  }));
  return dated(rows, data);
}
