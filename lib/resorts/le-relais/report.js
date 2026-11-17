import select from '../../select.js';

/**
 * skirelais.com/en/winter/trails-snow-conditions/ server-renders two tables,
 * table.trails-list (35 trails) and table.lifts-list (7 lifts), each row with a
 * Day and a Night cell holding span.element-status. The theme's stylesheet
 * (global-compiled.css) defines exactly three modifiers: .open (icon-open),
 * .close (icon-close) and .disabled (opacity 0.2 - the row is not offered at
 * night at all). A row open for the day or the night is open.
 *
 * Out of season every row reads .close, so there is no stale-open board to
 * gate against.
 */
export function deepText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

export function clean(text) {
  return text.replace(/\s+/g, ' ').trim();
}

export function status(row) {
  const cells = select(row, 'span.element-status')
    .map(s => (s.attribs.class ?? '').split(/\s+/))
    .filter(c => !c.includes('disabled'));
  if (cells.some(c => c.includes('open'))) {
    return 'open';
  }
  if (cells.some(c => c.includes('close'))) {
    return 'closed';
  }
}
