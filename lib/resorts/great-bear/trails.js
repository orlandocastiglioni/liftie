import select from '../../select.js';

// Great Bear publishes four aggregate category statuses - DownHill, Tubing,
// Terrain Park, Nature Trails - and nothing else: no lift is ever named and
// no individual run is ever listed (confirmed against mid-season captures and
// the full sitemap), hence "no": { "lifts": true } in resort.json. The four
// categories are emitted as pseudo-trail rows; that is the true ceiling of
// the published data.
//
// Markup: label and value are separate sibling Elementor text-editor widgets.
// The label widget holds a single bare <p> ("DownHill"), the value widget that
// immediately follows holds an <h4> with the status and sometimes a trailing
// <p> with detail ("100% of Trails Open!", "8 am to dusk") which must stay out
// of the status string.

function deepText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

const clean = str => deepText(str).replace(/\s+/g, ' ').trim();

// the weather block below the four categories is another label-shaped widget;
// it is last today, so the pair walk drops it for want of a follower, but it
// would become a bogus row the day a value widget is added under it
const NOT_A_CATEGORY = /^weather/i;

// statuses are free prose typed by the operator and almost none of them are
// known to coerce(): "OPEN FOR THE SEASON", "opening dec. 19!", "closed for
// reset", "Open - groomed 12/15" (with an EN DASH), "Closed For The Season"
// (which is not coerce's `closedforseason` key - the extra "the" breaks it).
// Collapse them to a canonical word here; anything unrecognised is passed
// through so coerce can still resolve and log it.
function normalize(raw) {
  const s = raw.replace(/[–—]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  if (/^opening/.test(s)) {
    // must be tested before /^open/ - "opening dec. 19!" is not open yet
    return 'scheduled';
  }
  if (/^open/.test(s)) {
    return 'open';
  }
  if (/^closed/.test(s)) {
    return 'closed';
  }
  return raw;
}

export default function parse(dom) {
  const widgets = select(dom, 'div.elementor-widget-text-editor.no_parg');
  const rows = [];
  for (let i = 0; i < widgets.length - 1; i++) {
    const labels = select(widgets[i], 'p');
    // a label widget is exactly one <p> and no <h4>...
    if (labels.length !== 1 || select(widgets[i], 'h4').length > 0) {
      continue;
    }
    // ...followed by a value widget that carries the <h4> status
    const value = select(widgets[i + 1], 'h4')[0];
    if (!value) {
      continue;
    }
    const name = clean(labels[0]);
    if (!name || NOT_A_CATEGORY.test(name)) {
      continue;
    }
    rows.push({
      name,
      status: normalize(clean(value)),
      level: /terrain park/i.test(name) ? 'terrainPark' : undefined
    });
    i++;
  }
  return rows;
}
