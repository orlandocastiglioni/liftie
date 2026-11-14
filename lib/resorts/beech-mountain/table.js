import select from '../../select.js';
import coerce from '../../tools/coerce.js';

/**
 * beechmountainresort.com/mountain/winter-trail-map/: two
 * table.lift-trail-report-table blocks, Lift | Status and
 * Trail | Status | Groomed. The status cell is a Font Awesome icon:
 * fa-window-close = closed, a check = open; lifts also print the state as
 * text (div.scheduled-time, "CLOSED"), which wins when present. A trail's
 * difficulty is the icon before its name: fa-circle green, fa-square-full
 * blue, fa-diamond black, fa-rectangle-wide (orange) terrain park.
 */
const LEVELS = {
  'fa-circle': 'green',
  'fa-square-full': 'blue',
  'fa-diamond': 'black',
  'fa-rectangle-wide': 'terrainPark'
};

function ownText(node) {
  return (node?.children ?? [])
    .filter(c => c.type === 'text')
    .map(c => c.data)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

function deepText(node) {
  if (!node) {
    return '';
  }
  return node.type === 'text' ? node.data : (node.children ?? []).map(deepText).join('');
}

function iconStatus(cell) {
  const cls = select(cell ?? { children: [] }, 'i')[0]?.attribs?.class ?? '';
  if (/close|times|ban/.test(cls)) {
    return 'closed';
  }
  if (/check/.test(cls)) {
    return 'open';
  }
  return cls ? 'hold' : undefined;
}

export function rows(dom, header) {
  const table = select(dom, 'table.lift-trail-report-table').find(t =>
    new RegExp(`^${header}$`, 'i').test(deepText(select(t, 'td, th')[0]).trim())
  );
  // the lift table's header cells are bare <td>s, so skip any row without a
  // status icon rather than relying on <thead>
  return (table ? select(table, 'tr') : []).flatMap(tr => {
    const [nameCell, statusCell] = select(tr, 'td');
    const name = ownText(nameCell);
    if (!name || !select(statusCell ?? { children: [] }, 'i').length) {
      return [];
    }
    const said = deepText(select(nameCell, '.scheduled-time')[0]).trim();
    const icon = select(nameCell, 'i')[0]
      ?.attribs?.class?.split(/\s+/)
      .find(c => c in LEVELS);
    return [{ name, status: said ? coerce(said) : (iconStatus(statusCell) ?? 'closed'), level: LEVELS[icon] }];
  });
}
