// trails share the lift report page - same <h4>NAME - <span>STATUS</span></h4>
// idiom; lift rows are excluded by their '#N' suffix and non-report h4s by the
// missing trailing dash separator; the page publishes no per-trail difficulty
// (status vocabulary: Open, Closed, Groomed - all coerced downstream)
export default {
  selector: 'section.mountain-stats h4',
  parse: {
    name: {
      child: 0,
      fn: n => !/#\d/.test(n) && /-\s*$/.test(n) && n.replace(/\s*-\s*$/, '').trim()
    },
    status: 1
  }
};
