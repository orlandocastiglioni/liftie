import lifts from '../lifts/index.js';

// SYNTHETIC in part: the live page of 2026-11-17 (pre-season, every cell .close)
// with five cells hand-flipped to .open - lift D (day), lift F (day and night),
// trail 2 (day) and trail 2A (night) - because no in-season capture exists. The
// .open class name is the theme's own (global-compiled.css: .element-status.open).

lifts('le-relais', 'html', {
  'A - Tapis bout’chou': 'closed',
  'B - Téléski simple': 'closed',
  'C - Tapis magique': 'closed',
  'D - L’Hexago : télésiège sextuple débrayable': 'open',
  'E - Téléski simple': 'closed',
  'F - Le Quattro: télésiège quadruple débrayable': 'open',
  'G - Fil neige': 'closed'
});
