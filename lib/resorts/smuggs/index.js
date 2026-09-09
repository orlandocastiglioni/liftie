import decode from './decode.js';

// smuggs.com is WordPress; its theme exposes the lift "facility" posts as
// JSON at /wp-json/custom/v1/lifts - one object per lift with the open flag
// under acf.open_status. Same data the report page renders, without the
// markup (the page's table was what upstream scraped).
export default function parse(data = []) {
  const liftStatus = {};
  for (const { title, acf } of data) {
    const name = title?.rendered && decode(title.rendered).trim();
    if (!name) {
      continue;
    }
    liftStatus[name] = acf?.open_status ? 'open' : 'closed';
  }
  return liftStatus;
}
