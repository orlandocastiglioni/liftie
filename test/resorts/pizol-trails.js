import trails from '../trails/index.js';

// Live infosnow report for area 47, 2026-11-17 17:45 (pre-season): every lift
// closed (state 3); two runs carry state 0, "keine Meldung", which reads
// scheduled - nothing filed, not a closed claim.

trails('pizol', [
  { name: '1 Prodboden', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '1b Kinderhang', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '2 See-Egg', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '3 Täli', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '4 Verbindungspiste', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '5 SAC-Piste', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '6 Gaffia - Furt', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '6b Kappeler', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '7 Übungslift Furt', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '8 Suntigweid', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '8b Obersäss', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '9 Waldweg', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '9b Mittelsäss', status: 'closed', level: 'blue', grade: 'blau' },
  { name: '10 Twärchamm-Piste', status: 'scheduled', level: 'blue', grade: 'blau' },
  { name: '11 Schwamm', status: 'closed', level: 'black', grade: 'rot' },
  { name: '11b Trainingspiste Schwamm', status: 'closed', level: 'black', grade: 'rot' },
  { name: '12 Zanuz', status: 'closed', level: 'black', grade: 'rot' },
  { name: '13 Tritt', status: 'closed', level: 'black', grade: 'rot' },
  { name: '14 Chli Täli', status: 'closed', level: 'black', grade: 'rot' },
  { name: '15 Valeis', status: 'scheduled', level: 'black', grade: 'rot' },
  { name: '16 Wissi Stei', status: 'closed', level: 'black', grade: 'rot' },
  { name: '17 Adler Piste', status: 'closed', level: 'black', grade: 'rot' },
  { name: '17b untere Adler Piste', status: 'closed', level: 'black', grade: 'rot' },
  { name: '18 Dreieck', status: 'closed', level: 'black', grade: 'rot' },
  { name: '18b Schneise', status: 'closed', level: 'black', grade: 'rot' },
  { name: '19 Soldanella', status: 'closed', level: 'black', grade: 'rot' },
  { name: '20 FIS Piste', status: 'closed', level: 'doubleBlack', grade: 'schwarz' },
  { name: '21 Arvenegg', status: 'closed', level: 'doubleBlack', grade: 'schwarz' },
  { name: '22 Gartinis', status: 'closed', level: 'doubleBlack', grade: 'schwarz' },
  { name: '23 Talabfahrt', status: 'closed', level: 'doubleBlack', grade: 'schwarz' },
  { name: '24 Schwiffiggler', status: 'closed', level: 'doubleBlack', grade: 'schwarz' },
  { name: '25 Alpina Couloir', status: 'closed', level: 'doubleBlack', grade: 'schwarz' },
  { name: '31 Abfahrt Jona', status: 'closed', grade: 'gelb' },
  { name: '32 Abfahrt Zanuz', status: 'closed', grade: 'gelb' },
  { name: '34 Couloir', status: 'closed', grade: 'gelb' },
  { name: '36 Abfahrt Grosses Täli', status: 'closed', grade: 'gelb' },
  { name: '37 Abfahrt Wangs', status: 'closed', grade: 'gelb' },
  { name: '38 Schwarzwald', status: 'closed', grade: 'gelb' }
]);
