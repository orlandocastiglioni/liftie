import statusRows from './rows.js';

// trails are every status row outside the "Lift Status" section - the sheet's
// "West Side" and "East Side & Back Country" blocks. Levels come from the
// legend labels (Easier / More Difficult / Most Difficult / Expert Only /
// Freestyle Terrain), all of which normalizeLevel already knows.
export default function parse(dom) {
  return statusRows(dom)
    .filter(row => !row.isLift)
    .map(({ name, status, level }) => ({ name, status, level }));
}
