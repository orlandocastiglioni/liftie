import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * orcieres.com/en/live/resort-openings/ embeds Digisnow's
 * <widget-digisnow-ski-area station="orcieres">, a web component that renders
 * into an open shadow root from live data after load. The page goes through
 * renderd with `shadow: true` (resort.json), which inlines that root as
 * <template shadowrootmode="open">, so the rows are ordinary markup here.
 *
 * Inside it: one section.sector per area (JARDIN DES NEIGES, LAUZIERES, ...),
 * each holding a div.categoryDisplayer per category, tagged by a
 * span.categorycode_<lifts|slopes|routes|services|activities>. Every facility
 * is a div.assetLine with
 *   .assetName              the name
 *   class difficulty_<code> slopes only, see trails.js
 *   .status                 the status, as an icon (an inline SVG) or, for a
 *                           status that has no icon, its name as text
 *
 * The icon carries no class or label, so it is read through the widget's own
 * legend (.openingStatusLegendItem: the same SVG next to its name, e.g.
 * "out of period", "closed"). A row whose icon is not in the legend, or whose
 * name is not one listed below, is dropped rather than guessed.
 *
 * The widget shows "Updated on MM/DD/YYYY hh:mm AM" (resort time, en locale);
 * rows are gated on it through lib/tools/stale.js, which fails open.
 */

const LABELS = {
  open: 'open',
  opened: 'open',
  ouvert: 'open',
  ouverte: 'open',
  closed: 'closed',
  'closed for today': 'closed',
  ferme: 'closed',
  fermee: 'closed',
  'out of period': 'closed',
  'hors periode': 'closed'
};

// checked before LABELS falls through, in order: "temporarily closed" is a hold
const PATTERNS = [
  [/\b(hold|temporar|interrupt|suspend|stopped|paused|wind)/, 'hold'],
  [/\b(forecast|planned|scheduled|expected|soon|prevu|prevision|a venir)/, 'scheduled']
];

function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join(' ');
}

function clean(node) {
  return text(node).replace(/\s+/g, ' ').trim();
}

function normalizeLabel(label) {
  return label.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

export function statusOf(label) {
  const key = normalizeLabel(label ?? '');
  if (!key) {
    return;
  }
  if (LABELS[key]) {
    return LABELS[key];
  }
  return PATTERNS.find(([re]) => re.test(key))?.[1];
}

// what tells two status icons apart: the fills and path data, in order
function signature(svg) {
  const parts = [];
  for (const el of [svg, ...select(svg, '*')]) {
    const { fill, style = '', d } = el.attribs ?? {};
    const styleFill = /fill:\s*([^;]+)/.exec(style)?.[1];
    for (const v of [fill, styleFill, d]) {
      if (v) {
        parts.push(v.replace(/\s+/g, ' ').trim().toLowerCase());
      }
    }
  }
  return parts.join('|');
}

function legend(root) {
  const map = new Map();
  for (const item of select(root, '.openingStatusLegendItem')) {
    const svg = select(item, '.openingStatusLegendIcon svg')[0];
    const label = clean(select(item, '> div:not(.openingStatusLegendIcon)')[0]);
    if (svg && label) {
      map.set(signature(svg), label);
    }
  }
  return map;
}

function rowStatus(row, icons) {
  const box = select(row, '.status')[0];
  if (!box) {
    return;
  }
  const svg = select(box, 'svg')[0];
  return statusOf(svg ? icons.get(signature(svg)) : clean(box));
}

// "Updated on 11/12/2026 04:42 AM" is Orcieres local time
function parisOffsetMinutes(t) {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Paris', timeZoneName: 'shortOffset' })
    .formatToParts(t)
    .find(p => p.type === 'timeZoneName')?.value;
  const m = /GMT([+-])(\d{1,2})(?::(\d{2}))?/.exec(name ?? '');
  return m ? (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0)) : 0;
}

/**
 * the widget's inlined shadow root. css-select does not look inside a
 * <template> when searching from above it, only when the template itself is
 * the starting point, so every query below starts here
 */
function shadowRoot(dom) {
  const widget = select(dom, 'widget-digisnow-ski-area')[0];
  return widget && (select(widget, '> template')[0] ?? widget);
}

function lastUpdated(root) {
  const line = clean(select(root, '.lastUpdated')[0]);
  const m = /(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})\s*([AP]M)?)?/i.exec(line);
  if (!m) {
    return;
  }
  const [, month, day, year, hh = '0', mm = '0', ampm] = m;
  let hour = Number(hh) % (ampm ? 12 : 24);
  if (ampm?.toUpperCase() === 'PM') {
    hour += 12;
  }
  const guess = Date.UTC(Number(year), Number(month) - 1, Number(day), hour, Number(mm));
  const when = new Date(guess - parisOffsetMinutes(guess) * 60000);
  return Number.isNaN(when.getTime()) ? undefined : when;
}

export function reportDate(dom) {
  const root = shadowRoot(dom);
  return root && lastUpdated(root);
}

/** [{ name, status, difficulty? }] for one category, [] when the report is provably stale */
export function rows(dom, category) {
  const root = shadowRoot(dom);
  if (!root) {
    return [];
  }
  const when = lastUpdated(root);
  if (isStale(when)) {
    return [];
  }
  const icons = legend(root);
  const out = [];
  for (const block of select(root, '.categoryDisplayer')) {
    if (!select(block, `.categorycode_${category}`).length) {
      continue;
    }
    for (const row of select(block, '.assetLine')) {
      const name = clean(select(row, '.assetName')[0]);
      const status = rowStatus(row, icons);
      if (!name || !status) {
        continue;
      }
      const difficulty = /\bdifficulty_(\S+)/.exec(row.attribs.class ?? '')?.[1];
      out.push(difficulty ? { name, status, difficulty } : { name, status });
    }
  }
  if (when) {
    Object.defineProperty(out, 'reportedAt', { value: when.toISOString() });
  }
  return out;
}
