import select from '../../select.js';

/**
 * campfortune.com/en/conditions/ is an Elementor page whose run list is built
 * from JetEngine dynamic-visibility widgets, so the state is decided on the
 * server and the page carries only the icons that apply:
 *
 *   fa-sun          open for day skiing
 *   fa-moon         open for night skiing
 *   fa-do-not-enter run closed
 *
 * Each run is its own inner section: a difficulty image, an h4 with the run's
 * name, and the state icons. Off season every run shows fa-do-not-enter (and
 * the page says "THANK YOU FOR A GREAT SEASON!"), so there is no stale-open
 * board to guard against. The lifts (2 quads, a triple, a T-bar and two
 * carpets) are named as section headings but carry no state of their own, so
 * the resort publishes trails only.
 *
 * LEVEL is the difficulty image's file name - green.png, blue.png, black.png,
 * double-black.png, park.png - read from src, or from data-lazy-src when the
 * lazy loader has replaced src with a placeholder.
 */
const LEVELS = {
  green: 'green',
  blue: 'blue',
  black: 'black',
  'double-black': 'doubleBlack',
  park: 'terrainPark'
};

function deepText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  if (node.name === 'br') {
    return ' ';
  }
  return (node.children ?? []).map(deepText).join('');
}

function level(section) {
  for (const img of select(section, 'img')) {
    const src = `${img.attribs['data-lazy-src'] ?? ''} ${img.attribs.src ?? ''}`;
    const m = src.match(/\/(green|blue|black|double-black|park)\.png/);
    if (m) {
      return m[1];
    }
  }
}

function status(section) {
  const icons = select(section, 'i').map(i => i.attribs.class ?? '');
  if (icons.some(c => /\bfa-(sun|moon)\b/.test(c))) {
    return 'open';
  }
  if (icons.some(c => /\bfa-do-not-enter\b/.test(c))) {
    return 'closed';
  }
}

export default function trails(dom) {
  return select(dom, 'section.elementor-inner-section').flatMap(section => {
    const heading = select(section, 'h4.elementor-heading-title')[0];
    const grade = level(section);
    const state = status(section);
    // a run row has all three; the counters ("Runs Open") and the legend do not
    if (!heading || !grade || !state) {
      return [];
    }
    const name = deepText(heading).replace(/\s+/g, ' ').trim();
    return name ? [{ name, status: state, level: LEVELS[grade], grade }] : [];
  });
}
