import { dated, elements, label, status } from './report.js';

/**
 * ANLAGE: the Unter dem Birg - Engstligenalp cable car (E01) and its GLOBI
 * cabin (E00), the four Dossen / Bockmatti / Zubringer T-bars and two beginner
 * tows - eight rows, named with their E-number as on the map.
 */
export default function parse(data) {
  const lifts = {};
  for (const e of elements(data, 'ANLAGE')) {
    const name = label(e);
    if (name) {
      lifts[name] = status(e);
    }
  }
  return dated(lifts, data);
}
