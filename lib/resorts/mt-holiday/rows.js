import select from '../../select.js';

/**
 * Mt. Holiday publishes no conditions on its own site: the "Trail Report" link
 * points at a hand-edited Google Doc, "Mt. Holiday Snow Report", whose
 * /mobilebasic rendering is static HTML. Both sections live in that one
 * document - a heading ("Lift Status", "Terrain / Trail Status") followed by a
 * <ul>, one <li> per lift or run.
 *
 * The <ul>'s lst-kix_* class is regenerated on every doc edit, so the list is
 * found by walking forward from the heading text. Each <li> starts with the
 * dropdown chip holding the status (Open or Closed - the only two options the
 * doc's preset defines); the rest of the line is free text the operator keeps
 * reformatting between seasons, so it is handed back raw.
 */

// emoji legend glyphs (🟢 🟦), the two diamonds the doc mixes for black runs
// (U+25C6, U+2BC1) and variation selectors
const GLYPHS = /\u{FE0F}|[\u{1F300}-\u{1FAFF}\u{25A0}-\u{27BF}\u{2B00}-\u{2BFF}]/gu;

export function clean(text) {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

export function strip(text) {
  return clean((text ?? '').replace(GLYPHS, ' '));
}

// the operator writes "Name - Level - glyph" for runs and "Name - Services
// glyphs" for lifts, so the name is the first spaced-dash segment - but rows
// without any suffix exist too (the whole line is then the name)
export const SEPARATOR = /\s+[-–—]\s+/;

export function name(text) {
  return strip(text.split(SEPARATOR)[0]).replace(/[,;.]+$/, '');
}

function deepText(node) {
  if (node.type === 'text') {
    return node.data ?? '';
  }
  return (node.children ?? []).map(deepText).join('');
}

function list(dom, heading) {
  const nodes = select(dom, '.doc-content p, .doc-content h1, .doc-content h2, .doc-content h3, .doc-content ul');
  const start = nodes.findIndex(node => node.name !== 'ul' && heading.test(clean(deepText(node))));
  if (start < 0) {
    return [];
  }
  for (const node of nodes.slice(start + 1)) {
    if (node.name === 'ul') {
      return select(node, 'li');
    }
    // a headed block with no list of its own - do not borrow the next section's
    if (clean(deepText(node))) {
      return [];
    }
  }
  return [];
}

export default function rows(dom, heading) {
  return list(dom, heading).map(li => {
    const chip = select(li, 'span')[0];
    const status = chip ? clean(deepText(chip)) : '';
    const text = clean(deepText(li)).slice(status.length);
    return { status, text: text.replace(/^[\s,:-]+/, '') };
  });
}
