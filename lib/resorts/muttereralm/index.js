import select from '../../select.js';
import { findText } from '../../tools/domutil.js';
import status from './status.js';

/**
 * SKI plus CITY publishes no per-row area tag anywhere - not in the shared
 * winter.intermaps.com/innsbruck feed, not in the network snow report - so an
 * area is identified by having its own page, and this parser reads
 * Muttereralm's and only Muttereralm's. (It is ski-connected to Axamer Lizum,
 * which publishes separately; the link run "11 Skiweg Axamer Lizum" appears in
 * Muttereralm's own slope table and belongs here.)
 *
 * Lift rows are #pisten_anlagen table.lift tbody tr, three cells each:
 * [status icon, lift-type icon, name]. Scope every selector to the
 * #pisten_anlagen div - the same page also renders table.forecast, whose rows
 * would otherwise be swept in as lifts.
 */
export default {
  selector: '#pisten_anlagen table.lift tbody tr',
  parse(node) {
    const tds = select(node, 'td');
    const name = findText(tds.at(-1))?.trim();
    if (!name) {
      return;
    }
    return { name, status: status(select(tds[0], 'i')[0]?.attribs.class) };
  }
};
