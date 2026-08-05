import names from './report.js';

// the tubing conveyor turns up inside the Lifts list some seasons; the
// report has a separate Tubing block for it, so keep it out of the lifts
const NOT_A_LIFT = /^snow tubing$/i;

/**
 * McIntyre publishes the lifts that are running today, one name per line,
 * and never mentions the ones that are not - so every name that survives the
 * report guards is open. Nothing is emitted off-season, which is honest:
 * the resort publishes no per-lift status then.
 */
export default function parse(dom) {
  const lifts = {};
  for (const name of names(dom, 'Lifts')) {
    if (!NOT_A_LIFT.test(name)) {
      lifts[name] = 'open';
    }
  }
  return lifts;
}
