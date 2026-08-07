import rows from './rows.js';

/**
 * The Stubai glacier grades on the Austrian three-tier scale - blau / rot /
 * schwarz, no green - which this site renders in English as the colour class on
 * the difficulty circle: blue / red / black (17 / 11 / 1 in the fixture).
 *
 * normalizeLevel in lib/trails/parse.js knows 'blue' and 'black' but has no
 * 'red' at all, so passing the class straight through would publish the eleven
 * rot pistes - over a third of the mountain - with no level. Shift the top two
 * tiers down one slot instead: red -> black and black -> doubleBlack, which
 * keeps all three published grades distinct and in the resort's own order. Same
 * reading as the other blue/red/black European areas already in the registry
 * (lib/resorts/kaunertaler-gletscher, lib/resorts/rauriser-hochalmbahnen,
 * lib/resorts/krvavec). The site's own word rides along untranslated in `grade`
 * so a consumer can still render the real Austrian scale.
 */
const levels = {
  blue: 'blue',
  red: 'black',
  black: 'doubleBlack'
};

/**
 * 35 trails: the 29 pistes of table.slope plus the 6 unpisted Skirouten of
 * table.skiroute, which the operator publishes on the same board with the same
 * open/closed status but no difficulty column at all. Those keep their level
 * unset and carry the source's own category token as `grade`, so a ski route is
 * never mistaken for a piste whose grade merely failed to parse.
 */
export default function trails(dom) {
  return [
    ...rows(dom, 'slope').map(trail => ({ ...trail, level: levels[trail.grade] })),
    ...rows(dom, 'skiroute').map(trail => ({ ...trail, grade: 'skiroute' }))
  ];
}
