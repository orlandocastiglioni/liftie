import { tables } from './tables.js';

// One trail table per chair ("Trail Name" / "Trail" / "Run Name" | Status |
// Groomed). No difficulty is published. A run named in two tables keeps its
// first row.
export default function trails(dom) {
  const seen = new Set();
  const rows = [];
  for (const table of tables(dom).filter(t => /^(trail|run)/i.test(t.header))) {
    for (const row of table.rows) {
      if (!seen.has(row.name)) {
        seen.add(row.name);
        rows.push(row);
      }
    }
  }
  return rows;
}
