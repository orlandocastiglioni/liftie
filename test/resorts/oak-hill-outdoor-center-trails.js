import trails from '../trails/index.js';

// Nordic Pulse ?embed=true page captured live 2026-11-17, trimmed to the trail
// feed and the area record (geometry dropped). Read the day after the area's
// last grooming (2026-04-02): 39 trails, all closed.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-04-03T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-04-03T12:00:00Z');
  }
};

trails('oak-hill-outdoor-center', [
  {
    'name': '5k Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Printing Press Connector',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Ropes Course Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Garipay Green Loop',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Garipay Blue Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Top of the Hill Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Back Loop',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Dam Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Printing Press Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Rollercoaster',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'The Sidehill',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Reservoir Loop',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Outback Loop',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Reservoir Road Connector',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Fullington Farm Connector',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': 'Ray School Connector',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Girl Brook Connector',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'DOC House Loop',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Golf Course Lower Loop',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Golf Course Upper Loop',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Campground',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Fullington Farm Loop',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Kendal Field',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Daycare Loop',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Crosswalk: Garipay - Golf Course',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Full Garipay',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Kendal Field Looper',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Upper Oak Hill Loop',
    'status': 'closed',
    'level': 'black'
  },
  {
    'name': '3.3k Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': '2.5k Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Golf Course / Garipay Connector',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'The High Road',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Early Season Loop',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': '2.5km Cutoff',
    'status': 'closed',
    'level': 'green'
  },
  {
    'name': 'Sprint Loop A',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Sprint Loop B',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Silver Fox North',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Silver Fox South',
    'status': 'closed',
    'level': 'blue'
  },
  {
    'name': 'Golf Course Full Loop',
    'status': 'closed',
    'level': 'green'
  }
]);
