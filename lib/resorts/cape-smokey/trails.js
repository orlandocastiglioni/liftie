// Ski runs are the `trails[]` entries with a skiable difficulty; the 'lift'
// (Magic Carpet) and 'summer' (hiking / e-bike routes) entries are excluded.
// 'moderate' is not in liftie's levels map, so difficulty is mapped to a
// canonical level token here.
const level = {
  easy: 'green',
  moderate: 'blue',
  difficult: 'black'
};

export default function parse(body) {
  const rows = [];
  for (const t of body.trails || []) {
    const l = level[t.difficulty];
    if (!l) {
      continue; // skip 'lift' and 'summer' entries
    }
    rows.push({
      name: t.name,
      status: t.is_open ? 'open' : 'closed',
      level: l
    });
  }
  return rows;
}
