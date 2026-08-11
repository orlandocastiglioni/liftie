import select from '../../select.js';

/**
 * Ober Mountain replatformed some time before 2026-08. The slope report used to
 * be a Storyblok payload inside <script id="__NEXT_DATA__">, which this file
 * read directly; that script is gone and the resort published nothing for
 * months as a result.
 *
 * The report is now a Tailwind grid, rendered TWICE - once for desktop and once
 * for mobile:
 *
 *   <div class="hidden ... grid-cols-5 ... lg:grid">          <- desktop, used
 *     <div><span title="Beginner" ...></span> Cub Way</div>   <- difficulty + name
 *     <div>closed <span title="Closed" ...></span></div>      <- status
 *     <div>Ober Easy</div>                                    <- serving lift
 *     <div>1,800'</div>                                       <- length
 *     <div>163'</div>                                         <- vertical
 *   <div class="... grid-cols-3 ... lg:hidden">               <- mobile, skipped
 *
 * Only the five-column desktop variant is read. Taking both would list every
 * slope twice and double every lift's evidence - the derivation in index.js
 * would still be correct, but the trail list would not be.
 *
 * STATUS COMES FROM THE DOT'S title, NOT THE CELL TEXT. The cell also holds a
 * lowercase word, but the title is the attribute the site keys its own styling
 * off and is present even when the text is decorative. Both are 'Open'/'Closed'
 * here, which coerce already knows.
 *
 * The header row is excluded by requiring a difficulty dot: headings carry no
 * span[title].
 */
const ROWS = 'div[class*="grid-cols-5"]';

function cellText(node) {
  return (node?.children ?? [])
    .filter(c => c.type === 'text')
    .map(c => c.data)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function title(node) {
  return select(node, 'span[title]')[0]?.attribs?.title?.trim() ?? '';
}

export default function slopes(dom) {
  const out = [];
  for (const row of select(dom, ROWS)) {
    // a row is five element children; anything else is layout or a heading
    const cells = (row.children ?? []).filter(c => c.type === 'tag');
    if (cells.length !== 5) {
      continue;
    }
    const difficulty = title(cells[0]);
    const name = cellText(cells[0]);
    // no difficulty dot => this is the column header, not a slope
    if (!difficulty || !name) {
      continue;
    }
    const lift = cellText(cells[2]);
    out.push({
      name,
      status: title(cells[1]) || cellText(cells[1]),
      difficulty: difficulty.toLowerCase(),
      lifts: lift ? [lift] : []
    });
  }
  return out;
}
