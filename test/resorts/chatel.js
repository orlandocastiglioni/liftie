import lifts from '../lifts/index.js';

// 2025-12-22 snapshot of Châtel's page on the Portes du Soleil network site,
// opening week: 8 sector cards, every row 'Fermée'. Four of those cards are
// not Châtel's - 'Cret-beni' and 'Braitaz' are La Chapelle d'Abondance's own
// two sectors and 'Torgon' is Torgon's, all three published unchanged on their
// own station pages, and 'Liaisons chapelle ab' holds only link routes - so of
// the page's 54 lift rows these 40 are Châtel's: Pré la joux 9, Barbossine 7,
// Super chatel 19, Linga 5.
lifts('chatel', 'html', {
  'Tapis de pré la joux': 'closed',
  'Tsd chaux des rosées': 'closed',
  'Tsd de cornebois': 'closed',
  'Tsd de pré la joux': 'closed',
  'Tsd des rochassons': 'closed',
  'Tsd de pierre longue': 'closed',
  'Tk de covagnys': 'closed',
  'Tk du queyset': 'closed',
  'Tk du rubis': 'closed',
  'Ts de barbossine': 'closed',
  'Ts petit-châtel': 'closed',
  'Tk des contrebandiers': 'closed',
  'Tk du douanier': 'closed',
  'Tk tour de don': 'closed',
  'Tk de chaux longe': 'closed',
  'Tk onnaz': 'closed',
  'Tc super-châtel': 'closed',
  'Tsd morclan': 'closed',
  'Tsd portes du soleil': 'closed',
  'Tsd conche': 'closed',
  'Tk chalet neuf 1': 'closed',
  'Tk chalet neuf 2': 'closed',
  'Tk chermeu': 'closed',
  'Tk de chermillon': 'closed',
  'Tk des bossons': 'closed',
  'Tk des coqs 1': 'closed',
  'Tk des coqs 2': 'closed',
  'Tk des coquelets': 'closed',
  'Tk des debutants': 'closed',
  'Tk des poussinets': 'closed',
  'Tk des poussins': 'closed',
  'Tk du lac': 'closed',
  'Tk le corbeau': 'closed',
  'Tk pre de la vieille': 'closed',
  'Tapis super-châtel': 'closed',
  'Tc du linga': 'closed',
  "Tsd de l'echo alpin": 'closed',
  'Tsd gabelou': 'closed',
  'Tsd les combes': 'closed',
  'Tk du stade': 'closed'
});

// 2025-03-23 snapshot, midwinter with the hill running: same 40 lifts, now
// 38 'Ouverte' and 2 'Fermée'. This one also proves the liaisons are dropped
// by their sub-header and not by their card name - here the six inter-station
// routes sit in a card called 'Liaison inter domaines' rather than the
// 'Liaison portes du soleil' of the December snapshot.
lifts(
  'chatel',
  'html',
  {
    'Tapis de pré la joux': 'open',
    'Tsd chaux des rosées': 'open',
    'Tsd de cornebois': 'open',
    'Tsd de pré la joux': 'open',
    'Tsd des rochassons': 'open',
    'Tsd de pierre longue': 'open',
    'Tk de covagnys': 'open',
    'Tk du queyset': 'open',
    'Tk du rubis': 'open',
    'Ts de barbossine': 'open',
    'Ts petit-châtel': 'open',
    'Tk des contrebandiers': 'open',
    'Tk du douanier': 'open',
    'Tk tour de don': 'open',
    'Tk de chaux longe': 'open',
    'Tk onnaz': 'open',
    'Tc super-châtel': 'open',
    'Tsd morclan': 'open',
    'Tsd portes du soleil': 'open',
    'Tsd conche': 'open',
    'Tk chalet neuf 1': 'open',
    'Tk chalet neuf 2': 'open',
    'Tk chermeu': 'open',
    'Tk de chermillon': 'open',
    'Tk des bossons': 'open',
    'Tk des coqs 1': 'open',
    'Tk des coqs 2': 'open',
    'Tk des coquelets': 'open',
    'Tk des debutants': 'open',
    'Tk des poussinets': 'closed',
    'Tk des poussins': 'open',
    'Tk du lac': 'open',
    'Tk le corbeau': 'closed',
    'Tk pre de la vieille': 'open',
    'Tapis super-châtel': 'open',
    'Tc du linga': 'open',
    "Tsd de l'echo alpin": 'open',
    'Tsd gabelou': 'open',
    'Tsd les combes': 'open',
    'Tk du stade': 'open'
  },
  { example: 'chatel-2025-03' }
);
