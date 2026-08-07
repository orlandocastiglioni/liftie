import select from '../../select.js';
import { berg, name, reportedAt, status } from './rows.js';

/**
 * LEVEL. The operator grades on the Austrian three-tier scale, published as the
 * second class on the run's number badge, span.zeichen: leicht (blau) / mittel
 * (rot) / schwer (schwarz). Ski routes - unprepared, unpatrolled - are a fourth
 * kind, badge class 'transparent', and carry their own two-step grade in the
 * square-diamond marker inside the badge: plain 'Route', or 'Route Schwer' when
 * the marker's class list contains 'schwereRoute'.
 *
 * normalizeLevel in lib/trails/parse.js knows none of the four words, so every
 * piste here would publish with no level at all. Map them locally, shifting the
 * top of the scale down one slot the way the other blau/rot/schwarz resorts in
 * the registry already do (lib/resorts/kaunertaler-gletscher, krvavec): rot
 * becomes black and schwarz becomes doubleBlack, which keeps all three tiers
 * distinct and in the source's own order. Routes ride alongside at the hard
 * end - a 'Route' is at least advanced terrain, a 'Route Schwer' expert.
 *
 * `grade` carries the resort's own word from its Schwierigkeit legend,
 * verbatim and untranslated, so a consumer can render the real Austrian scale
 * instead of this lossy four-value reading of it.
 */
const levels = {
  leicht: 'blue',
  mittel: 'black',
  schwer: 'doubleBlack'
};

const grades = {
  leicht: 'Piste Leicht',
  mittel: 'Piste Mittel',
  schwer: 'Piste Schwer'
};

function grade(node) {
  const badge = select(node, 'span.zeichen')[0];
  const classes = badge?.attribs.class?.split(/\s+/) ?? [];
  if (classes.includes('transparent')) {
    const marker = select(node, 'span.zeichen .square-diamond')[0];
    const hard = marker?.attribs.class?.split(/\s+/).includes('schwereRoute');
    return hard ? { level: 'doubleBlack', grade: 'Route Schwer' } : { level: 'black', grade: 'Route' };
  }
  const tier = classes.find(c => Object.hasOwn(levels, c));
  return tier ? { level: levels[tier], grade: grades[tier] } : {};
}

/**
 * Ifen: 12 rows in the shared #pisten box - 4 leicht, 5 mittel, 2 schwer and
 * one ski route (Route Kellerloch, 'Route Schwer').
 *
 * Keyed by name, not by the piste number in span.zeichen: two different runs
 * are both numbered IF4 here ('Schäfalp-Abfahrt (blau)' and 'Schäfalp-Abfahrt
 * (rot)'), and Gaisbühl-Pisten has no number at all. The names are unique.
 *
 * Unlike the lift box, #pisten lists all 98 pistes of the network year-round,
 * simply flipping them all to 'geschlossen' out of season - hence reportedAt.
 */
export default function trails(dom) {
  const list = [];
  for (const node of select(dom, `#pisten .element[data-berg="${berg}"]`)) {
    const n = name(node);
    const s = status(node);
    if (!n || !s) {
      continue;
    }
    list.push({ name: n, status: s, ...grade(node) });
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
