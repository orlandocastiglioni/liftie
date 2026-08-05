/**
 * Mt. Shasta Ski Park publishes its report through two Google Forms whose
 * response sheets are "published to web" as CSV. Both sheets are append-only:
 * row 0 is the header and every update adds a row, so the current report is
 * always the LAST row - that is exactly what the resort's own page scripts do
 * (`const data = rows[rows.length - 1]`).
 *
 * Columns must be looked up by header text, not by index: the header row of
 * the daily-conditions sheet already carries four stray cells left over from
 * an edit, and the operator adds/reorders form questions between seasons.
 * Header matching is dash/space/case insensitive, like the site's findCol().
 *
 * Off-season the response rows are cleared and only the header remains; the
 * site then renders "No report available yet today", so `latest` returns
 * undefined and the parsers report nothing rather than inventing statuses.
 */

const normHeader = s =>
  String(s ?? '')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

/**
 * the last non-empty row of the sheet, as a `cell(header)` lookup, or
 * undefined when the sheet holds no data row yet
 */
export default function latest(rows) {
  const data = (rows ?? []).filter(row => row?.some(cell => String(cell ?? '').trim() !== ''));
  if (data.length < 2) {
    return;
  }
  const headers = data[0].map(normHeader);
  const row = data[data.length - 1];
  return function cell(header) {
    const index = headers.indexOf(normHeader(header));
    return index >= 0 ? String(row[index] ?? '').trim() : '';
  };
}
