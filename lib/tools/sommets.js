import select from '../select.js';

/**
 * Shared parser for Les Sommets (Quebec): one Umbraco page,
 * sommets.com/en/what-to-do/skiing-snowboarding/trail-conditions/, carries a
 * block per mountain, div[data-component="sommets-app-conditions-winter-list"],
 * whose whole roster is embedded as JSON attributes:
 *
 *   data-summary      {"Name":"Sommet Saint-Sauveur","TrailDayOpen":"0 / 41",...}
 *   data-lift-items   [{"Name":"Magic Carpet","IsDayOpen":false,"IsNightOpen":false,...}]
 *   data-trail-items  [{"Name":"Top Notch","IsDayOpen":false,"IsNightOpen":false,
 *                       "Difficulty":"Easy","Type":"Groomed"},...]
 *
 * Each block appears twice (day and night views); the first one wins. A resort
 * names the blocks it is made of. Sommet Saint-Sauveur needs only its own: the
 * page's separate "Versant Avila" block (14 runs, 4 lifts, 2026-11-13) repeats
 * rows that the Saint-Sauveur block already lists by the same names (under
 * other keys), so adding it would count the Avila sector twice. Across blocks,
 * the first row with a name wins. Open means open by day or by night.
 */

const LEVELS = {
  easy: 'green',
  difficult: 'blue',
  'very difficult': 'black',
  extreme: 'doubleBlack',
  'terrain park': 'terrainPark'
};

function blocks(dom) {
  const found = new Map();
  for (const node of select(dom, 'div[data-component="sommets-app-conditions-winter-list"]')) {
    try {
      const name = JSON.parse(node.attribs['data-summary']).Name?.trim();
      if (name && !found.has(name)) {
        found.set(name, node.attribs);
      }
    } catch {
      // a block whose summary does not parse cannot be attributed to a mountain
    }
  }
  return found;
}

function items(attribs, key) {
  try {
    const list = JSON.parse(attribs?.[key] ?? '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function rows(dom, names, key) {
  const all = blocks(dom);
  const result = [];
  const seen = new Set();
  for (const block of names) {
    for (const item of items(all.get(block), key)) {
      const name = item.Name?.trim();
      if (!name || seen.has(name)) {
        continue;
      }
      seen.add(name);
      result.push({ item, name, status: item.IsDayOpen || item.IsNightOpen ? 'open' : 'closed' });
    }
  }
  return result;
}

export function lifts(names) {
  return dom => Object.fromEntries(rows(dom, names, 'data-lift-items').map(({ name, status }) => [name, status]));
}

export function trails(names) {
  return dom =>
    rows(dom, names, 'data-trail-items').map(({ item, name, status }) => {
      const grade = item.Difficulty?.trim();
      const row = { name, status };
      if (grade) {
        row.level = LEVELS[grade.toLowerCase()];
        row.grade = grade;
      }
      return row;
    });
}
