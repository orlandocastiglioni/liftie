import { allText } from '../../tools/domutil.js';

const emojiLevels = {
  '🟢': 'green',
  '🟦': 'blue',
  '🔵': 'blue',
  '♦': 'black',
  '♦♦': 'doubleBlack',
  '⛰': 'terrainPark'
};

// #gp-trail-table rows: name cell starts with a difficulty emoji,
// day column class carries trail-open/trail-closed (cell text is a time in season)
export default {
  selector: '#gp-trail-table tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const nameCell = tds.find(c => c.attribs?.class?.includes('trail-col-name'));
    const day = tds.find(c => c.attribs?.class?.includes('trail-col-day'));
    const m = day?.attribs.class.match(/trail-(open|closed)/);
    if (!nameCell || !m) {
      return;
    }
    const text = allText(nameCell).replace(/\s+/g, ' ').trim();
    const parts = text.match(/^(\S*?)\s*([A-Za-z0-9(].*)$/);
    if (!parts) {
      return;
    }
    return {
      name: parts[2].trim(),
      status: m[1],
      level: emojiLevels[parts[1]]
    };
  }
};
