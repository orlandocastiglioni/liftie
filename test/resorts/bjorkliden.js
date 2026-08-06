import lifts from '../lifts/index.js';

// admin-ajax payload archived from the status page on 2026-03-14, midwinter:
// liftsOpen '3 / 5'. Grytliften and Kåtaliften are 'Stängt' with a second
// 'Väderförhållanden' badge, which reports as a weather hold rather than a
// plain closure.
lifts('bjorkliden', 'json', {
  'Grytliften': 'hold',
  'Kåppasliften': 'open',
  'Kåtaliften': 'hold',
  'Lappbergsliften': 'open',
  'Rakkasliften': 'open'
});

// The live August payload, all closed. Covers the two things the winter
// capture does not: the feed returns SEVEN rows for five lifts (Lappbergsliften
// and Rakkasliften twice each) which dedupe by name, and the roster itself is
// edited between seasons - Kitteldalsliften here where March had Kåtaliften.
lifts(
  'bjorkliden',
  'json',
  {
    'Grytliften': 'closed',
    'Kåppasliften': 'closed',
    'Kitteldalsliften': 'closed',
    'Lappbergsliften': 'closed',
    'Rakkasliften': 'closed'
  },
  { example: 'bjorkliden-summer' }
);
