/**
 * Difficulty is NOT in the slopesinfo feed - the feed is {Id, Name, IsOpen}
 * and nothing else - and liftie fetches one URL per pipeline, so the grades
 * are joined in from the resort's own table at
 * https://www.stoten.se/backar-vader/ (fetched 2026-08-06). That page renders
 * every run with `div.diff_cell > img[src*='/difficulty-<token>.svg']` and a
 * matching Swedish label, and its names match the feed's Name field exactly,
 * 61 of 69 runs. The eight it does not cover are the parent rows of the
 * multi-segment runs (Mormors Störtlopp, Halkotrikken, Älvan, Björnen,
 * Losvängen, World Cup, Parallellen, Näcken); the site leaves their difficulty
 * cell empty too, because each segment carries its own grade. A run that is
 * missing here simply publishes without a level rather than being dropped -
 * the roster is edited between seasons.
 *
 * Status is deliberately NOT taken from that page: `div.open_cell` is empty
 * for every row all winter long (LiteSpeed guest-mode caches the page for
 * anonymous clients), which is why the JSON feed is the only status source.
 */
const difficulty = {
  Granis: 'very-easy',
  Vargen: 'very-easy',
  'Mormors Störtlopp, övre': 'very-easy',
  'Mormors Störtlopp, nedre': 'very-easy',
  'Vargys Äventyrsbana': 'very-easy',
  Mommovägen: 'very-easy',
  Halkospåret: 'easy',
  'Halkotrikken, övre': 'easy',
  'Halkotrikken, nedre': 'easy',
  Mormorluvan: 'very-easy',
  Björnspåret: 'very-easy',
  Järvsvängen: 'easy',
  'Älvan övre': 'difficult',
  'Älvan nedre': 'difficult',
  Pistoff: 'medium',
  'Björnen, övre': 'very-easy',
  'Björnen, mitten': 'very-easy',
  'Björnen, nedre': 'very-easy',
  'Losvängen, övre': 'easy',
  'Losvängen, nedre': 'medium',
  Vargsvansen: 'very-easy',
  Gammelmormor: 'very-easy',
  Granbarret: 'easy',
  Räven: 'very-easy',
  Haren: 'easy',
  Skidvägen: 'very-easy',
  Familjebacken: 'easy',
  Tomteluvan: 'difficult',
  Tomten: 'medium',
  Trollet: 'medium',
  'Dvärgen (Stöten SnowPark)': 'very-easy',
  'World Cup, övre': 'difficult',
  'World Cup, mitten': 'medium',
  'World Cup, nedre': 'easy',
  Alven: 'very-easy',
  Vätten: 'very-easy',
  'Parallellen, övre': 'difficult',
  'Parallellen, mitten': 'easy',
  'Parallellen, nedre': 'very-easy',
  'Näcken, övre': 'difficult',
  'Näcken, nedre': 'medium',
  Ranchvägen: 'very-easy',
  Solvägen: 'very-easy',
  Kronvägen: 'very-easy',
  Kronoparken: 'very-easy',
  Tunneln: 'very-easy',
  Harvägen: 'very-easy',
  Lovägen: 'very-easy',
  Genvägen: 'very-easy',
  Myrstigen: 'very-easy',
  Puderrännan: 'medium',
  Ravinen: 'easy',
  Varulven: 'difficult',
  Pistvägen: 'very-easy',
  'Lill-Haren': 'very-easy',
  Mullvaden: 'easy',
  Nissen: 'very-easy',
  Älvdansen: 'very-easy',
  Harlorten: 'easy',
  Bjärven: 'very-easy',
  'Farfars fartvind': 'easy'
};

/**
 * Sweden grades on the 4-tier grön / blå / röd / svart scale and the site uses
 * all four: Mycket lätt 33, Lätt 14, Medelsvår 7, Svår 7 (per segment). None
 * of the four tokens survives normalizeLevel as published - 'very-easy' is not
 * in the map at all, and 'easy' -> green / 'medium' -> blue would rate the
 * Swedish blue tier as green and the red tier as blue, i.e. one grade too easy
 * across the whole mountain. liftie has no red, so red folds into black and
 * black is promoted to doubleBlack: all four grades stay distinct and in
 * order. Same idiom as lib/resorts/glencoe/trails.js, and identical to how the
 * other Scandinavian resorts in the registry read their 4-tier scale.
 */
const levels = {
  'very-easy': 'green',
  easy: 'blue',
  medium: 'black',
  difficult: 'doubleBlack'
};

export default function level(name) {
  return levels[difficulty[name]];
}
