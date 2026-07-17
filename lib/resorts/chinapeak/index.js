export default {
  selector: '.row.chair-bar',
  parse: {
    name: {
      child: 0,
      // the page renders footnotes ("*:") and announcements ("Tubing Hill
      // Not Available This Season:") in the same chair-bar markup - skip them
      fn: s => {
        const name = s.trim().replace(/:\s*$/, '');
        if (name.length < 2 || /not available/i.test(name)) {
          return;
        }
        return name;
      }
    },
    status: 1
  }
};
