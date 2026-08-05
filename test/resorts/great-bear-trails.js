import trails from '../trails/index.js';

// fixture: mid-season wayback snapshot from 2025-12-17 (resort open, tubing
// not yet opened, terrain park down for a reset). It exercises every branch of
// the status normaliser: "OPEN FOR THE SEASON" -> open, "opening dec. 19!" ->
// scheduled, "closed for reset" -> closed, "Open <en dash> groomed 12/15" ->
// open. Great Bear never publishes lift names or individual runs, so these
// four aggregate categories are the whole report.
trails('great-bear', [
  {
    name: 'DownHill',
    status: 'open'
  },
  {
    name: 'Tubing',
    status: 'scheduled'
  },
  {
    name: 'Terrain Park',
    status: 'closed',
    level: 'terrainPark'
  },
  {
    name: 'Nature Trails',
    status: 'open'
  }
]);
