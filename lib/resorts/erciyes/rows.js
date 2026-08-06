import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';

/**
 * One plain server-rendered page, /pist-ve-teleferik-bilgisi, carries the whole
 * report: section#banner holds exactly four <table class='table-striped'>, one
 * per access gate (Develi / Tekir / Hisarcık / Hacılar Kapı). The gate name is
 * the single colspan=3 <th> in the thead; every body row has exactly three
 * <td>: category, name, status.
 *
 * Categories: 'Teleferikler' (lifts) | 'Pistler' (numbered runs) |
 * 'Bağlantı Pisti' (connector runs) | 'Kızak Alanı' (sledging areas).
 *
 * Attributes on this page are single quoted (class='table-striped'), which
 * htmlparser2 handles, and the rows carry whitespace text nodes between the
 * <td>s, so cells are selected rather than indexed off `child`.
 */
export default function rows(dom) {
  const list = [];
  for (const table of select(dom, 'table.table-striped')) {
    // findText walks into the th's <span> wrapper
    const gate = findText(select(table, 'thead th')[0])?.trim();
    for (const row of select(table, 'tbody tr')) {
      const cells = select(row, 'td');
      // the header row inside tbody has <th> cells only
      if (cells.length !== 3) {
        continue;
      }
      const category = fold(findText(cells[0]) ?? '');
      const name = findText(cells[1])?.trim();
      if (!category || !name) {
        continue;
      }
      list.push({ gate, category, name, status: status(cells[2]) });
    }
  }
  return list;
}

/**
 * The status cell is `<img src='/assets/img/icon/green.png'>-Açık`. Read the
 * icon basename, not the word: green and red are already in coerce.js, while
 * 'açık' / 'kapalı' are not, and mapping the words means registering four keys
 * rather than two - JS lowercases the dotless I of 'AÇIK' to a plain i, so the
 * same word reaches coerce as both 'açık' and 'açik' depending on the casing
 * the site happens to use. Only green.png and red.png exist (yellow, orange,
 * blue, grey, black and white all 404), so there is no third state.
 *
 * The word is kept as a fallback in case the icons move, folded to ASCII so the
 * dotted/dotless i cannot bite; an unknown token still reaches coerce raw and
 * lands on 'scheduled' rather than being guessed.
 */
const words = {
  acik: 'open',
  kapali: 'closed'
};

function status(cell) {
  const icon = select(cell, 'img')[0]?.attribs?.src?.match(/\/([^/.]+)\.png$/i)?.[1];
  if (icon) {
    return icon;
  }
  const word = fold(allText(cell));
  return words[word] ?? word;
}

// ASCII fold for Turkish, applied before lowercasing: 'İ'.toLowerCase() is two
// code points (i + combining dot) and 'I'.toLowerCase() is a dotless-less i, so
// case folding first would give two different keys for the same word
export function fold(text) {
  return text
    .replace(/[ıİI]/g, 'i')
    .replace(/[şŞ]/g, 's')
    .replace(/[çÇ]/g, 'c')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[öÖ]/g, 'o')
    .replace(/[üÜ]/g, 'u')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}
