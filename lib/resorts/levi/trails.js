import status, { name, rows } from './status.js';

/**
 * Levi grades on the four-tier European scale - green / blue / red / black -
 * confirmed by the colour table in its own bundle
 * (Vaikea=near-black, Keskivaikea=red, Helppo=blue, ErittainHelppo=green)
 * and by its bike-trail translator ('Vihrea'->ErittainHelppo,
 * 'Sininen'->Helppo, 'Punainen'->Keskivaikea, 'Musta'->Vaikea).
 *
 * None of the four Finnish words is in liftie's levels map
 * (lib/trails/parse.js), so every one of them must be mapped here or the
 * whole mountain publishes with no level at all. Because this is a FOUR-tier
 * scale the red tier is shifted onto black and the black tier onto
 * doubleBlack, which keeps the ordering intact; mapping Keskivaikea->blue
 * instead would collapse it into Helppo and strip Levi's genuine black runs
 * of their top grade.
 *
 * Key is the difficulty string with whitespace stripped and lowercased, so
 * both spellings of the green tier are accepted: the API/legend form
 * 'Erittain helppo' and the bundle's enum key 'ErittainHelppo'. The green
 * tier is unused in the current payload but is a live enum value.
 */
const levels = {
  erittäinhelppo: 'green', // 'Erittain helppo' - very easy
  helppo: 'blue', // easy
  keskivaikea: 'black', // intermediate; the red tier
  vaikea: 'doubleBlack' // hard; the black tier
};

/**
 * Same API and same Authorization header as the lifts (see index.js),
 * endpoint activities/v1/slopes, response {"data": [ ...50 slopes... ]}.
 *
 * All 50 are published. Levi's own headline says 44 slopes + 4 snow parks
 * because six rows carry dontCount=1 (the parks, Leevilandia and the two
 * connector routes); they are real, individually statused terrain, so the
 * count difference is expected and is not an error.
 *
 * XC is out of scope: Levi's ~230 km of track is groomed by the
 * municipality and published through InfoGIS, not through this API, which
 * only exposes an aggregate skiTracks figure on statistics/v1/today.
 */
export default function parse(body) {
  return rows(body).map(slope => ({
    name: name(slope),
    status: status(slope),
    level:
      levels[
        String(slope?.difficulty ?? '')
          .replace(/\s+/g, '')
          .toLowerCase()
      ]
  }));
}
