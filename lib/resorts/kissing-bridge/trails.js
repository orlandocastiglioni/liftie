import { sections } from './report.js';

// every accordion section but Lifts and the uphill route list; see report.js
export default function trails(dom) {
  const seen = new Set();
  return sections(dom)
    .filter(({ title }) => title !== 'Lifts' && !/^uphill/i.test(title))
    .flatMap(({ title, items }) =>
      items.map(item => (/terrain park/i.test(title) ? { ...item, level: 'terrainPark' } : item))
    )
    .filter(({ name, status }) => status && !seen.has(name) && seen.add(name));
}
