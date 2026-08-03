import statusRows from './rows.js';

// trail rows are every status row that is not a lift. no difficulty is
// published, but terrain-park rows are named as such - tag those so they
// group under the terrain-park level; collect() coerces status downstream.
export default function parse(rows) {
  return statusRows(rows)
    .filter(row => !row.isLift)
    .map(row => ({
      name: row.name,
      status: row.status,
      level: /terrain/i.test(row.name) ? 'terrainPark' : undefined
    }));
}
