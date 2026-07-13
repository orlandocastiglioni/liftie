import { allText, findText } from '../../tools/domutil.js';

const emojiLevels = {
  '🟢': 'green',
  '🟦': 'blue',
  '🔵': 'blue',
  '⬛': 'black',
  '◆': 'black',
  '♦': 'black',
  '♦♦': 'doubleBlack',
  '⬛⬛': 'doubleBlack'
};

// wpsm-comptable TRAIL|STATUS rows: difficulty emoji + <b>name</b>, status text
// (no per-lift table on the page, so lifts stay disabled)
export default {
  selector: 'table.wpsm-comptable tbody tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    if (tds.length < 2) {
      return;
    }
    const emoji = allText(tds[0]).trim();
    const name = findText(tds[0].children.find(c => c.name === 'b'));
    const status = findText(tds[1]);
    if (name && status) {
      return { name: name.trim(), status, level: emojiLevels[emoji] };
    }
  }
};
