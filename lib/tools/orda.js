import select from '../select.js';
import coerce from './coerce.js';
import { allText } from './domutil.js';

/**
 * Shared parser for the Olympic Regional Development Authority's ski areas
 * (Whiteface, Gore, Belleayre): one WordPress plugin, orda-conditions, renders
 * a lifts table and one trails table per sector.
 *
 *   .conditions-data-row.lifts-row / .trails-row
 *     .data-type img[title]  lift type, or the trail's difficulty
 *                            (Easier / More Difficult / Most Difficult / Expert Only)
 *     .data-name             name
 *     .data-icon img[src]    .../icon-<status>.svg[?ts=...]: open, closed, on-hold, ...
 *
 * The sites sit behind a Cloudflare challenge, so their descriptors fetch
 * through FlareSolverr. Upstream's whiteface lift descriptor anchored its
 * regex on '.svg$', which the trail icons' '?ts=' cache-buster breaks.
 * Whiteface lists its beginner area under two sectors (Bear, Wolf, Mixing
 * Bowl, ...); a name already seen is skipped.
 */

const ICON = /icon-([a-z-]+)\.svg/;

function textOf(node) {
  return node ? allText(node).replace(/\s+/g, ' ').trim() : '';
}

function statusOf(row) {
  const src = select(row, '.data-icon img')[0]?.attribs?.src ?? '';
  const word = src.match(ICON)?.[1];
  return word ? coerce(word.replace(/-/g, '')) : undefined;
}

function rows(dom, kind) {
  const seen = new Set();
  const result = [];
  for (const row of select(dom, `.conditions-data-row.${kind}-row`)) {
    const name = textOf(select(row, '.data-name')[0]);
    if (!name || seen.has(name)) {
      continue;
    }
    seen.add(name);
    result.push({ row, name, status: statusOf(row) });
  }
  return result;
}

export function lifts(dom) {
  return Object.fromEntries(rows(dom, 'lifts').map(({ name, status }) => [name, status ?? 'closed']));
}

export function trails(dom) {
  return rows(dom, 'trails').map(({ row, name, status }) => ({
    name,
    status: status ?? 'closed',
    level: select(row, '.data-type img')[0]?.attribs?.title
  }));
}
