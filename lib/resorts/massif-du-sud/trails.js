import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// Site difficulty enum -> liftie level. normalizeLevel already resolves easy,
// difficult and extreme; very_difficult is unknown to it, so map every token
// explicitly here. difficult and very_difficult both land on black (extreme
// stays the sole doubleBlack tier) - see the resort summary for the rationale.
const LEVELS = {
  easy: 'green',
  difficult: 'black',
  very_difficult: 'black',
  extreme: 'doubleBlack'
};

// Concatenate the Next.js app-router flight chunks (self.__next_f.push([1,"..."]))
// and pull out the balanced "slopeSector":[...] array embedded in them.
function slopeSectors(dom) {
  let buf = '';
  for (const script of select(dom, 'script')) {
    const text = allText(script);
    if (!text.includes('__next_f')) {
      continue;
    }
    const re = /self\.__next_f\.push\(\[1,\s*"((?:[^"\\]|\\.)*)"\]\)/g;
    let m;
    while ((m = re.exec(text))) {
      try {
        buf += JSON.parse(`"${m[1]}"`);
      } catch {
        /* skip unparseable chunk */
      }
    }
  }
  const key = '"slopeSector":';
  const at = buf.indexOf(key);
  if (at === -1) {
    return [];
  }
  let depth = 0;
  let from = -1;
  for (let i = at + key.length; i < buf.length; i++) {
    const c = buf[i];
    if (c === '[') {
      if (depth === 0) {
        from = i;
      }
      depth++;
    } else if (c === ']') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(buf.slice(from, i + 1));
        } catch {
          return [];
        }
      }
    }
  }
  return [];
}

// Each sector carries a slopeList of runs; info.name is the display name,
// info.difficulty the level token, and `open` a JSON boolean. String(open)
// ('true'/'false') is coerced to open/closed by the shared trail collector.
export default function parse(dom) {
  const rows = [];
  for (const sector of slopeSectors(dom)) {
    for (const slope of sector.slopeList ?? []) {
      const info = slope.info ?? {};
      if (!info.name) {
        continue;
      }
      rows.push({
        name: info.name,
        status: String(slope.open),
        level: LEVELS[info.difficulty]
      });
    }
  }
  return rows;
}
