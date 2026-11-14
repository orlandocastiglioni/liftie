import select from '../../select.js';

// timberlinelodge.com/conditions/ (2026-11): a plain <table> headed
// Lifts | Status | Type | Operating Hours. Status is a phrase ("Waiting for
// Snow", "Open") whose colour class carries the state: status__color--green
// = open, --red = closed, anything else is treated as a hold. The second
// table on the page is shuttles and parking lots and is never read.
// (Upstream's #lift_status container is gone.)
function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

const COLOURS = { green: 'open', red: 'closed' };

export default function parse(dom) {
  const status = {};
  const table = select(dom, 'table').find(t => text(select(t, 'th')[0]).trim() === 'Lifts');
  for (const row of table ? select(table, 'tbody tr') : []) {
    const cells = select(row, 'td');
    const name = text(select(cells[0] ?? row, 'div')[0]).replace(/\s+/g, ' ').trim();
    if (!name) {
      continue;
    }
    const colour = (select(cells[1] ?? row, '[class*="status__color--"]')[0]?.attribs.class ?? '').match(
      /status__color--(\w+)/
    )?.[1];
    status[name] = COLOURS[colour] ?? (colour ? 'hold' : 'closed');
  }
  return status;
}
