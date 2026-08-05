import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

/**
 * Marquette Mountain publishes lifts AND trails in a single "publish to web"
 * Google Sheet ("Marquette Mountain Resort - Winter Trail Report") that the
 * WordPress site iframes. We read the sheet directly, which also sidesteps the
 * seasonal swap between /the-mountain/lift-terrain-status/ and
 * .../lift-terrain-status-spring/. The gid/single/widget=false query string is
 * what makes Google render the grid server-side; the bare /pubhtml is a JS
 * shell with no rows, and the CSV export drops the status entirely.
 *
 * There is no status *text* in the grid: every row carries a literal "O" and a
 * literal "X" side by side, and the operator marks the active one by setting
 * the other one's font colour equal to its cell background. So the sheet's
 * generated <style> block is parsed into { className: declarations } and a cell
 * counts as visible when its colour differs from its background.
 *
 * Difficulty is an <img> with no alt text, but the sheet is self-describing:
 * the "Key" block at the bottom repeats each image next to its label, so the
 * image -> level map is rebuilt on every parse. Do not hardcode the
 * sheets-images-rt ids - they already rotated once between recon and
 * implementation while the legend labels stayed put.
 */

// google emits one class per distinct cell format: `.ritz .waffle .s7{...}`
const CELL_RULE = /\.(s\d+)\s*\{([^}]*)\}/g;

const LEGEND = /^(easier|more difficult|most difficult|expert only|freestyle terrain)$/i;

export default function statusRows(dom) {
  const styles = styleMap(dom);
  const levels = {};
  const rows = [];
  let section = null;

  for (const tr of select(dom, 'table.waffle tbody tr')) {
    const cells = select(tr, 'td');
    const texts = cells.map(cellText);

    // short rows are the title, the =TODAY() date cell and the trailing "Key"
    // block; the legend rows in there are what builds the image -> level map
    if (cells.length < 4) {
      const src = image(cells[0]);
      if (src && LEGEND.test(texts[1] ?? '')) {
        levels[src] = texts[1];
      }
      section = null;
      continue;
    }

    // section headers read: <Difficulty> | <label> | Open | Closed | Notes
    if (texts[2] === 'Open' && texts[3] === 'Closed') {
      section = texts[1];
      continue;
    }
    if (!section || !texts[1]) {
      continue;
    }

    rows.push({
      // a trailing "**" flags natural snow / ride at your own risk
      name: texts[1].replace(/\s*\*+$/, '').trim(),
      status: status(cells, styles),
      image: image(cells[0]),
      isLift: /lift/i.test(section)
    });
  }

  // the legend sits below the data, so levels are resolved in a second pass
  return rows.map(row => ({ ...row, level: levels[row.image] }));
}

function status(cells, styles) {
  if (visible(cells[2], styles)) {
    return 'open';
  }
  if (visible(cells[3], styles)) {
    return 'closed';
  }
  return 'scheduled';
}

function visible(cell, styles) {
  const decl = styles[cell?.attribs?.class?.trim().split(/\s+/)[0]] ?? {};
  return (decl.color ?? '#000000') !== (decl['background-color'] ?? '#ffffff');
}

function styleMap(dom) {
  const styles = {};
  for (const node of select(dom, 'style')) {
    for (const [, name, body] of allText(node).matchAll(CELL_RULE)) {
      const decl = {};
      for (const pair of body.split(';')) {
        const colon = pair.indexOf(':');
        if (colon > 0) {
          decl[pair.slice(0, colon).trim()] = pair
            .slice(colon + 1)
            .trim()
            .toLowerCase();
        }
      }
      styles[name] = decl;
    }
  }
  return styles;
}

function cellText(cell) {
  return (findText(cell) ?? '').replace(/\s+/g, ' ').trim();
}

function image(cell) {
  return cell && select(cell, 'img')[0]?.attribs.src;
}
