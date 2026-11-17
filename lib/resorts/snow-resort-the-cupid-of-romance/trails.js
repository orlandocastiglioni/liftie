import select from '../../select.js';
import { clean, dated, items } from './report.js';

// tago on a course is 規制中・一部滑走可能: restricted but skiable
const STATES = { cirle: 'open', tago: 'open', icox: 'closed' };

/**
 * Thirteen rows; the sled course (そりコース) is not a ski run and is left
 * out, leaving the ten graded courses, the kids park and the AI course.
 *
 * LEVEL comes from the page's own course list (ul.b-courseList__list), where
 * each course's link class and em give its grade: c-elem 初級 (beginner,
 * green), c-inter 中級 (intermediate, blue), c-advan 上級 (advanced, black).
 * Courses missing from that list (kids park, AI course) get none.
 */
const LEVELS = { 'c-elem': 'green', 'c-inter': 'blue', 'c-advan': 'black' };

function grades(dom) {
  const map = new Map();
  for (const a of select(dom, '.b-courseList__list a')) {
    const name = clean(select(a, 'span')[0]?.children?.[0]?.data ?? '');
    const grade = clean(select(a, 'em')[0]?.children?.[0]?.data ?? '');
    const cls = (a.attribs.class ?? '').split(/\s+/).find(c => c in LEVELS);
    if (name) {
      map.set(name, { level: LEVELS[cls], grade: grade || undefined });
    }
  }
  return map;
}

export default function trails(dom) {
  const g = grades(dom);
  const rows = items(dom, 'ゲレンデ状況')
    .filter(([name]) => !/そり/.test(name))
    .map(([name, c]) => ({ name, status: STATES[c] ?? 'scheduled', ...g.get(name) }));
  return dated(rows, dom);
}
