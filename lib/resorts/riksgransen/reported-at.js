// Each section carries its own stamp - "Uppdaterade hissar: 19 Juni 2026,
// 09:37" - and the board does not empty at closing day: the live August feed
// still lists all 6 lifts and all 38 runs, dated 19 June, with one lift still
// flagged 'Öppen'. Riksgränsen's season runs February to June rather than
// December to April, so an empty-looking report in midwinter is normal here
// and a June date is the only way to read the board correctly.
//
// The site also emits relative forms for the last day or two ("Igår 07:15",
// yesterday). Those carry no date, so return undefined rather than invent one.
const months = {
  januari: 1,
  februari: 2,
  mars: 3,
  april: 4,
  maj: 5,
  juni: 6,
  juli: 7,
  augusti: 8,
  september: 9,
  oktober: 10,
  november: 11,
  december: 12
};

const re = /(\d{1,2})\s+([A-Za-zÅÄÖåäö]+)\s+(\d{4}),\s*(\d{1,2}):(\d{2})/;

export default function reportedAt(stamp = '') {
  const m = stamp.match(re);
  if (!m) {
    return;
  }
  const [, day, monthName, year, hour, minute] = m;
  const month = months[monthName.toLowerCase()];
  if (!month) {
    return;
  }
  // Riksgränsen is on Europe/Stockholm and the stamp carries no offset; assume
  // CET. Stamps posted in summer time are then an hour early, which is
  // immaterial for a staleness date (reports go up mid-morning, nowhere near a
  // date boundary).
  const pad = n => String(n).padStart(2, '0');
  const date = new Date(`${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${minute}:00+01:00`);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
}
