import lifts from '../lifts/index.js';

// The Duda /trail-maps page captured 2026-11-13; the first lift hand-flipped to open.
// Replaces the /trail-reports/ fixture: that page is a 404 since the redesign.
lifts('mt-spokane', 'html', {
  "Beginner's Luck, Chair 5": 'open',
  'Parkway Express, Chair 3': 'closed',
  'Illuminator, Chair 2': 'closed',
  'Vista Cruiser, Chair 1': 'closed',
  'Northwood, Chair 6': 'closed',
  'Hidden Treasure, Chair 4': 'closed',
  'Sunkid Conveyor': 'closed',
  'Half Hitch Handle Tow': 'closed'
});
