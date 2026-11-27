import select from '../../select.js';
import { gated, status, text } from './report.js';

/**
 * The "Trails Status" block (report.js): a table per tab panel - Downhill
 * Trails and Terrain Parks - both read, in page order. DIFFICULTY is the
 * Difficulty cell's word: Beginner, Intermediate and Advanced on the downhill
 * runs (the old plugin's advancedBeginner / advancedIntermediate / expert
 * scale, renamed - Advanced is Tamarack's black-diamond tier), Terrain Park on
 * the parks. All four are in normalizeLevel's map.
 */
export default function parse(dom) {
  return gated(dom, 'Trails Status', [], node => {
    const rows = [];
    for (const row of select(node, 'table.sr-table--trails tbody tr')) {
      const name = text(select(row, '.sr-trail__name')[0]).replace(/\s+/g, ' ').trim();
      if (!name) {
        continue;
      }
      const level = text(select(row, 'td[data-label="Difficulty"] .sr-icon-label span')[0]).trim();
      rows.push({ name, status: status(row), level: level || undefined });
    }
    return rows;
  });
}
