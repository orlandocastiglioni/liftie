/**
 * Every cell on the Blade-rendered tables wraps its value in a <p> and often a
 * <strong>/<em> on top of that, so take the whole descendant text and squash
 * the whitespace (including the non-breaking spaces the editor leaves behind).
 */
export default function cellText(node) {
  let out = '';
  const walk = n => {
    if (n.type === 'text') {
      out += n.data;
    }
    for (const child of n.children ?? []) {
      walk(child);
    }
  };
  walk(node);
  return out.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}
