import select from '../../select.js';
import suppressed, { REASONS } from '../../tools/suppressed.js';
import { normalizeLevel } from '../../trails/parse.js';

// Lost Valley hand-maintains its report as three Divi text modules ("Beginner
// Trails Open" / "INTERMEDIATE TRAILS OPEN" / "ADVANCED TERRAIN & TERRAIN
// PARKS"), each a bold heading followed by one bold trail name per <br>.
// Rather than depend on the Divi module indexes (et_pb_text_3/_4/_5) we look
// at every text module and keep the ones whose FIRST bold run reads like one
// of those headings; the heading also supplies the level.
const LEVEL = /\b(beginner|easiest|easy|novice|intermediate|advanced|expert)\b/i;
const HEADING = /trails?\s+open|terrain/i;

// the page lists only what is OPEN, and when everything is open the resort
// collapses each column to a single "All Trails" line (the advanced column
// adds "All Glades Except <names>" / "All Glades Closed"). Those are not
// trails, and there is no inventory anywhere on the site to expand them
// into names, so they are dropped - the report degenerates to zero rows
// exactly when the mountain is 100% open.
const NOT_A_TRAIL = /^all\s+(trails|glades)|trails?\s+open$|^advanced terrain|^terrain parks?$/i;

function textOf(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(textOf).join('');
}

// \s also covers the &nbsp; the editor sprinkles around the names
function clean(node) {
  return textOf(node).replace(/\s+/g, ' ').trim();
}

// one text line per <br> or block element - the 2026/27 cards list a column's
// open trails as lines inside a single div
function lines(node, out = ['']) {
  for (const c of node.children ?? []) {
    if (c.type === 'text') {
      out[out.length - 1] += c.data;
    } else if (c.name === 'br' || /^(div|p|li)$/.test(c.name)) {
      out.push('');
      lines(c, out);
      out.push('');
    } else {
      lines(c, out);
    }
  }
  return out;
}

const NONE = /^none\s+open$/i;

// The 2026/27 layout (live since 2026-11): one card per column,
//   <div><p><img></p><p>Beginner Terrain</p><div>None Open</div></div>
// and the park card adds a sub-heading:
//   <p>The Playground</p><p>Terrain Parks</p><div>...</div>
// No bold anywhere, so the card's <p> texts are the heading and its <div>
// holds the open list. "None Open" is the empty list, not a trail. Off-season
// every column reads "None Open"; the one-name-per-line reading of an open
// column is inferred from the line-height:2 list styling, so recheck on
// opening day.
function cards(dom) {
  const rows = [];
  // how many terrain cards there are, and how many of them read "None Open"
  rows.cards = 0;
  rows.noneOpen = 0;
  for (const card of select(dom, '.et_pb_text_inner > div')) {
    const kids = (card.children ?? []).filter(c => c.type === 'tag');
    const heading = kids
      .filter(c => c.name === 'p')
      .map(clean)
      .join(' ');
    const list = kids.filter(c => c.name === 'div');
    const parks = /playground|terrain park/i.test(heading);
    const level = parks ? 'terrainPark' : /terrain|trails?/i.test(heading) && normalizeLevel(heading.match(LEVEL)?.[1]);
    if (!level || !list.length) {
      continue;
    }
    rows.cards++;
    const texts = list
      .flatMap(div => lines(div))
      .map(l => l.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
    if (texts.length && texts.every(l => NONE.test(l))) {
      rows.noneOpen++;
    }
    for (const div of list) {
      for (const line of lines(div)) {
        const name = line.replace(/\s+/g, ' ').trim();
        if (!name || NONE.test(name) || NOT_A_TRAIL.test(name)) {
          continue;
        }
        rows.push({ name, status: 'open', level });
      }
    }
  }
  return rows;
}

export default function parse(dom) {
  const found = cards(dom);
  const rows = [...found];
  for (const module of select(dom, '.et_pb_text_inner')) {
    const bold = select(module, 'strong, b');
    const heading = bold.length ? clean(bold[0]) : '';
    const level = HEADING.test(heading) && normalizeLevel(heading.match(LEVEL)?.[1]);
    if (!level) {
      continue;
    }
    // the terrain-park column mixes parks in with the black trails and
    // sometimes appends a sentence ("Bear Parks is Open")
    const parks = /terrain park/i.test(heading);
    for (const el of bold.slice(1)) {
      const name = clean(el).replace(/\s+is\s+open\.?$/i, '');
      if (!name || NOT_A_TRAIL.test(name)) {
        continue;
      }
      rows.push({
        name,
        // no per-trail token is published - the list IS the open list
        status: 'open',
        level: parks && /\bparks?\b/i.test(name) ? 'terrainPark' : level
      });
    }
  }
  // Every column of the 2026/27 layout reading "None Open", and nothing read
  // anywhere else, is the page saying nothing is open: an empty board by
  // design, not a parser that read nothing (lib/tools/suppressed.js).
  if (!rows.length && found.cards && found.noneOpen === found.cards) {
    return suppressed(rows, REASONS.noneOpen);
  }
  return rows;
}
