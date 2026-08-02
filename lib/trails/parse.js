import Debug from 'debug';
import select from '../select.js';
import coerce from '../tools/coerce.js';
import { text } from '../tools/domutil.js';

const debug = Debug('liftie:trails');

const levels = {
  green: 'green',
  greencircle: 'green',
  easy: 'green',
  easier: 'green',
  easiest: 'green',
  beginner: 'green',
  novice: 'green',

  blue: 'blue',
  bluesquare: 'blue',
  intermediate: 'blue',
  moredifficult: 'blue',
  medium: 'blue',

  black: 'black',
  blackdiamond: 'black',
  advanced: 'black',
  difficult: 'black',
  mostdifficult: 'black',
  blueblack: 'black',
  hard: 'black',

  doubleblack: 'doubleBlack',
  doubleblackdiamond: 'doubleBlack',
  expert: 'doubleBlack',
  extreme: 'doubleBlack',
  expertsonly: 'doubleBlack',
  expertonly: 'doubleBlack',

  terrainpark: 'terrainPark',
  terrainparks: 'terrainPark',
  terrain: 'terrainPark',
  park: 'terrainPark',
  freestyle: 'terrainPark',
  freestyleterrain: 'terrainPark'
};

export function normalizeLevel(str) {
  if (!str) {
    return;
  }
  return levels[str.replace(/[\s_-]+/g, '').toLowerCase()];
}

/**
 * collect trail rows from the dom
 *
 * descriptor is either a function (dom => array of {name, status, level?})
 * or { selector, parse } in the same idiom as lift parsers, where parse is
 * a function (node => {name, status, level?}) or descriptors for name/status/level
 */
export default function collect(dom, descriptor) {
  const rows = typeof descriptor === 'function' ? descriptor(dom) : collectRows(dom, descriptor);
  const result = [];
  for (const row of rows ?? []) {
    if (!row?.name) {
      continue;
    }
    const trail = {
      name: row.name.trim(),
      status: coerce(row.status)
    };
    const level = normalizeLevel(row.level);
    if (level) {
      trail.level = level;
    }
    result.push(trail);
  }
  debug('collected %d trails', result.length);
  return result;
}

function collectRows(dom, { selector, parse }) {
  const parseFn =
    typeof parse === 'function'
      ? parse
      : node => {
          if (parse.filter && !parse.filter(node)) {
            return;
          }
          const name = text(node, parse.name);
          if (!name) {
            return;
          }
          return {
            name,
            status: text(node, parse.status),
            level: parse.level && text(node, parse.level)
          };
        };
  return select(dom, selector).map(parseFn).filter(Boolean);
}
