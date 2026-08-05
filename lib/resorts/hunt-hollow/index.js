import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { cells, deepText, textLines } from './dom.js';

/**
 * Hunt Hollow publishes lift status in the right-hand column of /The_Mountain
 * as a run of sibling <table>s: a "Lifts | Open" header, one table per lift,
 * then a "Current Conditions" header followed by the condition-code and
 * difficulty legends. Walking the tables in document order and stopping at
 * "Current Conditions" keeps the legend rows ("Packed Powder | PP") from
 * parsing as phantom lifts; the lift count itself can change, so this is a
 * function rather than a fixed selector.
 *
 * The status cells are empty out of season (a bare &nbsp;), which coerces to
 * 'scheduled'. In season they are expected to carry a token or a glyph image,
 * so an <img> in the cell falls back to its alt text / file name.
 */
export default function parse(dom) {
  const status = {};
  for (const table of select(dom, 'div[id$="_TextArea_Large_divCol2"] table')) {
    const text = deepText(table);
    if (/current conditions/i.test(text)) {
      break;
    }
    // section headers ("Lifts | Open", "LEGEND") are the tables carrying an h2
    if (select(table, 'h2').length > 0) {
      continue;
    }
    for (const row of select(table, 'tr')) {
      const [nameCell, statusCell] = cells(row);
      const name = deepText(nameCell);
      if (!name || !statusCell) {
        continue;
      }
      status[name] = liftStatus(statusCell);
    }
  }
  return status;
}

function liftStatus(cell) {
  const raw = statusToken(cell);
  const status = coerce(raw);
  // trail statuses on this page read "OPEN - SC" (status + condition code);
  // if the lifts ever do the same, retry on the part before the dash rather
  // than letting the whole string degrade to 'scheduled' - but only then, so
  // a hyphenated token coerce already knows (wind-hold) keeps its meaning
  if (status === 'scheduled' && raw?.includes('-')) {
    return coerce(raw, 0, '-');
  }
  return status;
}

function statusToken(cell) {
  const [text] = textLines(cell);
  if (text) {
    return text;
  }
  const img = select(cell, 'img')[0];
  if (!img) {
    return;
  }
  return img.attribs.alt?.trim() || img.attribs.src?.match(/([^/]+?)\.\w+$/)?.[1];
}
