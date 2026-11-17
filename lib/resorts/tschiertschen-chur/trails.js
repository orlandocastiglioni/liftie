import { items } from './report.js';

/**
 * The runs, by type icon: pisteleicht (blue), pistemittel (red), pisteschwer
 * (black) and pistefreeride (yellow freeride run). Swiss three-tier colours
 * are mapped one step down, as lib/tools/infosnow-portal.js does: blau blue,
 * rot black, schwarz doubleBlack; the freeride run gets no level. Langlauf,
 * sledging and snowshoe rows are not ski runs and are left out.
 */
const GRADES = { pisteleicht: 'blau', pistemittel: 'rot', pisteschwer: 'schwarz', pistefreeride: 'gelb' };
const LEVELS = { blau: 'blue', rot: 'black', schwarz: 'doubleBlack' };

export default function trails(dom) {
  return items(dom)
    .filter(i => i.type in GRADES)
    .map(({ name, status, type }) => ({ name, status, level: LEVELS[GRADES[type]], grade: GRADES[type] }));
}
