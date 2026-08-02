import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// run rows share the /mountain-report-cams/ page with the lifts, grouped in
// five pod tables inside <section id="slopes">:
// <tr>
//   <td data-title=""><img src=".../green|blue|black|doubleblack|park.svg"></td>
//   <td data-title="Run Name">Blueberry Patch</td>
//   <td data-title="Status" class="closed"><img src=".../tick|cross.png"></td>
//   <td data-title="Conditions">...</td> ...
// </tr>
//
// GOTCHA: the status cell's class attribute is stuck at "closed" year round
// (verified against a Feb 2026 snapshot with 57/57 runs open) - the real
// status is the icon: tick.png = open, cross.png = closed; 'tick' is not in
// the central status vocabulary, so map the icon here
export default {
  selector: 'section#slopes table tbody tr',
  parse: node => {
    const tds = select(node.children, 'td');
    if (tds.length < 3) {
      return;
    }
    const name = findText(tds[1]);
    if (!name) {
      return;
    }
    const statusIcon = select(tds[2].children, 'img')[0]?.attribs?.src ?? '';
    const levelIcon = select(tds[0].children, 'img')[0]?.attribs?.src ?? '';
    return {
      name,
      status: statusIcon.includes('tick.') ? 'open' : 'closed',
      // svg basename normalizes via lib/trails/parse.js (park -> terrainPark)
      level: levelIcon.match(/(green|blue|doubleblack|black|park)\.svg/)?.[1]
    };
  }
};
