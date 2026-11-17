import select from '../../select.js';

/**
 * tschiertschen.ch's Wintersportbericht embeds the SisControl (SISAG)
 * webreport, siscontrol.ch/report/tschiertschen. It is an Angular/Ionic app:
 * the HTML is an empty shell, and its data API (api.siscontrol.ch) answers 401
 * to a plain client, so the page goes through renderd, which returns the
 * rendered board.
 *
 * Each facility is a sis-sismedia-item with
 *   ion-icon.sis-statusicon[name]   sis-open | sis-preparation | sis-closed
 *                                   (the legend at the foot of the report)
 *   img.sis-icon                    the facility type, by file name:
 *                                   sesselbahn4, skilift, kinderlift,
 *                                   foerderband, pisteleicht / -mittel /
 *                                   -schwer / -freeride, langlauf, ...
 *   div.sis-label, div.sis-name     the map letter or number, and the name
 *
 * The type decides lift vs run, so the report's category headings (which mix
 * slopes, cross-country and sledging) are not needed. The report is live
 * SisControl data and reads all closed out of season.
 */
const STATES = {
  'sis-open': 'open',
  'sis-preparation': 'scheduled',
  'sis-closed': 'closed'
};

function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function clean(s) {
  return s.replace(/\s+/g, ' ').trim();
}

export function items(dom) {
  return select(dom, 'sis-sismedia-item').flatMap(item => {
    const icon = select(item, 'ion-icon.sis-statusicon')[0];
    const type = (select(item, 'img.sis-icon')[0]?.attribs.src ?? '').match(/\/([a-z0-9_-]+)\.svg/)?.[1];
    const label = clean(text(select(item, '.sis-label')[0]));
    const name = clean(text(select(item, '.sis-name')[0]));
    if (!icon || !type || !name) {
      return [];
    }
    return [
      {
        name: label ? `${label} ${name}` : name,
        type,
        status: STATES[icon.attribs.name] ?? 'scheduled'
      }
    ];
  });
}
