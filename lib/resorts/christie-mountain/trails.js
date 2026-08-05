import select from '../../select.js';

// the "Extremely Difficult" band is not in the normalizeLevel map, so every
// heading is resolved here and the already normalized value is returned
const levels = [
  [/extremely\s+difficult/i, 'doubleBlack'],
  [/most\s+difficult/i, 'black'],
  [/more\s+difficult/i, 'blue'],
  [/easiest/i, 'green'],
  [/terrain\s+park/i, 'terrainPark']
];

// "Name - OPEN" pairs; the name may not swallow a dash or cross a line
const ROW = /([^-–—\n]{2,40}?)[ \t]*[-–—][ \t]*(OPEN|CLOSED)\b/g;

function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  if (node.name === 'br') {
    return '\n';
  }
  return (node.children ?? []).map(deepText).join('');
}

/*
 * hand typed Squarespace rich text: one div.sqs-html-content block per
 * difficulty band, each an <h4> heading followed by a single <p> of
 * "Name - OPEN" rows. the resort publishes no lift status anywhere, hence
 * "no": { "lifts": true }.
 *
 * rows cannot be split on <br>: some pairs are separated only by runs of
 * zero width joiners and non breaking spaces inside colour spans. instead
 * <br> is turned into a newline (without it "OPEN" and the next name are
 * glued together and the row regex loses its word boundary), the invisible
 * filler is blanked out and the rows are pulled out by regex.
 * status vocabulary is OPEN/CLOSED only, both known to coerce.
 */
export default function parse(dom) {
  const trails = [];
  for (const block of select(dom, '.sqs-html-content')) {
    const heading = select(block, 'h1, h2, h3, h4, h5, h6')[0];
    if (!heading) {
      continue;
    }
    const title = deepText(heading);
    const level = levels.find(([re]) => re.test(title))?.[1];
    if (!level) {
      continue;
    }
    const body = block.children
      .filter(node => node !== heading)
      .map(deepText)
      .join('\n')
      .replace(/[\u200b-\u200d\u2060\ufeff]/g, ' ')
      .replace(/[^\S\n]+/g, ' ');
    for (const [, name, status] of body.matchAll(ROW)) {
      trails.push({ name: name.trim(), status, level });
    }
  }
  return trails;
}
