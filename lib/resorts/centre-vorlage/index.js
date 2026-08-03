import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// conditions.centrevorlage.ca serves lifts and trails on one server-rendered
// page. Each lift is <div class="... chair" id="chair_N"> whose inner
// <div class="card-body ..."> gains "chair-closed closed" when the lift is not
// running; running lifts carry a bare "card-body". Status is class-based, not
// text - the <p class="card-text"> holds an hours/colour blurb ("Not Running",
// "Blue - 9h30 - 20h45") that must NOT be fed to coerce.
export default {
  selector: 'div.chair',
  parse(node) {
    const name = findText(select(node, 'h5.card-title')[0])?.trim();
    if (!name) {
      return;
    }
    const body = select(node, '.card-body')[0];
    const closed = /\bclosed\b/.test(body?.attribs.class || '');
    return { name, status: closed ? 'closed' : 'open' };
  }
};
