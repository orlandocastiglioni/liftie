import select from '../select.js';
import coerce from './coerce.js';
import { allText } from './domutil.js';

/**
 * Shared parser for the "SnowReport" WordPress theme (Gunstock, Red River).
 *
 *   article.SnowReport-Lift / article.SnowReport-Trail
 *     .SnowReport-feature-title             name
 *     .SnowReport-item-status i.pti-<state>  open / closed / on-delay
 *   h2.SnowReport-section-title i.pti-<grade> heads each run of trail
 *     articles: easiest / more-difficult / most-difficult / expert-only /
 *     terrain / glades
 *
 * Status is read by class, not by position: Red River puts a div.time-lift
 * inside each lift article, which shifts the children upstream's positional
 * gunstock descriptor ('1/1/1') counts on. Trails are published only under a
 * difficulty heading, so Gunstock's "Uphill Routes" (skinning routes, not
 * runs) and its separate Nordic block stay out.
 */

const STATES = { 'on-delay': 'hold', 'on-hold': 'hold', open: 'open', closed: 'closed' };
const GRADES = {
  easiest: 'green',
  'more-difficult': 'blue',
  'most-difficult': 'black',
  'expert-only': 'doubleBlack',
  terrain: 'terrainPark',
  glades: undefined
};

function iconOf(node, map) {
  for (const i of select(node, 'i')) {
    for (const cls of (i.attribs?.class ?? '').split(/\s+/)) {
      const word = cls.replace(/^pti-/, '');
      if (cls.startsWith('pti-') && word in map) {
        return { word, value: map[word] };
      }
    }
  }
}

function nameOf(article) {
  return allText(select(article, '.SnowReport-feature-title')[0] ?? { children: [] })
    .replace(/\s+/g, ' ')
    .trim();
}

function statusOf(article) {
  const status = select(article, '.SnowReport-item-status')[0];
  if (!status) {
    return 'closed';
  }
  const icon = iconOf(status, STATES);
  if (icon) {
    return icon.value;
  }
  return coerce(allText(select(status, '.SnowReport-sr-label')[0] ?? { children: [] }).trim());
}

export function lifts(dom) {
  const result = {};
  for (const article of select(dom, 'article.SnowReport-Lift')) {
    const name = nameOf(article);
    if (name && !(name in result)) {
      result[name] = statusOf(article);
    }
  }
  return result;
}

export function trails(dom) {
  const rows = [];
  const seen = new Set();
  let grade;
  for (const node of select(dom, 'h2.SnowReport-section-title, article.SnowReport-Trail')) {
    if (node.name === 'h2') {
      grade = iconOf(node, GRADES);
      continue;
    }
    const name = nameOf(node);
    if (!grade || !name || seen.has(name)) {
      continue;
    }
    seen.add(name);
    const row = { name, status: statusOf(node) };
    if (grade.value) {
      row.level = grade.value;
    }
    rows.push(row);
  }
  return rows;
}
