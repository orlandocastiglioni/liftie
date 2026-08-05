import statusRows from './rows.js';

// trails are the rows of #tgtable before the "LIFT | STATUS" header row - see
// rows.js. Status is Open / Closed, both known to coerce.
//
// There is no difficulty column: the level is only encoded in the first cell's
// background image. The filenames carry WordPress re-upload suffixes
// (Easy-e1477746564526.png), so they are matched loosely, double diamond
// first. A row with no icon (url('')) gets no level rather than a guess -
// "Snake (Gladed/Natural Trail)" and "Snow Tubing" have both been published
// that way.
const levels = [
  [/doublediamond/i, 'doubleBlack'],
  [/diamond/i, 'black'],
  [/intermediate/i, 'blue'],
  [/easy/i, 'green']
];

export default function parse(dom) {
  return statusRows(dom)
    .filter(row => !row.isLift)
    .map(row => ({
      name: row.name,
      status: row.status,
      level: level(row)
    }));
}

function level({ name, icon }) {
  // there is no terrain-park icon, so the park is tagged with whatever
  // difficulty the editor felt like that week (Intermediate in March,
  // Diamond in January) - the name is the only reliable signal
  if (/terrain park/i.test(name)) {
    return 'terrainPark';
  }
  const file = icon.split('/').pop();
  return levels.find(([re]) => re.test(file))?.[1];
}
