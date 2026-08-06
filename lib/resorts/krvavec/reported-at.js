// Krvavec leaves the winter board in place all year rather than emptying it:
// the live file on 2026-08-06 still lists all 13 lifts and 25 runs, every one
// 'Zaprto', stamped '22. jul 2026'. Without the stamp a months-old all-closed
// report is indistinguishable from a fresh one, so publish it.
//
// The stamp is Slovenian: '30. nov 2025, 12:01'.
const months = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  maj: 5,
  jun: 6,
  jul: 7,
  avg: 8,
  sep: 9,
  okt: 10,
  nov: 11,
  dec: 12
};

const re = /(\d{1,2})\.\s*([a-zA-Zčšž]+)\.?\s*(\d{4}),?\s*(\d{1,2}):(\d{2})/;

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
  // The page carries no offset. Krvavec is on Europe/Ljubljana; assume CET, so
  // a stamp posted in summer time is an hour early - immaterial for a
  // staleness date (reports go up mid-morning, nowhere near a date boundary).
  const pad = n => String(n).padStart(2, '0');
  const date = new Date(`${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${minute}:00+01:00`);
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString();
  }
}
