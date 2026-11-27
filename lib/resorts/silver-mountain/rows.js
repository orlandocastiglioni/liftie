import select from '../../select.js';

/**
 * 2026-11 redesign: /mountain-info/trail-status now 301s to
 * /snow-report/trail-status/, a Bricks-builder page, and the old
 * section.mountain-stats .box h3/h4 markup is gone - which is why the board
 * went empty on 2026-11-18. Each lift is one <details> block whose <summary>
 * carries the lift and its badge, and whose body lists that lift's trails:
 *
 *   <details class="... status-list__item">
 *     <summary class="... status-list__head">
 *       <h2 class="... status-list__name">Chair 1</h2>
 *       <span class="... status-badge" data-status="closed">Closed</span>
 *     </summary>
 *     <ul class="... status-list__rows">
 *       <li class="... status-list__row">
 *         <span class="... status-list__row-name">Alpenway</span>
 *         <span class="... trail-sign" data-sign="easy" aria-label="Easy"></span>
 *         <span class="... status-badge" data-status="closed">Closed</span>
 *       </li> ...
 *
 * Select only on the semantic BEM classes and data attributes. The brxe-xxxxxx
 * classes beside them are Bricks element ids, regenerated whenever the page is
 * rebuilt in the editor.
 */
export function items(dom) {
  return select(dom, '.status-list details.status-list__item');
}

export function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

// data-status is the machine token ('closed'; the visible word is 'Closed').
// Fall back to the word if the attribute ever goes missing.
export function badge(node) {
  return node?.attribs?.['data-status'] || text(node).trim() || undefined;
}

export function label(node) {
  return text(node).replace(/\s+/g, ' ').trim();
}
