import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * kissingbridge.com/on-the-slopes/slope-conditions is Webflow. The report is
 * a Finsweet accordion (.fs_accordion-2_item, titled by .fs_accordion-2_label):
 * Central / North / South Slopes, Terrain Parks, Uphill Skin/Snowshoe Trails
 * and Lifts. Each holds a CMS list of .trail_cms_item rows with a
 * .trail-name and BOTH status icons, img.trail_icon.open and
 * img.trail_icon.closed; Webflow hides the one that doesn't apply with
 * w-condition-invisible, so the visible one is the status. Difficulty is the
 * img.trail-difficulty-icon file: circle / square / diamond / doublediamond,
 * oval for a park.
 *
 * Lifts carry their hours or state after a dash ("Holly Triple - ON DEMAND",
 * "Coal Chute Rope Tow - 3:30pm - 9pm"); the name is the part before it. The
 * uphill section is a skinning route list, not ski trails, and is skipped; a
 * park listed again under Terrain Parks with a trail's name (Devils Funnel)
 * keeps its trail row.
 *
 * In season the announcement bar is the report day ("Tuesday 1/20/26"); rows
 * are gated on it through lib/tools/stale.js. Off-season the bar carries no
 * date and the list is reset to closed, so that fails open.
 */
const LEVELS = [
  [/doublediamond/, 'doubleBlack'],
  [/diamond/, 'black'],
  [/square/, 'blue'],
  [/circle/, 'green'],
  [/oval/, 'terrainPark']
];

function textOf(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textOf).join(' ');
}

function clean(node) {
  return textOf(node).replace(/\s+/g, ' ').trim();
}

function classes(node) {
  return (node?.attribs?.class ?? '').split(/\s+/);
}

export function reportDate(dom) {
  const bar = select(dom, '.announcement-bar-wrapper').map(clean).join(' ');
  const m = /\b(\d{1,2})\/(\d{1,2})\/(\d{2})\b/.exec(bar);
  return m ? new Date(2000 + Number(m[3]), Number(m[1]) - 1, Number(m[2])) : undefined;
}

function status(item) {
  const visible = select(item, 'img.trail_icon').filter(img => !classes(img).includes('w-condition-invisible'));
  if (visible.some(img => classes(img).includes('open'))) {
    return 'open';
  }
  if (visible.some(img => classes(img).includes('closed'))) {
    return 'closed';
  }
}

export function sections(dom) {
  if (isStale(reportDate(dom))) {
    return [];
  }
  return select(dom, '.fs_accordion-2_item').map(section => ({
    title: clean(select(section, '.fs_accordion-2_label')[0]),
    items: select(section, '.trail_cms_item').flatMap(item => {
      const name = clean(select(item, '.trail-name')[0]);
      const icon = select(item, 'img.trail-difficulty-icon')[0]?.attribs?.src ?? '';
      const level = LEVELS.find(([re]) => re.test(icon))?.[1];
      return name ? [{ name, status: status(item), level }] : [];
    })
  }));
}
