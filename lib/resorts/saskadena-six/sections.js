import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

// lifts and trails share node--type-lift-trail articles, split by the
// preceding h2 section heading (Lifts / Trails)
export default function sections(dom, wanted) {
  const rows = [];
  let section;
  for (const node of select(dom, 'h2, article.node--type-lift-trail')) {
    if (node.name === 'h2') {
      section = findText(node)?.trim();
      continue;
    }
    if (section !== wanted) {
      continue;
    }
    const title = select(node.children, '.cell.title')[0];
    const status = select(node.children, '.cell.status .field__item')[0];
    if (title && status) {
      rows.push({ name: allText(title).trim(), status: findText(status) });
    }
  }
  return rows;
}
