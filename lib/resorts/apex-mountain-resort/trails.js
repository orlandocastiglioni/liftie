import groups from './rows.js';

// trail rows live on the same /weather/ page as the lifts (trails: true);
// flatten every lift-group's trails in page order. status ('open'/'closed') and
// level ('green'/'blue'/'black'/'doubleBlack'/'terrainPark') are already
// canonical liftie tokens - see rows.js.
export default function parse(dom) {
  const rows = [];
  for (const g of groups(dom)) {
    for (const t of g.trails) {
      rows.push({ name: t.name, status: t.status, level: t.level });
    }
  }
  return rows;
}
