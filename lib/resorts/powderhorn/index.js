import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

const icons = {
  'fa-check-square-o': 'open',
  'fa-hand-stop-o': 'hold',
  'fa-window-close': 'closed',
  'fa-hourglass-start': 'scheduled'
};

// lift blocks: <div class="bg-grey"><h3><span class="fa fa-window-close">...</span>Name</h3>
// the legend maps the icons to OPEN / STANDBY / CLOSED / SCHEDULED
export default {
  selector: '.bg-grey h3',
  parse: h3 => {
    const icon = select(h3.children, 'span')
      .flatMap(s => (s.attribs.class ?? '').split(/\s+/))
      .find(c => c in icons);
    const name = allText(h3).trim();
    if (icon && name) {
      return { name, status: icons[icon] };
    }
  }
};
