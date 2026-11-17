import { allText, findText } from '../../tools/domutil.js';

// lift status is a hand-edited Squarespace rich text block, and the editor is
// not consistent about bolding the status. Both are live on one page
// (2026-11-16):
//   <p>Ski Moving Carpet: <strong>Closed</strong></p>
//   <p>Chair 1: Closed</p>
// The plain form only counts when the text after the colon is a status word,
// so the other paragraphs in the same block ("24-hour snow total: 11 in",
// "Front Side: 9:00 am to 4:00 pm.") never parse as lifts.
const PLAIN = /^\s*(.+?):\s*(open|closed|on hold|wind hold|hold|scheduled|delayed|opening soon)\s*$/i;

export default {
  selector: '.sqs-html-content p',
  parse: p => {
    const strong = p.children.find(c => c.name === 'strong');
    const m = allText(p).match(/^\s*(.+?):\s*$/);
    if (m && strong) {
      return { name: m[1], status: findText(strong) };
    }
    const plain = !strong && allText(p).match(PLAIN);
    if (plain) {
      return { name: plain[1], status: plain[2] };
    }
  }
};
