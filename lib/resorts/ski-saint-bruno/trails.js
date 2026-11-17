import { col, inSeason, rows } from './report.js';

/**
 * Slopes (north and south side) and the two snow parks. The level cell is an
 * SVG plus p.level-label with the resort's own word on the Quebec scale:
 * Easy (green circle), Hard (blue square), Very hard (black diamond). Parks
 * publish as terrainPark and keep the word as the grade. The map number stays
 * in the name: "Sous-bois" is both 6A and 13A, "Rabastaliere" 4a and 4b.
 */
const LEVELS = {
  easy: 'green',
  hard: 'blue',
  'very hard': 'black'
};

function row(r, park) {
  const name = [col(r, 'identifier'), col(r, 'name')].filter(Boolean).join(' ');
  const grade = col(r, 'level') || undefined;
  return {
    name,
    status: col(r, 'status'),
    level: park ? 'terrainPark' : LEVELS[grade?.toLowerCase()],
    grade
  };
}

export default function trails(dom) {
  if (!inSeason()) {
    return [];
  }
  return [...rows(dom, 'slope').map(r => row(r, false)), ...rows(dom, 'parc').map(r => row(r, true))];
}
