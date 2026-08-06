import trails from '../trails/index.js';

// Same 2026-03-14 payload, all three terrain sections in feed order: 15 pists,
// then 8 patrolled off-piste routes, then 8 cross-country loops. Reconciles
// with the resort's own counters - pistsOpen '8 / 15' (which counts the
// ungroomed 'Inte förberedd' run as open), offpistOpen '0 / 8', and
// crossCountryOpen '5 / 8' (which counts 'Inte förberedd' as NOT open).
trails(
  'bjorkliden',
  [
    { name: 'Äventyrsspåret', status: 'open', level: 'blue' },
    { name: 'Haren', status: 'open', level: 'green' },
    { name: 'Hemvändaren', status: 'closed', level: 'blue' },
    { name: 'Himlabacken', status: 'open', level: 'blue' },
    { name: 'Karven', status: 'closed', level: 'blue' },
    { name: 'Lilla Björn', status: 'closed', level: 'black' },
    { name: 'Raka Spåret', status: 'closed', level: 'black' },
    { name: 'Rallarsvängen', status: 'open', level: 'doubleBlack' },
    { name: 'Rälsbrottet', status: 'closed', level: 'black' },
    { name: 'Räven', status: 'open', level: 'green' },
    { name: 'Solkurvan', status: 'closed', level: 'black' },
    { name: 'Teknikbacken', status: 'open', level: 'blue' },
    { name: 'Urspårningen', status: 'closed', level: 'black' },
    { name: 'Växeln', status: 'open', level: 'blue' },
    { name: 'Vintergatan', status: 'open', level: 'blue' },
    { name: 'Ängarna', status: 'closed', level: 'black' },
    { name: 'Banvallen', status: 'closed', level: 'black' },
    { name: 'Grytan', status: 'closed', level: 'doubleBlack' },
    { name: 'Grytspåret', status: 'closed', level: 'doubleBlack' },
    { name: 'Isfallet', status: 'closed', level: 'doubleBlack' },
    { name: 'Stora Drivan', status: 'closed', level: 'doubleBlack' },
    { name: 'Svarta Björn', status: 'closed', level: 'doubleBlack' },
    { name: 'Tunneln', status: 'closed', level: 'doubleBlack' },
    { name: 'Hela Golfspåret', status: 'closed' },
    { name: 'Hela Rallarspåret', status: 'open' },
    { name: 'Helslingan - Rallarspåret', status: 'open' },
    { name: 'Korta slingan - Golfspåret', status: 'closed' },
    { name: 'Korta slingan - Rallarspåret', status: 'open' },
    { name: 'Långa slingan - Golfspåret', status: 'closed' },
    { name: 'Mellanslingan - Rallarspåret', status: 'open' },
    { name: 'Raka spåret - Rallarleden', status: 'open' }
  ],
  { ext: 'json' }
);
