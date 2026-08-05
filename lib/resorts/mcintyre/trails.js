import names from './report.js';

// same open-list semantics as the lifts: the Trails block names the trails
// that are open today. No difficulty is published anywhere on the site (the
// trail map is a flat image), so trails carry no level.
export default function parse(dom) {
  return names(dom, 'Trails').map(name => ({ name, status: 'open' }));
}
