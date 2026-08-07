import { row } from './rows.js';

// table.lift inside the shared #pisten_anlagen widget - row() reads the status
// glyph and the name, and lib/tools/domutil.js coerces the status word.
export default {
  selector: '#pisten_anlagen table.lift tbody tr',
  parse: row
};
