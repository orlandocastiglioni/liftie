import trails from '../trails/index.js';

// fixture: wayback capture of the published conditions sheet from 2022-12-20,
// midwinter and mixed - 25 of 26 nordic trails open, the nordic terrain park
// closed, and all 3 rope-tow (alpine) trails still closed. Rows are in sheet
// order across the section headings, which the parser drops along with the
// 14-row summary block at the top.
//
// Note the apostrophes: the sheet mixes straight (Charlie's Inner Loop,
// Hero's Hill, Joe's Junction) and curly (Charlie’s Outer Loop, Cal’s Climb,
// Wally’s Way) - they are reported exactly as published.
trails('quarry-road-trails', [
  { name: 'Stadium', status: 'open', level: 'green' },
  { name: "Charlie's Inner Loop", status: 'open', level: 'green' },
  { name: 'Charlie’s Outer Loop', status: 'open', level: 'blue' },
  { name: 'Doodlebug', status: 'open', level: 'green' },
  { name: 'Meadowlark', status: 'open', level: 'blue' },
  { name: 'Lower Colby Sprint', status: 'open', level: 'blue' },
  { name: 'Nordic Terrain Park', status: 'closed', level: 'blue' },
  { name: 'Davis', status: 'open', level: 'green' },
  { name: 'Far Meadow Loop', status: 'open', level: 'green' },
  { name: 'Short Circuit', status: 'open', level: 'black' },
  { name: 'North Koons', status: 'open', level: 'blue' },
  { name: 'Lower South Koons', status: 'open', level: 'black' },
  { name: 'Upper South Koons', status: 'open', level: 'black' },
  { name: 'Upper Colby Sprint Loop', status: 'open', level: 'black' },
  { name: "Hero's Hill", status: 'open', level: 'black' },
  { name: 'Cal’s Climb', status: 'open', level: 'black' },
  { name: "Joe's Junction", status: 'open', level: 'black' },
  { name: 'Confluence', status: 'open', level: 'blue' },
  { name: 'East Pine Tree', status: 'open', level: 'blue' },
  { name: 'West Pine Tree', status: 'open', level: 'blue' },
  { name: 'Middle Trail', status: 'open', level: 'blue' },
  { name: 'River Trail', status: 'open', level: 'blue' },
  { name: 'Hawthorn', status: 'open', level: 'blue' },
  { name: 'Roundabout', status: 'open', level: 'blue' },
  { name: 'Wally’s Way', status: 'open', level: 'blue' },
  { name: 'Half Hitch', status: 'open', level: 'green' },
  { name: 'Upper Main Slope', status: 'closed', level: 'blue' },
  { name: 'Lower Main Slope', status: 'closed', level: 'green' },
  { name: 'Terrain Park', status: 'closed', level: 'blue' }
]);
