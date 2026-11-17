import select from '../../select.js';
import coerce from '../../tools/coerce.js';

/**
 * petzen.net carries its operating board on the home page ("Aktueller
 * Betrieb"; /en/winterbetrieb/pisten-lifte redirects there). It is a
 * hand-edited Joomla table, headed "Pisten und Lifte" in winter and "Anlagen
 * + Trails" otherwise, one row per facility: the name (sometimes in
 * <strong>) and an icon, /images/petzen/grafiken/Alert-offen.png (open) or
 * Alert-geschlossen.png (closed); the alt text is not reliable, the file
 * name is.
 *
 * In summer the same table lists the bike park, via ferrata and disc golf
 * beside the cable car, so rows are classed by name: lifts are the -bahn /
 * -lift / Zauberteppich / Cable Car rows, trails the -abfahrt / Piste rows;
 * anything else (Flow Country Trail, Klettersteig, ...) is not published.
 * The summer cable car really runs, so it shows open in summer.
 *
 * The winter board lists only one run, the "Talabfahrt" (valley run); the
 * mountain's pistes are not itemised.
 */
const LIFT = /(bahn|lift|zauberteppich|cable car)/i;
const TRAIL = /(abfahrt|piste)/i;

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
  return s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

export function rows(dom, kind) {
  const out = [];
  const seen = new Set();
  for (const tr of select(dom, 'tr')) {
    const tds = select(tr, 'td');
    if (tds.length < 2) {
      continue;
    }
    const icon = /Alert-(offen|geschlossen)\.png/i.exec(select(tds[1], 'img')[0]?.attribs?.src ?? '')?.[1];
    const name = clean(text(tds[0]));
    if (!icon || !name || seen.has(name)) {
      continue;
    }
    const isLift = LIFT.test(name);
    const isTrail = !isLift && TRAIL.test(name);
    if ((kind === 'lifts' && isLift) || (kind === 'trails' && isTrail)) {
      seen.add(name);
      out.push({ name, status: coerce(icon.toLowerCase() === 'offen' ? 'open' : 'closed') });
    }
  }
  return out;
}
