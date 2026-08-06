import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

/**
 * Cherry Peak's ski report is a Wix Thunderbolt page, but every value is
 * server-rendered - no JS needed. Both the lift table and the three trail
 * tables use the same idiom: the section holds one top-level
 * [data-testid=mesh-container-content] and every data row nests another one,
 * so the descendant-of-descendant selector picks the rows and skips the
 * column headers and divider elements. Within a row the three
 * [data-testid=richTextElement] cells are, in document order:
 * [0] name, [1] status (Open | Closed), [2] grooming (Groomed | Ungroomed).
 *
 * Cell [2] is deliberately dropped: liftie has no grooming field, and
 * "Ungroomed" is unknown to coerce() so feeding it through would silently
 * turn every ungroomed-but-open trail into 'scheduled'.
 *
 * The anchors are Wix component ids. They survive normal edits but would die
 * if a section were deleted and re-added in the Wix editor; the hashed class
 * names are far less stable, and data-testid is platform-level.
 */
export default function statusRows(dom, sectionId) {
  const rows = [];
  for (const row of select(
    dom,
    `#${sectionId} [data-testid="mesh-container-content"] [data-testid="mesh-container-content"]`
  )) {
    const cells = select(row, '[data-testid="richTextElement"]');
    if (cells.length < 2) {
      continue;
    }
    const name = allTextDeep(cells[0]);
    const status = allTextDeep(cells[1]);
    if (!name || !status) {
      continue;
    }
    rows.push({ name, status });
  }
  return rows;
}

// the cell text sits inside a <p><span>...</span></p>, and Wix pads it with
// non-breaking spaces, so collect all descendant text and normalize
function allTextDeep(node) {
  let out = allText(node);
  for (const child of node.children ?? []) {
    if (child.type !== 'text') {
      out += allTextDeep(child);
    }
  }
  return out.replace(/ /g, ' ').trim();
}
