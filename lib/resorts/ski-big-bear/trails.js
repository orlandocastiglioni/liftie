import normalizeStatus from './status.js';

// same single ?_data= payload as the lifts - $.status.trails is
// [{ name, difficulty, status }]. difficulty is one of beginner, intermediate,
// advanced, expert, all four already in the levels map. The run named
// 'Terrain Park' is filed as intermediate in the CMS, so name it as a park.
// Names are free text and drift ("Cruisin' " ships with a trailing space).
export default function parse(data) {
  const trails = data?.status?.trails;
  if (!Array.isArray(trails)) {
    return [];
  }
  return trails
    .filter(trail => trail?.name)
    .map(({ name, difficulty, status }) => ({
      name,
      status: normalizeStatus(status),
      level: /terrain park/i.test(name) ? 'terrainPark' : difficulty
    }));
}
