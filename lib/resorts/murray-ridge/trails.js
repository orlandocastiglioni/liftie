import report, { afterLabel, commaList } from './report.js';

// Only what the daily post publishes is scrapeable: a "GROOMED RUNS" comma-list
// (=> open) and a "RUNS CLOSED" line (=> closed). There is no full 23-run roster
// and no per-run difficulty, so this report is intentionally partial and carries
// no levels. Rows are emitted in page order (the RUNS CLOSED line precedes the
// GROOMED RUNS line). The RUNS CLOSED value is prose ("... Do not attempt!"), so
// we keep only the first sentence and split it into named runs/areas.
const GROOMED = /groomed\s+runs\s*:?/i;
const CLOSED = /runs?\s+closed\s*:?/i;

export default function parse(dom) {
  const text = report(dom);
  const rows = [];
  const closed = afterLabel(text, CLOSED)
    .split(/[.!?]/)[0]
    .split(/\s*,\s*|\s+and\s+/i)
    .map(s => s.trim())
    .filter(Boolean);
  for (const name of closed) {
    rows.push({ name, status: 'closed' });
  }
  for (const name of commaList(text, GROOMED)) {
    rows.push({ name, status: 'open' });
  }
  return rows;
}
