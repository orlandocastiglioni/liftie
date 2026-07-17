export default {
  // #tablepress-10 is a LIFT | HOURS schedule, not live status: rows with
  // posted hours are only *planned* to run (the page's own footnote), so
  // they map to scheduled, never open; tbody skips the LIFT/HOURS header
  selector: '#tablepress-10 tbody tr',
  parse: {
    name: 0,
    status: {
      child: 1,
      fn: s => (s === 'CLOSED' ? 'closed' : 'scheduled')
    }
  }
};
