import select from '../../select.js';

/**
 * Shared readers for the hand-maintained Elementor page that carries both the
 * lift and the trail report. Rows are `section.elementor-inner-section`;
 * a row holding an icon-box widget is a trail, anything else is a lift row,
 * a header row, the legend or the staff list.
 */

// deep text - Elementor wraps titles in extra spans and pads everything with
// tabs and newlines, so findText()/allText() are not enough on their own
export function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children || []).map(text).join('');
}

export function squish(str) {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * THE WHOLE TRICK: the editor keeps every status variant (OPEN / CLOSED /
 * ON HOLD / SCHEDULED) in the markup as its own icon-list widget and hides the
 * inactive ones with elementor-hidden-desktop. Widget order is not stable -
 * some rows are hidden-first, some visible-first - so the live status is
 * whichever widget lacks that class, never a fixed index.
 *
 * Returns undefined when the editor has hidden every variant, which does
 * happen (the "blue chair" row is in that state on the live summer page).
 */
export function visibleStatus(node) {
  const widget = select(node, '.elementor-widget-icon-list').find(
    w => !/elementor-hidden-desktop/.test(w.attribs.class || '')
  );
  if (!widget) {
    return;
  }
  return squish(text(select(widget, '.elementor-icon-list-text')[0])) || undefined;
}
