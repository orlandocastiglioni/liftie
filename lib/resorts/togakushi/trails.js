import sections from './sections.js';

const courseLevels = { 初級: 'green', 中級: 'blue', 上級: 'black' };

export default function parse(dom) {
  return sections(dom)
    .filter(r => r.section !== 'リフト情報')
    .map(({ section, name, status }) => ({
      name,
      status,
      level: section === 'パーク情報' ? 'terrainPark' : courseLevels[name.match(/（(初級|中級|上級)/)?.[1]]
    }));
}
