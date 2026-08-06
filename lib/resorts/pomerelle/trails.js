import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';
import { repeaterRows } from './rows.js';

// Trail rows share /trail-map with the lifts ("trails": true).
//
// The name repeater (#comp-ku37eiiz) carries the run name plus a vector image
// whose svg path shape is the difficulty - diamond / square / circle. Wix
// re-uses the same three path definitions for every item, so matching on the
// path prefix is how the level is read.
//
// The status column is a SEPARATE pair of repeaters that wrap the single
// 31-item roster into two visual columns: #comp-ku3ccaz1 holds runs 0..15 and
// #comp-ku3clj0j holds runs 16..30, joined POSITIONALLY. Off season (and as of
// this fixture) both repeaters render 31 completely empty listitem shells -
// no icon, no text - so no status is published at all. Rows without a status
// token are dropped rather than emitted, because collect() would coerce a
// missing status to 'scheduled' and invent 31 runs that are neither open nor
// closed. Re-check in season: if the resort starts rendering check/X vector
// icons instead of text, this needs the icon shapes added below.
//
// Terrain parks (#comp-ku3eazgy) are intentionally not emitted - that repeater
// publishes park SIZE ('L'/'M'/'S'), never a status.
const SHAPES = [
  // diamond: 'M552.058 300.853L301 551.911...'
  [/^M552\.058 /, 'black'],
  // square: 'M180 20v160H20V20h160z'
  [/^M180 20v160H20V20h160z/, 'blue'],
  // circle: 'M180 100c0 44.183-35.817 80-80 80...'
  [/^M180 100c/, 'green']
];

function level(row) {
  const d = select(row, '.wixui-vector-image svg path')[0]?.attribs?.d ?? '';
  return SHAPES.find(([re]) => re.test(d))?.[1];
}

export default function parse(dom) {
  const names = repeaterRows(dom, 'comp-ku37eiiz', 1);
  const statuses = [...repeaterRows(dom, 'comp-ku3ccaz1', 2), ...repeaterRows(dom, 'comp-ku3clj0j', 3)];
  if (statuses.length !== names.length) {
    return [];
  }
  const rows = [];
  names.forEach((row, i) => {
    const name = findText(select(row, '.comp-ku37lb39 h5')[0] ?? select(row, 'h5')[0])?.trim();
    const status = allText(select(statuses[i], 'h5')[0] ?? statuses[i]).trim();
    if (name && status) {
      rows.push({ name, status, level: level(row) });
    }
  });
  return rows;
}
