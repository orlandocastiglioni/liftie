import select from '../../select.js';
import { firstToken, squish, text } from './rows.js';

// the site shouts its lift names; title case them for the list
function liftName(name) {
  return name.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());
}

// a lift is a builder wrap holding exactly one h3.title (the short name -
// SLIPWAY / DOUBLE / TRIPLE) and at least two h4.title (h4[0] the lift type,
// h4[1] the status). That shape excludes the TOBOGGAN CHUTE / TUBING HILL /
// UPHILL TRAVEL blocks (no h3) and the footer newsletter block (one h4).
// Status vocabulary is OPEN / CLOSED, both known to coerce.
export default {
  selector: '.wrap.mcb-wrap',
  parse(node) {
    const h3 = select(node, 'h3.title');
    const h4 = select(node, 'h4.title');
    if (h3.length !== 1 || h4.length < 2) {
      return;
    }
    const name = liftName(squish(text(h3[0])));
    if (!name) {
      return;
    }
    return { name, status: firstToken(text(h4[1])) };
  }
};
