import { dated, elements, label, status } from './report.js';

/**
 * SKIPISTE: eleven numbered runs (100-110). TypID is infosnow's piste type
 * icon, the same numbering as the portal report: 13 blau, 14 rot, 15 schwarz,
 * 16 gelb (a ski route). Mapped one step down on the Swiss three-tier scale as
 * lib/tools/infosnow-portal.js does - blau blue, rot black, schwarz
 * doubleBlack; gelb, and TypID 30 (the Bockmatti and Hora fun trails), get no
 * level. The Bockmatti run appears twice (105 trail, 106 blau), so the number
 * stays in the name.
 */
const GRADES = { 13: 'blau', 14: 'rot', 15: 'schwarz', 16: 'gelb' };
const LEVELS = { blau: 'blue', rot: 'black', schwarz: 'doubleBlack' };

export default function trails(data) {
  const rows = elements(data, 'SKIPISTE').map(e => {
    const grade = GRADES[e.TypID];
    return { name: label(e), status: status(e), level: LEVELS[grade], grade };
  });
  return dated(rows, data);
}
