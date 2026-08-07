import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Rangger Koepfl is the one SKI plus CITY area the network site never wired up:
 * /skiing-resorts/oberperfuss-rangger-koepfl/ has no #pisten_anlagen block at
 * all (also true of the January 2026 wayback snapshot, so it is a permanent
 * gap, not a summer artifact), and the network's live-info summary lists only
 * ten of the twelve areas, omitting this one. Its map is the shared
 * innsbruck/ski_plus_city panorama, so there is no per-area JSON either.
 *
 * That leaves Intermaps' Skigebietsmanager template, region_id=1000, which is
 * plain-curl friendly and does carry both lifts and slopes.
 *
 * SEGMENTING. The template is a 2005-era table layout: lifts, Slopes, Weather
 * forecast, Map, contact and Legend are all rendered with the SAME markup -
 * one table.tab_object_2_cols per row - separated only by a td.td_caption_v2
 * heading. Selecting table.tab_object_2_cols on its own would ingest the two
 * Legend rows ("open", "closed") as lifts. So walk headings and rows together
 * in document order and keep only the rows that follow the wanted caption.
 *
 * (Sibling areas on the same template add Winterhiking and Crosscountry blocks;
 * this segmentation excludes those for free.)
 */
export function rows(dom, caption) {
  const out = [];
  let current;
  for (const node of select(dom, 'td.td_caption_v2, table.tab_object_2_cols')) {
    if (node.name === 'td') {
      current = allText(node).trim().toLowerCase();
    } else if (current === caption) {
      out.push(node);
    }
  }
  return out;
}

/**
 * STATUS is an image filename and nothing else - there is no status word on the
 * page outside the Legend, which renders exactly these two icons labelled
 * "open" and "closed":
 *
 *   .../icons/status_icon_set_6/169.png  open
 *   .../icons/status_icon_set_6/94.png   closed
 *
 * Neither '169' nor '94' is in coerce.js, and handing raw numbers to coerce
 * would be worse than useless: it maps '1' to open and '3' to closed, so a
 * naive numeric read is actively wrong. Translate the filename here.
 */
const statuses = {
  169: 'open',
  94: 'closed'
};

export function row(table) {
  const name = allText(select(table, 'td.td_icon_text_v3')[0] ?? {}).trim();
  const icons = select(table, 'img').map(img => img.attribs?.src ?? '');
  const status = statuses[icons[0]?.match(/status_icon_set_\d+\/(\d+)\.png/)?.[1]];
  if (!name || !status) {
    return;
  }
  return { name, status, icons };
}
