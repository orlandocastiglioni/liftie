import lifts from '../lifts/index.js';

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

lifts('mont-blanc', 'html', {
  'Tapis Blanc | Mont Blanc': 'closed',
  'Triple Blanc | Mont Blanc': 'closed',
  'Quad Blanc | Mont Blanc': 'closed',
  'Triple Faustin | Mont Faustin': 'closed',
  'Quad Faustin | Mont Faustin': 'open',
  'Tapis Faustin | Mont Faustin': 'closed',
  'Quad Nord | Mont Blanc Nord': 'closed'
});
