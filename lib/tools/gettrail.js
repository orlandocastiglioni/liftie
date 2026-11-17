import select from '../select.js';
import isStale from './stale.js';

/**
 * Shared reader for GetTrail.info (app.gettrail.info), a Quebec trail-status
 * service whose embeds resorts iframe into their conditions pages:
 *
 *   https://app.gettrail.info/embed/<team uuid>/tabletrails
 *
 * The embed is a Laravel Livewire / Flux page rendered on the server, so the
 * plain HTML already holds the board:
 *
 *   ui-disclosure[data-flux-accordion-item]   one sector ("REMONTÉES
 *                                             MÉCANIQUES", "MONT BLANC", ...)
 *     span.font-semibold                      the sector's name
 *     div[data-flux-widget-trail]             one row
 *       svg (aria-hidden, viewBox 0 0 24 24)  the difficulty symbol
 *       span.text-sm.truncate                 the row's name
 *       svg[aria-label]                       one state icon per activity
 *                                             column, e.g. alpine skiing and
 *                                             services; "Blank" where the row
 *                                             does not take part in a column
 *
 * The state is the icon's aria-label in the embed's locale - Ouvert / Fermé /
 * Attention ! / Maintenance (fr) or Open / Closed / Caution / Maintenance
 * (en), per the embed's own legend. "Attention" is open with a caution flag,
 * so trails publish it as open + hazard and lifts as open.
 *
 * The board header dates the report ("17 nov. @ 07:14 AM", no year); it is
 * published as reportedAt and goes through lib/tools/stale.js, which fails
 * open when it cannot be read.
 */
const STATES = {
  ouvert: 'open',
  open: 'open',
  fermé: 'closed',
  ferme: 'closed',
  closed: 'closed',
  attention: 'open',
  caution: 'open',
  maintenance: 'closed'
};

function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  if (node.name === 'svg') {
    return '';
  }
  return (node.children ?? []).map(text).join('');
}

function clean(s) {
  return s.replace(/\s+/g, ' ').trim();
}

function hasClass(node, cls) {
  return (node.attribs?.class ?? '').split(/\s+/).includes(cls);
}

/**
 * The difficulty symbol is drawn, not named: the path of the first 24x24 icon.
 * Circle = green, square = blue, one diamond = black, two diamonds = double
 * black, rounded bar = terrain park; the fill colour is the fallback.
 */
const SHAPES = [
  [/^M22 12a10 10/, 'green'],
  [/^M2 2h20v20H2z/, 'blue'],
  [/^m12 2 10 10-10 10L2 12z/, 'black'],
  [/^M15\.75 2 22 12/, 'doubleBlack'],
  [/^M7 7h10c2\.77/, 'terrainPark']
];
const FILLS = { '#36b649': 'green', '#1176bc': 'blue', '#f36522': 'terrainPark' };

function level(row) {
  const icon = select(row, 'svg').find(
    s => (s.attribs.viewBox ?? s.attribs.viewbox) === '0 0 24 24' && !s.attribs['aria-label']
  );
  if (!icon) {
    return;
  }
  const d = select(icon, 'path')[0]?.attribs.d ?? '';
  const shape = SHAPES.find(([re]) => re.test(d));
  return shape ? shape[1] : FILLS[(icon.attribs.fill ?? '').toLowerCase()];
}

function state(label) {
  const key = clean(label ?? '')
    .toLowerCase()
    .replace(/\s*!$/, '');
  return key === 'blank' || !key ? undefined : (STATES[key] ?? 'scheduled');
}

function rowOf(node) {
  const nameSpan = select(node, 'span').find(s => hasClass(s, 'text-sm') && hasClass(s, 'truncate'));
  const name = clean(text(nameSpan));
  if (!name) {
    return;
  }
  const labels = select(node, 'svg[aria-label]').map(s => s.attribs['aria-label']);
  return {
    name,
    states: labels.map(state),
    labels,
    level: level(node)
  };
}

const MONTHS = {
  janv: 0,
  jan: 0,
  févr: 1,
  fevr: 1,
  feb: 1,
  mars: 2,
  mar: 2,
  avr: 3,
  apr: 3,
  mai: 4,
  may: 4,
  juin: 5,
  jun: 5,
  juil: 6,
  jul: 6,
  août: 7,
  aout: 7,
  aug: 7,
  sept: 8,
  sep: 8,
  oct: 9,
  nov: 10,
  déc: 11,
  dec: 11
};

export function reportedAt(dom) {
  for (const span of select(dom, 'span.truncate')) {
    const m = clean(text(span)).match(/^(\d{1,2})\s+([^\s.]+)\.?\s*@\s*(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    const month = m && MONTHS[m[2].toLowerCase()];
    if (month === undefined || month === null) {
      continue;
    }
    let hour = Number(m[3]) % 12;
    if (!m[5] || m[5].toUpperCase() === 'PM') {
      hour = m[5] ? hour + 12 : Number(m[3]);
    }
    const now = new Date();
    // no year on the stamp: the most recent such day at or before today, in
    // Quebec time (UTC-5 in winter; an hour either way is irrelevant here)
    const at = year => new Date(Date.UTC(year, month, Number(m[1]), hour + 5, Number(m[4])));
    const when = at(now.getUTCFullYear());
    return when > now ? at(now.getUTCFullYear() - 1) : when;
  }
}

/** [{ name, rows: [{ name, states, labels, level }] }], or [] for a stale board */
export function sectors(dom) {
  if (isStale(reportedAt(dom))) {
    return [];
  }
  return select(dom, 'ui-disclosure').map(sector => {
    const heading = select(sector, 'span').find(s => hasClass(s, 'font-semibold'));
    return {
      name: clean(text(heading)),
      rows: select(sector, 'div[data-flux-widget-trail]').map(rowOf).filter(Boolean)
    };
  });
}

export function dated(result, dom) {
  const at = reportedAt(dom);
  if (at) {
    Object.defineProperty(result, 'reportedAt', { value: at.toISOString() });
  }
  return result;
}

/** a row's first non-blank state */
export function firstState(row) {
  return row.states.find(Boolean);
}

/** caution flag for a trail: "Attention !" / "Caution" */
export function caution(label) {
  return /^(attention|caution)/i.test(clean(label ?? ''));
}
