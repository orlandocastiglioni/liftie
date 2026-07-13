import coerce from '../../tools/coerce.js';
import sections from './sections.js';

export default function parse(dom) {
  return Object.fromEntries(sections(dom, 'Lifts').map(({ name, status }) => [name, coerce(status)]));
}
