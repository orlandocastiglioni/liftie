// report rows (lifts and trails alike) are <h4>NAME - <span>STATUS</span></h4>
// inside <section class="mountain-stats">; lift names carry a '#N' suffix
// (Northern Spirit #1, ...), trail names do not
export default {
  selector: 'section.mountain-stats h4',
  parse: {
    name: {
      child: 0,
      fn: n => /#\d/.test(n) && n.replace(/\s*-\s*$/, '').trim()
    },
    status: 1
  }
};
