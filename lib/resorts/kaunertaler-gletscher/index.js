import { allText, collect } from '../../tools/domutil.js';
import reportedAt from './reported-at.js';

/**
 * /kaunertaler-gletscher/nowbox.html is server-rendered and holds two tables:
 * #liftStatus (10 lifts) and #pistenStatus (27 pistes, see trails.js). Byte for
 * byte the same CMS as the sibling lib/resorts/pitztaler-gletscher - same
 * operator group, tirolgletscher.com - so this is that parser's shape.
 *
 * STATUS is a coloured CSS dot and nothing else: no German status word appears
 * anywhere on the page. The dot is either `tableDot closed` or a bare
 * `tableDot`, i.e. the open token is the EMPTY STRING, which coerce.js reads as
 * 'scheduled' (it skips the normalise branch on a falsy input and then finds no
 * key). Default it explicitly.
 *
 * TRAP: every lift row carries the dot TWICE - once in the mobile name cell
 * (td[scope=row].showOnMobile) and once in td.status.hideOnMobile - so a naive
 * '.tableDot' scan doubles up. Anchor on td.status.
 */
export function status(cell) {
  const dot = cell?.children.find(c => c.name === 'div' && c.attribs?.class?.includes('tableDot'));
  if (!dot) {
    return;
  }
  return dot.attribs.class.replace('tableDot', '').trim() || 'open';
}

export function cells(row) {
  const tds = row.children.filter(c => c.name === 'td');
  return cls => tds.find(td => td.attribs?.class?.split(/\s+/).includes(cls));
}

export default function lifts(dom) {
  const ls = collect(dom, '#liftStatus table tbody tr', row => {
    const byClass = cells(row);
    // the desktop name cell; its showOnMobile twin holds the same text
    const nameCell = row.children.find(
      c => c.attribs?.scope === 'row' && c.attribs?.class?.split(/\s+/).includes('hideOnMobile')
    );
    const s = status(byClass('status'));
    if (!nameCell || !s) {
      return;
    }
    return { name: allText(nameCell).trim(), status: s };
  });
  const at = reportedAt(dom, 'liftStatus');
  if (at) {
    // non-enumerable: metadata about the report, not one of its lifts
    Object.defineProperty(ls, 'reportedAt', { value: at });
  }
  return ls;
}
