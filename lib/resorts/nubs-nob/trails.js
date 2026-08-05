import select from '../../select.js';
import { name, RECORD, status } from './index.js';

// cell-2 carries the difficulty as an icon. The site's word for a SINGLE
// black diamond is "expert", which normalizeLevel maps to doubleBlack, so the
// level is emitted explicitly instead of passing the class word through.
// The double diamond is a wrapper <div class="expert-icon double-diamond">
// holding two class-less <i>, so it must be tested before .expert-icon.
function level(node) {
  const cell = select(node, '.cell-2')[0];
  if (!cell) {
    return;
  }
  if (select(cell, '.double-diamond').length) {
    return 'doubleBlack';
  }
  if (select(cell, '.expert-icon').length) {
    return 'black';
  }
  if (select(cell, '.intermediate-icon').length) {
    return 'blue';
  }
  if (select(cell, '.beginner-icon').length) {
    return 'green';
  }
}

// same page and same row markup as the lifts; the trails are every
// data-region block other than the lift one (Nub's North / Nub's Nob South /
// Pintail Peak). The region-less block is a free-text summary - skipped
// because the selector requires a data-region.
export default function parse(dom) {
  const rows = [];
  for (const node of select(
    dom,
    `div.glm-ski-conditions[data-region]:not([data-region="ski-lift-information"]) ${RECORD}`
  )) {
    const s = status(node);
    if (!s) {
      continue;
    }
    rows.push({ name: name(node), status: s, level: level(node) });
  }
  return rows;
}
