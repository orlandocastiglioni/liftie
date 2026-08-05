import sections from './rows.js';

// difficulty comes from the section heading only, there is no per row marker
const levels = [
  [/beginner/i, 'green'],
  [/intermediate/i, 'blue'],
  [/advanced/i, 'black'],
  [/freestyle/i, 'terrainPark']
];

// trails share the slope report page (and the repeater markup) with the
// lifts - see rows.js
export default function parse(dom) {
  const trails = [];
  for (const { heading, rows } of sections(dom)) {
    const level = levels.find(([re]) => re.test(heading))?.[1];
    if (!level) {
      continue;
    }
    for (const row of rows) {
      trails.push({ ...row, level });
    }
  }
  return trails;
}
