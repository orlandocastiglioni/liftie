import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Les 7 Laux publishes through Lumiplan's bulletin platform, and this exact
 * displayAll.php url is the one the resort itself links from les7laux.com
 * (with '&pdf=true' appended, which only swaps in print CSS). One plain GET
 * returns the whole board - 22 lifts and 69 pistes/activities across the three
 * base areas - and it is the only source with 100% of what the resort
 * publishes: its own infos-pistes page carries the 53 alpine and park runs but
 * drops the nordic domain, the freeride itineraries and the luge run.
 *
 * displayDomaine=0-1-2-3-4-5-6-7-8 is NOT optional. Without it the page renders
 * zero rows.
 *
 * Note the older bulletinv3.lumiplan.pro endpoint that lib/tools/lumiplan.js
 * reads answers 'Bulletin indisponible' for this station, and displayAll.php's
 * markup has nothing in common with it, so that helper cannot be reused.
 */

/*
 * PAGE SHAPE. A stack of div.card, one per sector (the sector set is seasonal:
 * three in November, nine in March when the nordic, freeski and snowpark
 * sectors appear - never hard-code it). Inside div.card-body.prl_info each
 * category is introduced by
 *
 *   <div class="text col-12"><p class="center">CATEGORY</p><p class="right">…
 *
 * and its rows follow in the next div.row.prl_affichage. That heading is the
 * only reliable lift/piste discriminator - the rows themselves are identical -
 * so walk the card body in document order and carry the heading forward.
 */
export const LIFTS = 'Remontées Mécaniques';

const STATE = /image\/etats\/([A-Z]+)\.svg/;

/**
 * STATUS, from the row's state icon. The page's own #tooltip_prl legend spells
 * the four codes out:
 *   O  Ouvert                    F  Fermé
 *   P  En prévision d'ouverture  HP Hors période
 * Mapped here rather than handed to coerce.js because 'hp' is not in its map
 * and would fall through to 'scheduled', when out-of-season plainly means
 * closed. Anything else stays raw so coerce logs it and treats it as unknown.
 *
 * The legend also lists perturbation / vent / probleme / securisation pictos,
 * but those render as image/document/*.PNG overlays next to the state icon, so
 * matching on the /etats/ path keeps them out.
 */
const statuses = {
  O: 'open',
  F: 'closed',
  P: 'scheduled',
  HP: 'closed'
};

export function status(row) {
  const code = select(row, '.status img')
    .map(img => img.attribs.src?.match(STATE)?.[1])
    .find(Boolean);
  return statuses[code] ?? code;
}

export default function rows(dom) {
  const list = [];
  for (const card of select(dom, '.card')) {
    const sector = findText(select(card, '.card-header .sector')[0])?.trim();
    for (const body of select(card, '.card-body.prl_info')) {
      let category;
      for (const node of body.children) {
        const cls = node.attribs?.class?.split(/\s+/) ?? [];
        if (cls.includes('prl_affichage')) {
          for (const row of select(node, '.prl_group')) {
            list.push({
              sector,
              category,
              // NEVER the row's title='…' attribute: it is single quoted and
              // unescaped, so every name with an apostrophe is truncated there
              // ("TK P'tits Loups" -> "TK P", "Pré de l'arc (5 km)" -> "Pré de
              // l"). 5 of the 91 winter rows are affected.
              name: findText(select(row, '.prl_name .text')[0])?.trim(),
              type: select(row, 'img.img_type')[0]?.attribs.src?.match(/image\/type\/(.*)\.svg/)?.[1],
              status: status(row)
            });
          }
        } else if (cls.includes('text')) {
          category = findText(select(node, 'p.center')[0])?.trim();
        }
      }
    }
  }
  return list;
}

/**
 * The bulletin dates itself - 'Mise à jour le 05/03/2026 à 17:07' in the first
 * of the two div.intro_maj nodes (the second is empty). Worth publishing: in
 * summer Lumiplan trims the board to the handful of assets actually operating
 * rather than emptying it, so the stamp is the only thing separating a current
 * report from one left over from closing day.
 */
const STAMP = /(\d{2})\/(\d{2})\/(\d{4})\D+(\d{1,2}):(\d{2})/;

export function reportedAt(dom) {
  const m = select(dom, '.intro_maj')
    .map(node => findText(node)?.match(STAMP))
    .find(Boolean);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute] = m;
  // Wall clock with no offset. Resolve against Europe/Paris rather than the
  // host's zone - CET in season, CEST for the spring and summer stamps. Same
  // trick as lib/resorts/steinplatte/reported-at.js: read the naive stamp as
  // UTC, ask what wall clock Paris shows then, subtract the difference.
  const asUtc = new Date(`${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:00Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Paris' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
