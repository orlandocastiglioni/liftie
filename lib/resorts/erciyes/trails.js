import rows from './rows.js';

/**
 * Trails are every row of the four gate tables that is not a 'Teleferikler'
 * (see rows.js): 41 numbered pistes, 6 connector pistes and 3 sledging areas.
 *
 * The status page carries no difficulty at all - it is published on a second,
 * static page, https://www.kayserierciyes.com.tr/mekanik-tesisler-ve-pistler,
 * whose PISTLER table grades all 41 numbered runs. That page holds no live
 * data and has not changed, so the grades are baked in here rather than fetched
 * on every poll.
 *
 * The values below are the icon basenames that page uses next to each Turkish
 * grade word, because normalizeLevel (lib/trails/parse.js) already knows them
 * and 'kolay' / 'orta' / 'zor' do not: easy -> green, medium -> blue,
 * hard -> black. That is also the right reading of the resort's own legend,
 * which pairs Kolay with blue, Orta with red and Zor with black - a European
 * three tier scale, one grade harder at every step than the North American
 * colours, exactly like lib/resorts/skiwelt.
 *
 * Keys are the piste number: the status page prints 'No 15' and 'No 11a(Egt)'
 * where the facilities page prints '15' and '11a'.
 */
const levels = {
  1: 'hard',
  '1a': 'medium',
  '1b': 'medium',
  2: 'medium',
  '2a': 'medium',
  '2b': 'medium',
  3: 'easy',
  '3a': 'medium',
  '3b': 'medium',
  4: 'medium',
  5: 'easy',
  6: 'easy',
  '6a': 'easy',
  7: 'easy',
  '7a': 'medium',
  8: 'hard',
  9: 'medium',
  10: 'medium',
  '10a': 'easy',
  11: 'easy',
  '11a': 'easy', // Kolay (Egitim) - the training run
  12: 'medium',
  13: 'easy',
  '13a': 'easy',
  '13b': 'easy',
  14: 'hard',
  '14a': 'hard',
  15: 'medium',
  '15a': 'medium',
  '15b': 'medium',
  '15c': 'medium',
  16: 'easy',
  '16a': 'easy',
  '16b': 'easy',
  '16c': 'easy',
  17: 'hard',
  18: 'hard',
  '18a': 'medium',
  19: 'easy',
  '19a': 'easy',
  '19b': 'easy'
};

export default function parse(dom) {
  const list = [];
  for (const row of rows(dom)) {
    if (row.category === 'teleferikler') {
      continue;
    }
    list.push({
      name: name(row),
      status: row.status,
      level: row.category === 'pistler' ? levels[key(row.name)] : undefined
    });
  }
  return list;
}

// All three sledging areas are literally called 'Kızak Alanı', so they have to
// carry their gate or two of the three would be indistinguishable. The numbered
// pistes are unique mountain-wide and the connectors name both of their ends,
// so neither needs qualifying.
function name(row) {
  return row.category === 'kizakalani' && row.gate ? `${row.name} (${row.gate})` : row.name;
}

function key(name) {
  return name
    .replace(/^no\s*/i, '')
    .replace(/\s*\(.*\)\s*$/, '')
    .trim()
    .toLowerCase();
}
