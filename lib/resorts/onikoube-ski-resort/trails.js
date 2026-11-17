import { dated, rows, status } from './report.js';

/**
 * Eight numbered courses. The guide above the table grades each run 初級 /
 * 中級 / 上級, but by letter and with different spellings (A.メローフィールド
 * vs 7.メロウフィールド), so no level is guessed from it.
 */
export default function trails(dom) {
  return dated(
    rows(dom, 'コース名').map(([name, cell]) => ({ name, status: status(cell) })),
    dom
  );
}
