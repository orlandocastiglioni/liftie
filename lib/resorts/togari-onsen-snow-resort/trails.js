import { levels, rows } from './report.js';

/**
 * Seventeen courses. LEVEL is the Course Guide's grade badge for the same
 * name: level1 Easy (green), level2 Intermediate (blue), level3 Expert
 * (black). Dragon Park, the freestyle park, is terrainPark; the two contact
 * lines have no badge and get no level.
 */
const LEVELS = { level1: 'green', level2: 'blue', level3: 'black' };

export default function trails(dom) {
  const grades = levels(dom);
  return rows(dom, 'Course Status').map(({ name, status }) => {
    const g = grades.get(name);
    const level = /\bpark\b/i.test(name) ? 'terrainPark' : LEVELS[g?.cls];
    return { name, status, level, grade: g?.grade };
  });
}
