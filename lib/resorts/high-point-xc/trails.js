import select from '../../select.js';

/**
 * High Point is a pure XC/snowshoe centre - no lifts, so resort.json sets
 * no.lifts and this is the only parser.
 *
 * The report is a hand-edited Google Sites page with no <table>: every trail
 * is its own <p class="zfr3Q"> that starts with a difficulty emoji, and the
 * editor scatters the text over arbitrarily many <span> nodes (names get cut
 * mid-word, e.g. 'Steeny'+'k'+'ill'), so the whole paragraph must be joined
 * before matching. liftie's html parser drops whitespace-only text nodes
 * between those spans, which glues the status onto the technique
 * ('... / Classic / SkateVOPEN, groomed ...'), hence the status regex has no
 * leading word boundary. The V / X column is not usable as status: a literal
 * 'V' sits in open and closed rows alike.
 *
 * Row shape: '<marker> <Name> / <N> km / <technique> <V|X> <STATUS>, <notes>'
 */

// difficulty is published as an emoji, never as a word
const LEVELS = {
  '\u{1F7E2}': 'green', // green circle
  '\u{1F7E6}': 'blue', // blue square
  '◆': 'black' // black diamond
};

const ROW = /^([\u{1F7E2}\u{1F7E6}◆])\u{FE0F}?\s*(.+)$/u;

function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

export default function parse(dom) {
  const trails = [];
  for (const p of select(dom, 'p.zfr3Q')) {
    // \s covers the U+00A0 the editor sprinkles around
    const match = deepText(p).replace(/\s+/g, ' ').trim().match(ROW);
    if (!match) {
      continue;
    }
    const [, marker, rest] = match;
    const name = rest.split('/')[0].trim();
    // 'OPEN' / 'CLOSED' - the only status vocabulary the page uses
    const status = rest.match(/(OPEN|CLOSED)/i)?.[1];
    if (!name || !status) {
      continue;
    }
    trails.push({ name, status, level: LEVELS[marker] });
  }
  return trails;
}
