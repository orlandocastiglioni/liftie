import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';
import { statusToken } from './rows.js';

/**
 * 2026-11 redesign (the old /the-mountain/ski-conditions-2/open-skiable-domain/
 * URL now 301s to /en/conditions/, and the old div.lifts-conditions table is
 * gone - which is why the board went empty on 2026-11-18). Lifts are the
 * "Chairlifts" block, section.flexible_statuts.-telesieges; its sibling
 * section.-chalets reuses the same row markup for the lodges, hence the scope.
 *
 *   <div class="flexible_statuts_list_row js-pistes-row" data-name="IV Ouest">
 *     <div class="... -name"><span class="flexible_statuts_dot -closed"></span><span>IV Ouest</span></div>
 *     <div class="... -detail">double</div>
 *     <div class="...">Closed</div>
 *   </div>
 *
 * The header row carries no js-pistes-row class. The name is the chair's
 * roman numeral, as before; the redesign spells the west chairs in French
 * ('IV Ouest', was 'IV West'), and it now lists seven chairs.
 */
export default function parse(dom) {
  const status = {};
  for (const row of select(dom, 'section.flexible_statuts.-telesieges .flexible_statuts_list_row.js-pistes-row')) {
    const name = (
      row.attribs?.['data-name'] ?? allText(select(row, '.-name span:not(.flexible_statuts_dot)')[0] ?? {})
    ).trim();
    const token = statusToken(select(row, '.flexible_statuts_dot')[0]);
    if (name && token) {
      status[name] = coerce(token);
    }
  }
  return status;
}
