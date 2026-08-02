// same getAll feed as the lifts: data.trailsSorted groups trails by
// difficulty (greenCircle/blueSquare/blackDiamond/doubleBlackDiamond/
// terrainParks/uphill); the group key doubles as the level - normalizeLevel
// understands all of them except 'uphill', which correctly leaves those
// skin-track rows without a level; openingStatus is OPEN | FORECAST | CLOSED
// and goes through coerce downstream
export default function parse({ data } = {}) {
  const rows = [];

  for (const [level, trails] of Object.entries(data?.trailsSorted ?? {})) {
    for (const { name, openingStatus } of trails ?? []) {
      if (name) {
        rows.push({ name, status: openingStatus, level });
      }
    }
  }

  return rows;
}
