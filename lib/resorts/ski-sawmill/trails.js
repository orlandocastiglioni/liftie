import sections from './sections.js';

const levels = {
  'Beginner Trails': 'green',
  'Intermediate Trails': 'blue',
  'Expert Trails': 'black',
  'Terrain Park': 'terrainPark'
};

export default function parse(dom) {
  return sections(dom)
    .filter(r => r.section !== 'Lifts')
    .map(({ section, name, status }) => ({ name, status, level: levels[section] }));
}
