import { caution, dated, sectors } from '../../tools/gettrail.js';

/**
 * The runs are the three mountain sectors (MONT BLANC, MONT FAUSTIN, MONT
 * BLANC NORD); their state is the first, alpine-ski column. Rows whose ski
 * column is Blank are the chalets and the restaurant listed in the same
 * sectors, not runs, and are skipped. The lift sector is the lifts, and the
 * "RANDONNÉE ALPINE | TOURING" sector lists uphill skinning routes, which are
 * left out.
 */
export default function trails(dom) {
  const rows = sectors(dom)
    .filter(s => !/^remont|^randonn/i.test(s.name))
    .flatMap(s => s.rows)
    .filter(row => row.states[0])
    .map(row => ({
      name: row.name,
      status: row.states[0],
      level: row.level,
      hazard: caution(row.labels[0]) || undefined
    }));
  return dated(rows, dom);
}
