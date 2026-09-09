import decode from './decode.js';

// the feed's difficulty vocabulary; "Extreme Expert" is not in the shared
// level map, so map locally
const levels = {
  Easy: 'green',
  Intermediate: 'blue',
  Advanced: 'black',
  Expert: 'doubleBlack',
  'Extreme Expert': 'doubleBlack',
  'Terrain Park': 'terrainPark'
};

// /wp-json/custom/v1/trails lists every trail "facility" post, alpine and
// nordic alike. Indy lists the resort as alpine (78 trails), so the Nordic
// Adventure Center's 23 are dropped to keep the published count comparable.
export default function parse(data = []) {
  const trails = [];
  for (const { title, facility_location: location, acf } of data) {
    if (location === 'Nordic Adventure Center') {
      continue;
    }
    const name = title?.rendered && decode(title.rendered).trim();
    if (!name) {
      continue;
    }
    trails.push({
      name,
      status: acf?.open_status ? 'open' : 'closed',
      level: levels[acf?.difficulty]
    });
  }
  return trails;
}
