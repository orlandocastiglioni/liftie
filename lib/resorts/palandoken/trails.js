import status from './status.js';

/**
 * /api/pistes through the same flaresolverr route as the lifts (see index.js);
 * a bare array of the 36 pistes the Palandöken hero counts.
 *
 * Difficulty does NOT come from the `difficulty` field: it exists in the schema
 * and is null on all 36 rows. The live signal is `colorCode`, the hex the site
 * paints the piste with. The HTML is no help here at all - the difficulty dot on
 * /pistler is driven by that null field, so every dot renders blue.
 *
 * Palandöken is a three colour, four tier European resort: blue, red, black,
 * and no green tier at all. normalizeLevel (lib/trails/parse.js) has no notion
 * of red and would drop it, publishing those nine pistes with no grade, so red
 * is mapped locally - to black, with black moved down to doubleBlack so the
 * ordering blue < red < black survives the translation. Mapping red to black
 * alone would collapse two grades into one.
 *
 * Two sets of hex values are accepted: the ones production actually serves, and
 * the admin form's swatch defaults from the SPA bundle ('Mavi (Orta)',
 * 'Kırmızı (Zor)', 'Siyah (Çok Zor)'), which an operator editing a piste could
 * write back. Anything else publishes with no grade rather than a guessed one.
 */
const levels = {
  '#01a3eb': 'blue',
  '#3b82f6': 'blue', // admin swatch, Mavi (Orta)
  '#e53935': 'black', // red
  '#ef4444': 'black', // admin swatch, Kırmızı (Zor)
  '#000000': 'doubleBlack', // black
  '#111827': 'doubleBlack' // admin swatch, Siyah (Çok Zor)
};

// The two park features are listed as pistes and coloured black like everything
// steep. The character class carries a dotted İ as well as an i because the /i
// flag does not fold U+0130 onto a plain i.
const parks = /^(SNOWPARK|HALFP[iİI]PE)\b/i;

export default function parse(body) {
  const list = [];
  for (const piste of Array.isArray(body) ? body : []) {
    const name = piste.name?.trim();
    if (!name) {
      continue;
    }
    list.push({ name, status: status(piste), level: level(piste, name) });
  }
  return list;
}

function level(piste, name) {
  if (parks.test(name)) {
    return 'terrainPark';
  }
  const colour = String(piste.colorCode ?? '').trim();
  return levels[colour.toLowerCase()];
}
