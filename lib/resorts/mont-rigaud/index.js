import select from '../../select.js';
import coerce from '../../tools/coerce.js';

// montrigaud.com was rebuilt on Elementor for 26/27 and ski.montrigaud.com/home
// (the old #barre_conditions widget) now redirects to the new homepage, which
// carries no lift list - the parser returned {} from then on. The lifts moved
// to /conditions/, as Elementor loop items tagged `activite-remontee` (the
// same template also renders pistes, alpine-touring routes and bike trails,
// each with its own `activite-*` class, so the class keeps them apart).
//
// Each item's .entete-piste header holds four containers in order: the lift
// letter (h2) + name, the DAY status, the NIGHT status and an icon slot. The
// section heading above them labels the two columns "Jour" and "Soir". A lift
// running only under the lights is still running, so either column saying
// open wins; otherwise the day column is the status. Words are "Ouverte" /
// "Fermée", both known to coerce.
//
// Names carry decorations the resort adds for summer ("Doppelmayr 🚲" for the
// lift that hauls bikes); symbols are dropped so the name stays stable.
// every text node under `node`, however deep (allText reads direct children
// only, and Elementor wraps each word in two or three divs)
function deepText(node) {
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join(' ');
}

function name(node) {
  const title = select(node, 'p.elementor-heading-title')[0];
  return title && clean(deepText(title));
}

function clean(text) {
  return text
    .replace(/[^\p{L}\p{N}\s'’.&-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function parse(dom) {
  const lifts = {};
  for (const header of select(dom, '.activite-remontee .entete-piste')) {
    const [label, day, night] = (header.children ?? []).filter(child => child.type === 'tag');
    const lift = label && name(label);
    if (!lift) {
      continue;
    }
    const statuses = [day, night].filter(Boolean).map(node => coerce(clean(deepText(node))));
    lifts[lift] = statuses.includes('open') ? 'open' : statuses[0];
  }
  return lifts;
}
