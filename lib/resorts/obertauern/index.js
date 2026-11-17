import select from '../../select.js';
import coerce from '../../tools/coerce.js';

/**
 * obertauern.com/winter/liftanlagen.html ("Offene Lifte & Pisten") is now
 * server-rendered (it was a JS shell in 2026-09): a TYPO3 page of
 * section.od-obertauerndaten-section blocks, each an h2 title over a
 * table of tr.od-obertauerndaten-row rows - td.liftstatus (a status GIF),
 * td.lifttyp, td.liftidrow (the map number), td.liftname, td.liftdesc.
 *
 * Only the section titled "Lifte" is the lift board (26 lifts). The others
 * repeat lifts as services - "Berg- und Talfahrten" (foot passengers),
 * "Nachtskilauf", "Bibo", "Guten Morgen" (early-bird runs) - and "Ski
 * Verbindungen" is the connection list; none is published. The page has no
 * piste statuses.
 *
 * The status GIF number, from the page's own legend:
 *   1 "Seilbahn in Betrieb!" -> open
 *   8 "Seilbahnbetrieb in Vorbereitung" -> scheduled
 *   2 "Anlage voruebergehend geschlossen!" -> hold (temporarily closed)
 *   3 "Seilbahnanlage nicht in Betrieb!" -> closed
 *   0 is not in the legend; it is every lift that is simply not running
 *     (all 26 out of season, 23 of 26 in the July 2026 capture) -> closed.
 */
const STATES = { 0: 'closed', 1: 'open', 2: 'hold', 3: 'closed', 8: 'scheduled' };

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

export default function parse(dom) {
  const lifts = {};
  const section = select(dom, 'section.od-obertauerndaten-section').find(
    s => clean(text(select(s, '.od-obertauerndaten-section__title')[0])) === 'Lifte'
  );
  if (!section) {
    return lifts;
  }
  for (const row of select(section, 'tr.od-obertauerndaten-row')) {
    const name = clean(text(select(row, 'td.liftname')[0]));
    const gif = /\/(\d+)\.gif$/.exec(select(row, 'td.liftstatus img')[0]?.attribs?.src ?? '')?.[1];
    if (name && gif !== undefined) {
      lifts[name] = coerce(STATES[gif] ?? gif);
    }
  }
  return lifts;
}
