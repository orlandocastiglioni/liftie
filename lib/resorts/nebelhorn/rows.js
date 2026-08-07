import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

/**
 * Oberstdorf Kleinwalsertal Bergbahnen publish all six of their mountains on
 * ONE server-rendered page - #lifte holds all 46 lifts, #pisten all 98 pistes -
 * and every row carries its sector in a data-berg attribute. The ?berg= query
 * parameter is decoration: the server ignores it and returns all six areas
 * either way, so a sub-area is the same URL plus a filter on the row's own tag.
 *
 * This directory is the 'nebelhorn' sector: the Nebelhorn above Oberstdorf,
 * a mountain of its own with its own valley station and no ski link to
 * Fellhorn or Söllereck.
 */
export const berg = 'nebelhorn';

// data-berg is exactly one token on every #lifte and #pisten row, so strict
// equality is safe here. (Elsewhere on the page mountain-restaurant rows carry
// a comma-joined 'walmendingerhorn,heuberg' and piste maps carry 'all' - those
// are in #huetten, never in the two boxes read here.)
export function rows(dom, box) {
  return select(dom, `#${box} .element[data-berg="${berg}"]`);
}

export function name(node) {
  return findText(select(node, 'span.name')[0])?.trim();
}

/**
 * STATUS. Published as the title (and identical alt) of the row's icon, in
 * German. Of the six words this page uses, coerce.js knows only 'geschlossen' -
 * every other one would fall through to 'scheduled', which would report all 44
 * running lifts of a midwinter day as merely about to open. So map them here.
 *
 * Lift legend: 'in Betrieb' / 'in Vorbereitung' / 'geschlossen'.
 * Piste legend: 'geöffnet' / 'in Vorbereitung' / 'geschlossen'.
 * Note the lift ROWS say 'außer Betrieb' where the lift LEGEND says
 * 'geschlossen'; both mean closed.
 */
const words = {
  'in betrieb': 'open',
  geöffnet: 'open',
  offen: 'open',
  'außer betrieb': 'closed',
  'ausser betrieb': 'closed',
  geschlossen: 'closed',
  'in vorbereitung': 'scheduled'
};

// Fallback: the icon file name, which is the same across every box on the page
// and survives a wording change. It is also the only usable signal on the
// 'no information' state, where the CMS leaks a raw record id as the label
// (title="5161" on noinfo.svg) - that never happens on lifts or pistes, only on
// hiking ways, and noinfo deliberately maps to nothing rather than to a status.
const icons = {
  offen: 'open',
  zu: 'closed',
  teilweise: 'scheduled'
};

export function status(node) {
  const img = select(node, 'span.status img')[0];
  if (!img) {
    return;
  }
  const label = img.attribs.title?.replace(/\s+/g, ' ').trim().toLowerCase();
  if (words[label]) {
    return words[label];
  }
  return icons[img.attribs.src?.match(/\/(\w+)\.svg$/)?.[1]];
}

/**
 * REPORTED AT. The board is never emptied - in August it still lists all 7
 * lifts and 13 pistes, just with every piste closed - so a frozen report and a
 * live one look identical. The page dates itself: 'Live-Status: 10.02.2026
 * 09:54:44' in the sector's own info text (the same stamp repeats in
 * .infotext.gesamt, used as a fallback).
 */
const re = /(\d{2})\.(\d{2})\.(\d{4})\D+(\d{1,2}):(\d{2}):(\d{2})/;

export function reportedAt(dom) {
  const el =
    select(dom, `.infotexte .infotext.${berg} .prognose .text`)[0] ??
    select(dom, '.infotexte .infotext.gesamt .prognose .text')[0];
  const m = el && allText(el).match(re);
  if (!m) {
    return;
  }
  const [, day, month, year, hour, minute, second] = m;
  // The stamp is the resort's wall clock with no offset, and the liftie host is
  // not in the Allgäu - resolve it against Europe/Berlin, which is CET in
  // season and CEST for the summer half this board also gets stamped in. Same
  // trick as lib/resorts/kaunertaler-gletscher/reported-at.js: read the naive
  // stamp as UTC, ask what wall clock Berlin shows then, subtract the
  // difference.
  const asUtc = new Date(`${year}-${month}-${day}T${hour.padStart(2, '0')}:${minute}:${second}Z`);
  if (Number.isNaN(asUtc.getTime())) {
    return;
  }
  const wall = new Date(`${asUtc.toLocaleString('sv-SE', { timeZone: 'Europe/Berlin' }).replace(' ', 'T')}Z`);
  return new Date(2 * asUtc.getTime() - wall.getTime()).toISOString();
}
