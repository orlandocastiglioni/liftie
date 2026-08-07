import select from '../../select.js';
import { name, reportedAt, rows, status } from './rows.js';

/**
 * LEVEL / GRADE. The German-Austrian three tier scale - blau / rot / schwarz,
 * no green - published as a class on the run's number badge (span.zeichen
 * leicht|mittel|schwer) plus a fourth, ungraded kind: the ski route, badged
 * 'transparent' with a square-diamond whose class says whether it is the hard
 * variant ('schwereRoute') or the plain one. Söllereck has no ski routes today,
 * but they are handled here because the six sectors share one feed and one
 * legend, and a route may be added to this mountain at any time.
 *
 * normalizeLevel knows none of these four tokens, so all 13 rows would publish
 * ungraded. Map them here, one step down each, which keeps the tiers distinct
 * and correctly ordered: leicht -> blue, mittel -> black, schwer -> doubleBlack.
 * Same reading as the other blue/red/black European resorts already in the
 * registry (lib/resorts/kaunertaler-gletscher, lib/resorts/krvavec). Ski routes
 * are unpisted and unpatrolled, harder than the piste of the same colour, so
 * the plain Route sits with mittel and the schwereRoute with schwer.
 *
 * `grade` carries the resort's own word from its difficulty legend, verbatim -
 * 'Piste Leicht' / 'Piste Mittel' / 'Piste Schwer' / 'Route' / 'Route Schwer' -
 * so a consumer can render the real local scale, including the piste/route
 * distinction that liftie's four levels cannot express.
 */
const pisten = {
  leicht: { level: 'blue', grade: 'Piste Leicht' },
  mittel: { level: 'black', grade: 'Piste Mittel' },
  schwer: { level: 'doubleBlack', grade: 'Piste Schwer' }
};

const routen = {
  route: { level: 'black', grade: 'Route' },
  schwereroute: { level: 'doubleBlack', grade: 'Route Schwer' }
};

function difficulty(node) {
  const classes = select(node, 'span.zeichen')[0]?.attribs.class?.split(/\s+/) ?? [];
  const piste = classes.map(c => pisten[c]).find(Boolean);
  if (piste) {
    return piste;
  }
  const diamond = select(node, 'span.zeichen .square-diamond')[0];
  if (!diamond) {
    // graded with a word this parser does not know: publish the row ungraded
    // rather than guess a level for it
    return {};
  }
  const hard = diamond.attribs.class?.split(/\s+/).some(c => c.toLowerCase() === 'schwereroute');
  return hard ? routen.schwereroute : routen.route;
}

/**
 * 13 pistes tagged data-berg="soellereck" in the shared #pisten box: 8 leicht,
 * 4 mittel, 1 schwer, no ski routes - a beginner and family mountain, with the
 * single Hexenschuss as its hard run.
 */
export default function trails(dom) {
  const list = [];
  for (const node of rows(dom, 'pisten')) {
    const n = name(node);
    if (!n) {
      continue;
    }
    list.push({ name: n, status: status(node), ...difficulty(node) });
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
