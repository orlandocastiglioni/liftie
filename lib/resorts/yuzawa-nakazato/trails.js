import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// #todayLift03 is the ［アクティビティパーク］ list, the sibling of the lift list
// on the same /winter/ fetch. Same membership-only semantics: a bare name means
// it is open today, absence means closed, and there is no status token on the
// page to coerce.
//
// The resort does not report its ten named pisted courses anywhere in machine
// readable form - the course page has no status column, the daily post gives
// course status only as prose ("第6リフト沿いのコースを除き全て滑走可能"), and
// wp-json is disabled - so these six areas are 100% of the trail-side status
// that exists.
//
// Levels are not on /winter/ either; they come from the resort's own pages:
// エンゼルゲレンデ is listed under 初級者コース (初級 -> green) on
// /winter/gerende/course/, and ザ・パーク / ザ・ウェイビー / ザ・バンピー are the
// FUN RIDE ZONE gelande attractions (THE PARK / THE WAVY / THE BUMPY) ->
// terrainPark. スマイルキッズパーク and 雪遊びパーク are sledding/kids play areas
// and carry no difficulty at all.
const AREAS = [
  { name: 'スマイルキッズパーク' },
  { name: '雪遊びパーク' },
  { name: 'エンゼルゲレンデ', level: 'green' },
  { name: 'ザ・パーク', level: 'terrainPark' },
  { name: 'ザ・ウェイビー', level: 'terrainPark' },
  { name: 'ザ・バンピー', level: 'terrainPark' }
];

export default function parse(dom) {
  const running = new Set(select(dom, '#todayLift03 li').map(li => (findText(li) ?? '').trim()));
  return AREAS.map(({ name, level }) => ({
    name,
    status: running.has(name) ? 'open' : 'closed',
    level
  }));
}
