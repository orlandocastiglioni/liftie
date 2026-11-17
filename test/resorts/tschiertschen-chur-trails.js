import trails from '../trails/index.js';

// SYNTHETIC in part: the SisControl webreport rendered by the Pi's renderd on
// 2026-11-17 (pre-season, every status icon sis-closed), with three icons
// hand-switched because no in-season render exists: lift A Waldstafel and run
// 4 Gruoba to sis-open, lift D Jochalp to sis-preparation. The icon names are
// the report legend's own.

trails('tschiertschen-chur', [
  { name: '4 Gruoba', status: 'open', level: 'blue', grade: 'blau' },
  { name: '1a Hüenerchöpf (Easy Way)', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '5 Jochalp', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '6 Früeschluocht', status: 'closed', level: 'black', grade: 'rot' },
  { name: '1b Furgglis (Easy Way)', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '7 Jakobi', status: 'closed', level: 'doubleBlack', grade: 'schwarz' },
  { name: '8 Wurzelhang', status: 'closed', level: 'doubleBlack', grade: 'schwarz' },
  { name: '2a Spinezman', status: 'closed', level: 'black', grade: 'rot' },
  { name: '9 Parkplatz', status: 'closed', level: 'black', grade: 'rot' },
  { name: '2b Clüs', status: 'closed', level: 'black', grade: 'rot' },
  { name: '10 Alpinahang', status: 'closed', level: 'black', grade: 'rot' },
  { name: '3a Skibob', status: 'closed', level: 'black', grade: 'rot' },
  { name: '11 Joch', status: 'closed', level: 'black', grade: 'rot' },
  { name: '3b Torkeli', status: 'closed', level: 'black', grade: 'rot' },
  { name: '12 Freeride-Abfahrt', status: 'closed', grade: 'gelb' }
]);
