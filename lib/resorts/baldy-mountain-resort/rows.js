import select from '../../select.js';

/**
 * Baldy's "Grooming Report" is a sequence of <h4> lift-group headers, each
 * followed by a <table> of that lift's runs. There is no discrete lift status
 * and no aggregate counts, so both the lift parser and the trail parser share
 * this reader, which groups run rows under their lift <h4>.
 *
 * Only mechanical-lift groups are kept (Eagle Chair, Sugarlump Quad, Magic
 * Carpet); a "Nordic & Snowshoe Trails" group also appears on the page and is
 * excluded, keeping this an alpine feed.
 *
 * Each run <tr> has 4 <td>: TD1 <img alt=LEVEL>, TD2 = name text, TD3
 * <img alt=STATUS>, TD4 <img alt=GROOMED>. The alt strings are descriptive
 * ("closed runs on Baldy", "Green runs on Baldy Mountain") so the leading
 * keyword must be extracted before the tokens mean anything to coerce/levels.
 */
const LIFT = /chair|quad|carpet|t-?bar|poma|tow|\blift\b|gondola|tram|rope|surface|platter/i;

function deepText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children || []).map(deepText).join('');
}

function level(alt = '') {
  const a = alt.toLowerCase();
  if (/double\s*black/.test(a)) return 'doubleBlack';
  if (a.includes('black')) return 'black';
  if (a.includes('blue')) return 'blue';
  if (a.includes('green')) return 'green';
}

function status(alt = '') {
  if (/^\s*open/i.test(alt)) return 'open';
  if (/closed/i.test(alt)) return 'closed';
}

export default function groups(dom) {
  const out = [];
  let current = null;
  for (const node of select(dom, 'h4, table')) {
    if (node.name === 'h4') {
      const name = deepText(node).trim();
      current = LIFT.test(name) ? { lift: name, runs: [] } : null;
      if (current) {
        out.push(current);
      }
    } else if (current) {
      for (const tr of select(node, 'tr')) {
        const tds = select(tr, 'td');
        const imgs = select(tr, 'img');
        if (tds.length < 3 || imgs.length < 2) {
          continue; // header / non-run row
        }
        const name = deepText(tds[1]).trim();
        if (!name) {
          continue;
        }
        current.runs.push({
          name,
          status: status(imgs[1].attribs.alt),
          level: level(imgs[0].attribs.alt)
        });
      }
    }
  }
  return out.filter(g => g.runs.length);
}
