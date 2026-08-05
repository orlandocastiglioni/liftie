import select from '../../select.js';

/**
 * blueknob.com/trail-map-conditions/ is a hand-built Betheme (mfn) page: one
 * `.mcb-wrap` per trail, three `.column` cells inside it (name, Open:, and
 * Groomed:), and an `<h3>` wrap per difficulty section. The per-element
 * classes are content hashes (mcb-item-3d704938c...) and change whenever the
 * page is edited, so the only stable hooks are `.opentrail`, `.groomedtrail`,
 * `.column_column.trail` and the headings.
 *
 * The status cell is read by taking the whole text of the `.column_attr` that
 * contains `.opentrail` and stripping the 'Open:' label: the value node is
 * sometimes a <p> and sometimes a <div>, and the 'Triple Glades' row even
 * carries class="opentrail" on the value node too, so neither a child index
 * nor "the sibling after .opentrail" is reliable.
 *
 * The site publishes no per-lift names or statuses anywhere (only an
 * aggregate 'Lifts Open: 2' count), hence "no": { "lifts": true }.
 */

// the six section headings. 'Advanced Intermediate' is not in liftie's level
// map - these are gladed natural-cover runs, group them with the blacks.
const levels = {
  beginner: 'green',
  intermediate: 'blue',
  'advanced intermediate': 'black',
  advanced: 'black',
  expert: 'doubleBlack',
  'terrain park': 'terrainPark'
};

function textOf(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textOf).join('');
}

export default function parse(dom) {
  const trails = [];
  let level;
  // headings and rows in document order, so the last heading seen applies
  for (const wrap of select(dom, '.mcb-wrap:has(h3), .mcb-wrap:has(.opentrail)')) {
    const heading = select(wrap, 'h3')[0];
    if (heading) {
      const title = textOf(heading).trim();
      level = levels[title.toLowerCase()] ?? title;
      continue;
    }
    const name = textOf(select(wrap, '.column_column.trail .column_attr')[0]).trim();
    const status = textOf(select(wrap, '.column_attr:has(.opentrail)')[0])
      .replace(/^\s*open\s*:/i, '')
      .trim();
    if (name) {
      // the open column is Yes/No; the Groomed column ('Yes', 'No',
      // 'No - Natural Cover') is deliberately not used as a status
      trails.push({ name, status, level });
    }
  }
  return trails;
}
