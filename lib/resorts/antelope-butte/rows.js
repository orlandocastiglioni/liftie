/**
 * Antelope Butte publishes its lift/trail/grooming report as a "publish to
 * web" Google Sheet served as CSV. The sheet is hand-maintained and its
 * wording drifts between seasons, so the row reader is deliberately lenient:
 * a data row has a name in column 0 and a status in column 2 (grooming is
 * column 4). Everything else - section headers, snow totals, meta lines - is
 * dropped by requiring both cells and filtering known label rows.
 */

// label / section-header rows that also happen to carry a column-2 value
const META =
  /^(lift\s*\/\s*trail|trail status|lift-trail|current snow|snow total|recent snowfall|last \d+ (hour|day)|primary\b|secondary\b|day:|date:|report time|note:|this report|thank you|we'?re|we are|reopening in)/i;

const LIFT = /chair|conveyor|lift|gondola|tram|t-?bar|rope tow|magic carpet|poma|surface/i;

function cleanName(raw) {
  // strip the optional "12. " ordinal the sheet prefixes to most rows
  return raw.replace(/^\s*\d+\.\s*/, '').trim();
}

export default function statusRows(rows) {
  const out = [];
  for (const row of rows) {
    const name = (row[0] || '').trim();
    const status = (row[2] || '').trim();
    if (!name || !status) {
      continue;
    }
    // a header row reads "Open / Closed"/"Groomed / Not Groomed" in these
    // cells; real statuses are single words, so a slash means it is a header
    if (status.includes('/') || META.test(name)) {
      continue;
    }
    out.push({
      name: cleanName(name),
      status,
      grooming: (row[4] || '').trim(),
      isLift: LIFT.test(name)
    });
  }
  return out;
}
