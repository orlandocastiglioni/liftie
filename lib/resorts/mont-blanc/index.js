import { dated, firstState, sectors } from '../../tools/gettrail.js';

/**
 * skimontblanc.com's conditions page is an iframe of the GetTrail.info embed
 * for its team (lib/tools/gettrail.js). The lifts are the "REMONTÉES
 * MÉCANIQUES" sector: seven rows, carpets, triples and quads on Mont Blanc,
 * Mont Faustin and Mont Blanc Nord, whose state sits in the services column
 * (the alpine-ski column is Blank for every lift but the Tapis Blanc).
 */
export default function parse(dom) {
  const lifts = {};
  for (const sector of sectors(dom).filter(s => /^remont/i.test(s.name))) {
    for (const row of sector.rows) {
      lifts[row.name] = firstState(row) ?? 'scheduled';
    }
  }
  return dated(lifts, dom);
}
