import { findText } from '../../tools/domutil.js';

// lift table columns: type icon | Lift Name | status icon | Message;
// the status icon filename is the state (Closed.svg, Open.svg, ...)
export default {
  selector: 'table tr',
  parse: row => {
    const tds = row.children.filter(c => c.name === 'td');
    if (tds.length !== 4 || findText(tds[1]) === 'Lift Name') {
      return;
    }
    const typeIcon = tds[0].children.find(c => c.name === 'img');
    const statusIcon = tds[2].children.find(c => c.name === 'img');
    const status = statusIcon?.attribs.src.match(/([A-Za-z_]+)\.svg/)?.[1];
    const name = findText(tds[1]);
    // trail rows share the layout but carry a difficulty icon in column 0
    if (!name || !status || /circle|square|diamond|terrain|park/i.test(typeIcon?.attribs.src ?? '')) {
      return;
    }
    return { name, status };
  }
};
