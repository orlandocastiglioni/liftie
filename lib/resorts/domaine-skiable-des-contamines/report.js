import select from '../../select.js';

/**
 * lescontamines.net/ouverture.html is the lift operator's (SECMH) live
 * openings page: a piste-map view and, below it, a list per sector (Village,
 * Montjoie, Roselette, Tierces, Hauteluce) of li.ouverture rows refreshed from
 * Lumiplan every minute. A row is
 *
 *   <img class="iconRM|iconPiste iconList" src=".../icons/<STATE>.png">
 *   [<a>]<img src=".../icons/<TYPE>.png" alt="<grade letter>">[</a>]
 *   NAME <sup class="horairesRM">09:00→16:30</sup>
 *   <div class="messageLumiplan">ENNEIGEMENT INSUFFISANT</div>
 *
 * iconRM is a lift, iconPiste a run. STATE is the page legend's letter:
 * O ouvert, P prevision (forecast: shown from closing time until the lift
 * really opens next morning), F ferme, H hors saison. Out of season every row
 * is F, so there is no stale-open board to guard against.
 */
const STATES = {
  O: 'open',
  P: 'scheduled',
  F: 'closed',
  H: 'closed'
};

function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  // the hours and the Lumiplan message are not part of the name
  if (node.name === 'sup' || node.name === 'div') {
    return '';
  }
  return (node.children ?? []).map(text).join('');
}

export function rows(dom, kind) {
  return select(dom, 'li.ouverture').flatMap(li => {
    const icon = select(li, `img.${kind}.iconList`)[0];
    if (!icon) {
      return [];
    }
    const state = (icon.attribs.src ?? '').match(/\/icons\/([A-Z])\.png/)?.[1];
    const type = select(li, 'img').find(img => img !== icon);
    const name = text(li).replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
    return name ? [{ li, name, status: STATES[state] ?? 'scheduled', type }] : [];
  });
}
