import select from '../../select.js';

// Murray Ridge (a Squarespace site) posts a fresh free-text conditions entry
// each day in a blog collection. There is no structured lift/trail widget, so
// both parsers read the newest post (the first article.entry) and, inside it,
// the first .sqs-html-content block that carries a "LIFTS OPEN" line.
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

// Only the NEWEST post counts. The blog keeps last season's posts on the
// page, so scanning down for the first block with a "LIFTS OPEN" line found
// the 2026-03-21 report under five newer off-season posts (the season-closed
// notice, the fundraiser...) and published the T-Bar open and eight groomed
// runs in November. When the newest post is not a conditions report there is
// no report today: lifts read closed and no trails are published. A non-report
// post in season (an event notice above today's conditions) therefore errs
// towards closed until the next daily post, never towards stale opens.
function newest(dom) {
  return select(dom, 'article.entry')[0];
}

export default function report(dom) {
  const article = newest(dom);
  if (!article) {
    return '';
  }
  for (const block of select(article, '.sqs-html-content')) {
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
