/**
 * The report is a hand-laid-out Wix page rather than a table: after the
 * "Trail & Lift Status" heading come section labels (LIFTS, BEGINNER,
 * Intermediate, ...) each followed by one `section.wixui-column-strip` holding
 * the rows of that section as `div.wixui-rich-text` boxes spread over three
 * columns.
 *
 * Names and statuses cannot be told apart by class (the Wix hashed classes are
 * text-alignment only, so names like "Really Flat" carry the "status" class)
 * and they do not always share a column (on 2026-02-10 the J-Bar label sat in
 * column 2 with its status in column 3). What does hold across every capture
 * is that, reading the whole strip in DOM order, the n-th name goes with the
 * n-th status - so the rows are rebuilt by partitioning the strip text into
 * statuses and names and zipping them.
 */

const ANCHOR = 'Trail & Lift Status';
const LIFTS = /^lifts$/i;

// complete status vocabulary observed over four captures
const STATUS = /^(open|closed|as needed)$/i;

function text(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

// several labels are prefixed with a zero-width space
function clean(node) {
  return text(node).replace(/​/g, '').replace(/\s+/g, ' ').trim();
}

function hasClass(node, name) {
  return new RegExp(`(^|\\s)${name}(\\s|$)`).test(node.attribs?.class ?? '');
}

/**
 * flatten the document into the ordered list of headings and column strips
 * that follow the anchor
 */
function sections(dom) {
  const list = [];
  let anchored = false;

  (function walk(nodes, strip) {
    for (const node of nodes) {
      if (node.type !== 'tag') {
        continue;
      }
      if (hasClass(node, 'wixui-rich-text')) {
        const value = clean(node);
        if (!value) {
          continue;
        }
        if (strip) {
          strip.texts.push(value);
        } else if (anchored) {
          list.push({ heading: value });
        } else if (value === ANCHOR) {
          anchored = true;
        }
        // rich-text boxes are leaves - never descend into one
        continue;
      }
      if (anchored && !strip && node.name === 'section' && hasClass(node, 'wixui-column-strip')) {
        const next = { texts: [] };
        list.push(next);
        walk(node.children ?? [], next);
        continue;
      }
      walk(node.children ?? [], strip);
    }
  })(dom, null);

  return list;
}

/**
 * rows of the sections that are (lifts) or are not (trails) the lift strip,
 * tagged with the heading they sit under
 */
export default function rows(dom, wantLifts) {
  const result = [];
  let heading;
  for (const item of sections(dom)) {
    if (item.heading) {
      heading = item.heading;
      continue;
    }
    if (!heading || LIFTS.test(heading) !== wantLifts) {
      continue;
    }
    const names = [];
    const statuses = [];
    for (const value of item.texts) {
      (STATUS.test(value) ? statuses : names).push(value);
    }
    for (let i = 0; i < Math.min(names.length, statuses.length); i++) {
      result.push({ name: names[i], status: statuses[i], section: heading });
    }
  }
  return result;
}

/**
 * "As Needed" (they open it on demand) is unknown to coerce and would silently
 * become 'scheduled'; it is not open, so report it as closed
 */
export function status(value) {
  return /^as needed$/i.test(value) ? 'closed' : value;
}
