import select from '../../select.js';

/**
 * Loup Loup publishes no per-lift status anywhere (resort.json sets
 * no.lifts), but its conditions page carries two Kadence/WordPress blocks
 * that together describe the whole hill:
 *
 *   'Status'   - area level open/closed, tables WITHOUT a <thead>
 *   'Grooming' - named runs plus difficulty, tables WITH a <thead>
 *
 * Both live in div.kt-inside-inner-col columns that hold (h4, figure) pairs
 * in child order, so the most recent h4 names the table that follows. The
 * per-block Kadence class hashes churn whenever the page is re-saved, so only
 * the generic classes are used as anchors.
 *
 * The Grooming column carries GROOMING state ('Groomed Overnight? Yes/No',
 * 'Last Groomed 2/23'), not open/closed - feeding that through coerce would
 * report every ungroomed run as closed. Instead each run inherits the status
 * of the area that governs it from the Status block.
 */

const LEVELS = {
  'least difficult': 'green',
  'more difficult': 'blue',
  intermediate: 'blue',
  'most difficult': 'black',
  difficult: 'black'
};

// area-level rows whose value names the status of the whole area; the rest
// ('NON-GROOMED', 'TERRAIN PARK', 'TUBE HILL') are their own sub areas
const GOVERNING = /^(currently|groomed)$/i;

function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

function clean(node) {
  return deepText(node).replace(/\s+/g, ' ').trim();
}

/**
 * the two blocks mark their headings up differently: 'Status' wraps the text
 * in span.kb-adv-text-inner next to an svg icon, 'Grooming' uses bare text
 * with a <br> between area and difficulty - and that break is invisible once
 * the text nodes are joined, so split on the <br> elements themselves
 */
function headingLines(h4) {
  const [inner] = select(h4, 'span.kb-adv-text-inner');
  if (inner) {
    return [clean(inner)];
  }
  const lines = [];
  let line = '';
  for (const node of h4.children ?? []) {
    if (node.type === 'tag' && node.name === 'br') {
      lines.push(line.replace(/\s+/g, ' ').trim());
      line = '';
    } else {
      line += deepText(node);
    }
  }
  lines.push(line.replace(/\s+/g, ' ').trim());
  return lines.filter(Boolean);
}

function cells(figure) {
  return select(figure, 'tbody tr').map(tr => select(tr, 'td').map(clean));
}

function label(text) {
  return text.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());
}

export default function parse(dom) {
  const areas = []; // Status block rows, in page order
  const runs = []; // Grooming block tables, gated below
  const governing = new Map();

  for (const column of select(dom, 'div.kt-inside-inner-col')) {
    let heading;
    for (const node of column.children ?? []) {
      if (node.type !== 'tag') {
        continue;
      }
      if (node.name === 'h4') {
        heading = headingLines(node);
        continue;
      }
      if (node.name !== 'figure' || !/\bwp-block-table\b/.test(node.attribs.class ?? '')) {
        continue;
      }
      // the snowfall tables at the top of the page sit under an h3, so a
      // figure with no h4 ahead of it in the same column is not a report table
      if (!heading) {
        continue;
      }
      const [area, difficulty] = heading;
      if (select(node, 'thead').length) {
        runs.push({ area, level: LEVELS[(difficulty ?? '').toLowerCase()], rows: cells(node) });
        continue;
      }
      for (const [key, value] of cells(node)) {
        // NOTES rows are free prose, and the row set drifts with the season -
        // out of season a row is emptied rather than removed
        if (!key || !value || /^notes$/i.test(key)) {
          continue;
        }
        // 'Open Weekends and Holidays' has to lose its tail or it coerces to
        // 'scheduled'; a single leading word is all coerce ever needs here
        const status = value.match(/^\S+/)[0];
        areas.push({
          name: /^currently$/i.test(key) ? area : `${area} ${label(key)}`,
          status
        });
        if (GOVERNING.test(key) && !governing.has(area)) {
          governing.set(area, status);
        }
      }
    }
  }

  const trails = [...areas];
  for (const { area, level, rows } of runs) {
    // 'South Summit Nordic' in the Grooming block is 'South Summit Nordic
    // Trails' in the Status block
    const key = [...governing.keys()].find(name => name.startsWith(area) || area.startsWith(name));
    for (const [name] of rows) {
      if (!name) {
        continue;
      }
      trails.push({ name, status: governing.get(key), level });
    }
  }
  return trails;
}
