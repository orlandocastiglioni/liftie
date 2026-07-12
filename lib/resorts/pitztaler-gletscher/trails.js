import { allText, findText } from '../../tools/domutil.js';

// EU piste colors to US-style levels
const classifications = {
  leicht: 'green',
  mittel: 'blue',
  schwer: 'black'
};

export default {
  selector: '#pistenStatus table tbody tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    const byClass = cls => tds.find(td => td.attribs?.class?.split(/\s+/).includes(cls));
    const name = findText(byClass('workingPeriod'));
    const dot = byClass('status')?.children.find(c => c.name === 'div' && c.attribs?.class?.includes('tableDot'));
    if (!name || !dot) {
      return;
    }
    const classification = allText(byClass('classification') ?? {})
      .trim()
      .toLowerCase();
    return {
      name,
      status: dot.attribs.class.replace('tableDot', '').trim() || 'open',
      level: classifications[classification]
    };
  }
};
