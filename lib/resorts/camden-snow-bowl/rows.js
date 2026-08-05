/**
 * Shared readers for the BeTheme "Muffin builder" conditions page that
 * carries both the lift and the trail report.
 *
 * The builder regenerates its mcb-item-*, mcb-column-inner-* and mcb-section-*
 * class suffixes on every page edit, so only the stable base classes
 * (.wrap.mcb-wrap, .mfn-list, .mfn-list-item, .mfn-list-desc, h3.title,
 * h4.title) may be selected on.
 */

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

// a status cell often carries a trailing sentence -
// "CLOSED Projected Opening Date 1/7/25" - and coerce would turn the whole
// string into <scheduled>, so only the leading token is the status token
export function firstToken(str) {
  return squish(str).split(' ')[0];
}
