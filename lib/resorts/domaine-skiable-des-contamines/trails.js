import { rows } from './report.js';

/**
 * The runs. The grade is the alt letter of the piste icon - V verte, B bleue,
 * R rouge, N noire - and the list prefixes the name with the colour word
 * ("Rouge LES PLANS"), which is dropped from the name and kept as the grade.
 * liftie has no red, so rouge takes black and noire doubleBlack, the reading
 * the other French resorts use (lib/resorts/avoriaz).
 */
const GRADES = { V: 'verte', B: 'bleue', R: 'rouge', N: 'noire' };
const LEVELS = { verte: 'green', bleue: 'blue', rouge: 'black', noire: 'doubleBlack' };

export default function trails(dom) {
  return rows(dom, 'iconPiste').map(({ name, status, type }) => {
    const grade = GRADES[type?.attribs.alt?.trim()];
    const bare = grade ? name.replace(new RegExp(`^${grade}\\s+`, 'i'), '') : name;
    return { name: bare, status, level: LEVELS[grade], grade };
  });
}
