import select from '../../select.js';

// Murray Ridge (a Squarespace site) posts a fresh free-text conditions entry
// each day in a blog collection. There is no structured lift/trail widget, so
// both parsers read the newest daily post: the first .sqs-html-content block
// that carries a "LIFTS OPEN" line (later blocks are the footer / other posts).
// Each conditions line is its own <p>, so we join the paragraphs with newlines
// and let callers pull the label lines they need.
function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  if (node.name === 'br') {
    return '\n';
  }
  return (node.children || []).map(deepText).join('');
}

export default function report(dom) {
  for (const block of select(dom, '.sqs-html-content')) {
    const text = select(block, 'p')
      .map(p =>
        deepText(p)
          .replace(/[ \t]+/g, ' ')
          .trim()
      )
      .filter(Boolean)
      .join('\n');
    if (/lifts?\s+open/i.test(text)) {
      return text;
    }
  }
  return '';
}

// the text following a label on its line, e.g. afterLabel(text, /lifts open:?/i)
export function afterLabel(text, labelRe) {
  const line = text.split('\n').find(l => labelRe.test(l));
  if (!line) {
    return '';
  }
  return line.slice(line.search(labelRe)).replace(labelRe, '').trim();
}

// the comma-separated items following a label (blank list if the label is absent)
export function commaList(text, labelRe) {
  return afterLabel(text, labelRe)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}
