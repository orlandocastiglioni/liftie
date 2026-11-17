import { items } from './report.js';

const LIFT = /^(sesselbahn|skilift|kinderlift|foerderband|gondel|seilbahn|pendelbahn|zauberteppich|ponylift)/;

/** six lifts: the A Waldstafel and B Huenerchoepf chairs, the D Jochalp T-bar, C Guergaletsch, the pony lift and the carpet */
export default function parse(dom) {
  return Object.fromEntries(
    items(dom)
      .filter(i => LIFT.test(i.type))
      .map(i => [i.name, i.status])
  );
}
