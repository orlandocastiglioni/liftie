/**
 * Small DOM helpers shared by the hunt-hollow lift and trail parsers.
 *
 * The club runs a Kentico ("clubsystems group") CMS whose report page is a
 * pile of hand-edited <table>s. Both halves need to read text across nested
 * <h3>/<b> wrappers and to notice <br> boundaries, which the generic
 * lib/tools/domutil helpers (direct children only) do not do.
 */

// depth-first walk over every descendant node, in document order
export function walk(node, visit) {
  for (const child of node?.children ?? []) {
    visit(child);
    walk(child, visit);
  }
}

// collapse whitespace (JS \s covers the &nbsp; this CMS sprays everywhere)
export function clean(str) {
  return (str ?? '').replace(/\s+/g, ' ').trim();
}

// all text under a node, wrappers ignored
export function deepText(node) {
  let text = '';
  walk(node, n => {
    if (n.type === 'text') {
      text += n.data;
    }
  });
  return clean(text);
}

// text under a node, split into fragments on every <br>. Empty fragments are
// dropped: the cells are padded with &nbsp;-only lines between entries.
export function textLines(node) {
  const lines = [];
  let current = '';
  walk(node, n => {
    if (n.type === 'text') {
      current += n.data;
    } else if (n.type === 'tag' && n.name === 'br') {
      lines.push(current);
      current = '';
    }
  });
  lines.push(current);
  return lines.map(clean).filter(Boolean);
}

// direct <td> children of a row
export function cells(row) {
  return (row.children ?? []).filter(n => n.type === 'tag' && n.name === 'td');
}
