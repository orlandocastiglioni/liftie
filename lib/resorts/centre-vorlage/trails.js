import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Difficulty is the <div class="rating rating-XXX"> inside each run card. The
// double-black token is "rating-double_black" (not the "rating-double" the
// recon guessed); normalizeLevel would also fold it, but we map explicitly.
const LEVELS = {
  'rating-green': 'green',
  'rating-blue': 'blue',
  'rating-black': 'black',
  'rating-double_black': 'doubleBlack'
};

// Each run is <div class="col-lg-6 pb-3" id="trail_N"> with a
// <div class="card-body ..."> that gains "trail-closed closed" when the run is
// not open (open cards carry a bare "card-body"). Status is class-based; the
// <p class="card-text"> is a surface blurb (Groomed/Natural/Closed/Marginal/...)
// that must NOT be fed to coerce.
export default {
  selector: 'div[id^="trail_"]',
  parse(node) {
    const name = findText(select(node, 'h5.card-title')[0])?.trim();
    if (!name) {
      return;
    }
    const body = select(node, '.card-body')[0];
    const closed = /\bclosed\b/.test(body?.attribs.class || '');
    const ratingClass = (select(node, 'div.rating')[0]?.attribs.class || '')
      .split(/\s+/)
      .find(c => c.startsWith('rating-'));
    return {
      name,
      status: closed ? 'closed' : 'open',
      level: LEVELS[ratingClass]
    };
  }
};
