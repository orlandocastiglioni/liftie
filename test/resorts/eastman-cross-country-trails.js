import trails from '../trails/index.js';

// Nordic Pulse ?embed=true page captured live 2026-10-27, trimmed to the
// ng-state entries (geometry dropped) and in the compact TransferState shape
// the site has served since 2026-09-25 (u/b keys, /data-npw path). The
// Croydon Connector is the one row that publishes hazard:false explicitly;
// it must still read closed, not hold.
trails('eastman-cross-country', [
  { name: "9. John's Glen", status: 'closed', level: 'green' },
  { name: "9. John's Glen Balsam Loops", status: 'closed', level: 'green' },
  { name: "9. John's Glen Hemlock Loop", status: 'closed', level: 'green' },
  { name: '7. Bright Slope', status: 'closed', level: 'green' },
  { name: "9. John's Glen Aspen Loop", status: 'closed', level: 'green' },
  { name: "9. John's Glen Birch Hill Loop", status: 'closed', level: 'green' },
  { name: "9. John's Glen Extension", status: 'closed', level: 'green' },
  { name: '3. Croydon Run', status: 'closed', level: 'black' },
  { name: '1.C Croydon Connector', status: 'closed', level: 'green' },
  { name: '2. Longwood Loop', status: 'closed', level: 'blue' },
  { name: '4. Sunrise Crest', status: 'closed', level: 'blue' },
  { name: '1. Lazy Loop', status: 'closed', level: 'green' },
  { name: '5. Brook Trail Connector', status: 'closed', level: 'blue' },
  { name: "11. Craig's Connector", status: 'closed', level: 'green' },
  { name: '1.B Practice Loop', status: 'closed', level: 'green' },
  { name: '5. Brook Trail', status: 'closed', level: 'blue' },
  { name: '6. Lake Trail', status: 'closed', level: 'blue' },
  { name: '1.A Pond Loop', status: 'closed', level: 'green' },
  { name: '8. Deer Path', status: 'closed', level: 'black' }
]);
