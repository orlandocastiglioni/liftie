/*
 * skithebeav.com/mountain/conditions/ is a server-rendered WordPress page whose
 * Foundation accordion holds every lift, with that lift's runs nested in the
 * accordion body (see trails.js, same document).
 *
 * One `<li class="accordion-item">` per lift; its `<a>` has the name as child
 * text node 0 and the status in the `<span>` at child 1:
 *
 *   <a href="#link1" class="open">Little Beaver Triple Lift<span>open</span></a>
 *
 * The `<a>`'s own class duplicates the status, but the span is the value the
 * page actually renders, so read that. Status vocabulary is `open` / `closed`
 * only - both are keys in coerce.js. Scoped to `ul.accordion.lifts` (the id
 * on that element is misspelled `status-accordian`, so it is deliberately not
 * used as the hook).
 *
 * The page keeps last season's report up all summer, so the whole read is gated
 * on the report's own date stamp - see fresh.js.
 */
import { collect } from '../../tools/domutil.js';
import isFresh from './fresh.js';

const SELECTOR = 'ul.accordion.lifts > li.accordion-item > a';
const PARSE = { name: 0, status: 1 };

export default function parse(dom) {
  return isFresh(dom) ? collect(dom, SELECTOR, PARSE) : {};
}
