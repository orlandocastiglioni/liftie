import trails from '../trails/index.js';

// SYNTHETIC in part: the live GetTrail embed of 2026-11-17 07:14 (pre-season,
// every icon Fermé) with three icons hand-relabelled, because no in-season
// capture of the embed exists: the Quad Faustin services icon to "Ouvert", the
// 23 - Panda ski icon to "Ouvert" and the 22 - Suisse ski icon to
// "Attention !" (open, with the hazard flag). The Livewire wire:snapshot
// attributes, which the parser never reads, were stripped to shrink the file.
// The board is date-gated, so the clock is pinned to the capture day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

trails('mont-blanc', [
  { name: '1 - Yodel', status: 'closed', level: 'green' },
  { name: '12 - Cigale', status: 'closed', level: 'green' },
  { name: '44 - Rodéo', status: 'closed', level: 'green' },
  { name: '42 - Grand-Maman', status: 'closed', level: 'green' },
  { name: '6 - Robert', status: 'closed', level: 'blue' },
  { name: '2 - Boulevard', status: 'closed', level: 'blue' },
  { name: '48 - La promenade', status: 'closed', level: 'blue' },
  { name: '9 - Slalom Géant', status: 'closed', level: 'blue' },
  { name: '10 - Géant Spécial', status: 'closed', level: 'blue' },
  { name: '11 - Chemin Phillip', status: 'closed', level: 'blue' },
  { name: '43 - Forêt de Mambo', status: 'closed', level: 'blue' },
  { name: '4 - Couloir', status: 'closed', level: 'black' },
  { name: '45 - Nitro', status: 'closed' },
  { name: '5 - Moustache', status: 'closed', level: 'black' },
  { name: '7 - Mambo', status: 'closed', level: 'black' },
  { name: '8 - Dufour', status: 'closed', level: 'black' },
  { name: '13 - Éléphant', status: 'closed', level: 'black' },
  { name: '38 - Exhibition', status: 'closed', level: 'black' },
  { name: '39 - Forêt Magique', status: 'closed', level: 'black' },
  { name: '3 - Max', status: 'closed', level: 'doubleBlack' },
  { name: "49 - L'Extrême", status: 'closed', level: 'doubleBlack' },
  { name: '7 - MBPark Mambo', status: 'closed', level: 'terrainPark' },
  { name: '23 - Panda', status: 'open', level: 'green' },
  { name: '22 - Suisse', status: 'open', level: 'green', hazard: true },
  { name: "47 - L'Écureuil", status: 'closed', level: 'green' },
  { name: '24 - Marmotte', status: 'closed', level: 'green' },
  { name: '46 - Forêt de Rouski', status: 'closed', level: 'blue' },
  { name: '50 - Le Laboratoire', status: 'closed', level: 'blue' },
  { name: '14 - Raton Laveur', status: 'closed', level: 'blue' },
  { name: '20 - Lynx', status: 'closed', level: 'blue' },
  { name: '16 - Cougar', status: 'closed', level: 'black' },
  { name: '18 - Renard', status: 'closed', level: 'black' },
  { name: '19 - Loup', status: 'closed', level: 'black' },
  { name: '36 - Panthère', status: 'closed', level: 'black' },
  { name: '15 - Sous-bois', status: 'closed', level: 'doubleBlack' },
  { name: '17 - Tigre', status: 'closed', level: 'doubleBlack' },
  { name: '21 - MBPark', status: 'closed', level: 'terrainPark' },
  { name: '41 - Chemin Nord', status: 'closed', level: 'green' },
  { name: '30 - Château', status: 'closed', level: 'blue' },
  { name: '25 - Jonction', status: 'closed', level: 'blue' },
  { name: '31 - Bordeaux', status: 'closed', level: 'blue' },
  { name: '26 - Accès Nord', status: 'closed', level: 'black' },
  { name: '28 - Sauvignon', status: 'closed', level: 'black' },
  { name: '27 - Chardonnay', status: 'closed', level: 'black' },
  { name: '29 - Guy McCann', status: 'closed', level: 'black' },
  { name: '32 - Chablis', status: 'closed', level: 'black' },
  { name: '33 - Beaujolais', status: 'closed', level: 'black' },
  { name: '34 - Chute', status: 'closed', level: 'black' },
  { name: '37 - Chianti', status: 'closed', level: 'doubleBlack' },
  { name: '35 - Panoramique', status: 'closed', level: 'black' },
  { name: '40 - Tire Bouchon', status: 'closed', level: 'doubleBlack' }
]);
