import trails from '../trails/index.js';

// same winter POI capture as the lifts test: Nordic Center (15), then the
// gate sectors nested under Access Gates - Private Reserve (5), Heather
// Canyon Gates (11), Super Bowl (1); their duplicate top-level copies and
// the empty TERRAIN_PARKS sector contribute nothing
trails(
  'mthood',
  [
    { name: 'HRM Meadows', status: 'closed', level: 'green' },
    { name: 'Meadows Creek', status: 'closed', level: 'green' },
    { name: 'Sahalie Falls Road', status: 'closed', level: 'green' },
    { name: 'Sprint Loop', status: 'closed', level: 'green' },
    { name: 'Stump Lane', status: 'closed', level: 'green' },
    { name: "Wizard's Way", status: 'closed', level: 'green' },
    { name: 'Upper HRM Lodge Access', status: 'closed', level: 'green' },
    { name: 'Beargrass Loop', status: 'closed', level: 'blue' },
    { name: 'Upper Hanel Loop', status: 'closed', level: 'blue' },
    { name: 'Raven Way', status: 'closed', level: 'blue' },
    { name: 'Lower Hanel Loop', status: 'closed', level: 'blue' },
    { name: 'Lower HRM Lodge Access', status: 'closed', level: 'blue' },
    { name: 'Beargrass Crossover', status: 'closed', level: 'blue' },
    { name: 'Inner Cheeseroll', status: 'closed', level: 'black' },
    { name: 'Outer Cheeseroll', status: 'closed', level: 'black' },
    { name: 'Endor', status: 'closed', level: 'doubleBlack' },
    { name: "God's Wall", status: 'closed', level: 'doubleBlack' },
    { name: 'Elk/Endor', status: 'closed', level: 'doubleBlack' },
    { name: 'Elk/Yoda', status: 'closed', level: 'doubleBlack' },
    { name: 'S&R Cliffs', status: 'closed', level: 'doubleBlack' },
    { name: 'Silver Bowl', status: 'closed', level: 'doubleBlack' },
    { name: 'Gold Bowl', status: 'closed', level: 'doubleBlack' },
    { name: 'Twilight Bowl', status: 'closed', level: 'doubleBlack' },
    { name: 'Pluto', status: 'closed', level: 'doubleBlack' },
    { name: 'Moon Bowl', status: 'closed', level: 'doubleBlack' },
    { name: '1/2 Moon Bowl', status: 'closed', level: 'doubleBlack' },
    { name: 'Absolute Magnitude', status: 'closed', level: 'doubleBlack' },
    { name: "Jack's Woods", status: 'closed', level: 'doubleBlack' },
    { name: 'Heather Lift Line', status: 'closed', level: 'doubleBlack' },
    { name: 'A-Zone', status: 'closed', level: 'doubleBlack' },
    { name: 'Timberline Trail Gate', status: 'closed', level: 'doubleBlack' },
    { name: 'Super Bowl', status: 'closed', level: 'doubleBlack' }
  ],
  { ext: 'json' }
);
