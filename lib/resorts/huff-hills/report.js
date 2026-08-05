import select from '../../select.js';

/**
 * Huff Hills hand-edits /snowreport in Duda's WYSIWYG editor, so the markup is
 * cosmetically chaotic - nested empty <span>s, inline colours, nbsp/BOM
 * padding, rows alternating between <h3> and <p>, and features that flip
 * between a one-line and a two-line form between edits. Everything is
 * server-rendered though, so a single plain fetch feeds both parsers.
 *
 * A status row reads <span>Name -</span><strong>Status</strong>: the name and
 * the status are siblings, not cells. The recipe that survives all of the
 * above (proven on two captures 17 months apart) is - take the recursive text
 * of the row, cut off the text of its LAST <strong>, and keep the row only if
 * what is left ends with a dash. That single rule drops every heading, snow
 * total and prose line that shares the column.
 *
 * The report lives in two Duda columns. Anchor on the heading text rather than
 * the numeric widget ids (which are regenerated if the operator re-adds a
 * widget); note also that a CSS identifier cannot start with a digit, so those
 * ids would need the attribute form anyway.
 */

const HEADING = {
  lifts: /^Lift Status/i,
  trails: /^Terrain\s*\/\s*Runs Open/i
};

// non-lift features that share the lift column. They must be kept out of the
// lift roster (in the 2025-03-26 capture "Uphill Traffic - Closed for Season"
// was a one-line row and leaked in as a fifth lift) and are reported as trails.
export const FEATURES = /^(Terrain Park|Uphill Traffic|Donut Hole Hiking Area)$/i;

// a line holding nothing but a status, used to pair the two-line form
const STATUS_LINE = /^(open|closed|hold|on hold|groomed)\b/i;

function deepText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

// nbsp and the stray BOM the editor leaves behind would otherwise break the
// trailing-dash test ("South Face&nbsp;&nbsp;-")
function clean(node) {
  return deepText(node)
    .replace(/[\u00a0\u200b\ufeff]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The operator types statuses by hand, so they are free prose. "Open",
 * "Closed" and "Closed for Season" are all coerce() already knows and all that
 * has ever been captured, but the two archived pages are both end-of-season -
 * peak-season wording ("Closed for the Season", "Open - Race Only", "Machine
 * Groomed", "Wind Hold") is plausible and would silently become 'scheduled'.
 * Collapse those families to a canonical word; anything unrecognised is passed
 * through untouched so coerce still resolves and logs it.
 */
export function status(raw) {
  const s = raw.toLowerCase();
  if (/^(wind |weather |on )?hold\b/.test(s)) {
    return 'hold';
  }
  if (/^open/.test(s)) {
    return 'open';
  }
  if (/^closed/.test(s)) {
    return 'closed';
  }
  if (/^(machine )?groomed/.test(s)) {
    return 'open';
  }
  return raw;
}

// the <h3>/<p> rows of one column, in page order, after its heading
function column(dom, which) {
  const heading = HEADING[which];
  const div = select(dom, 'div.dmNewParagraph').find(node =>
    select(node, 'h3 > strong').some(strong => heading.test(clean(strong)))
  );
  const all = (div?.children ?? []).filter(node => node.name === 'h3' || node.name === 'p');
  const start = all.findIndex(row => heading.test(clean(row)));
  return start < 0 ? [] : all.slice(start + 1);
}

// "Name -  Status" on a single row
function oneLine(row) {
  const strongs = select(row, 'strong');
  if (strongs.length === 0) {
    return;
  }
  const st = clean(strongs[strongs.length - 1]);
  const full = clean(row);
  const cut = full.lastIndexOf(st);
  if (!st || cut <= 0) {
    return;
  }
  const name = full.slice(0, cut).trim();
  if (!name.endsWith('-')) {
    return;
  }
  return { name: name.slice(0, -1).trim(), status: st };
}

/**
 * Terrain Park / Uphill Traffic / Donut Hole Hiking Area are usually written
 * across two rows - the name in one, the status in the next - so the one-line
 * rule cannot see them. Pick them up with a look-ahead pass, while still
 * accepting the one-line form the same features sometimes take.
 */
function features(rows) {
  const out = [];
  for (let i = 0; i < rows.length; i++) {
    const inline = oneLine(rows[i]);
    if (inline) {
      if (FEATURES.test(inline.name)) {
        out.push(inline);
      }
      continue;
    }
    const name = clean(rows[i]).replace(/-$/, '').trim();
    if (!FEATURES.test(name)) {
      continue;
    }
    const next = clean(rows[i + 1]);
    if (STATUS_LINE.test(next)) {
      out.push({ name, status: next });
      i++;
    }
  }
  return out;
}

export function liftRows(dom) {
  return column(dom, 'lifts')
    .map(oneLine)
    .filter(row => row && !FEATURES.test(row.name));
}

export function trailRows(dom) {
  const runs = column(dom, 'trails').map(oneLine).filter(Boolean);
  return runs.concat(features(column(dom, 'lifts')));
}
