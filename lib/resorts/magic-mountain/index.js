import { cellStatus, cleanName } from './table.js';

// Wix server-renders the snow report; the lift table is the one wrapped in
// #comp-m2w9rurk5. The hashed Wix class names (VG9vCO, AxaXxM, ...) change on
// every republish, so rows are anchored on the component id and the semantic
// wixui-table__* classes instead. There are no whitespace text nodes between
// the cells, so child indexes land on the <td>s: 0 = lift, 1 = Open,
// 2 = capacity, 3 = type. <thead> holds the header row, so tbody excludes it.
export default {
  selector: '#comp-m2w9rurk5 tbody.wixui-table__body tr.wixui-table__row',
  parse: {
    name: { child: 0, fn: cleanName },
    status: { child: 1, fn: cellStatus }
  }
};
