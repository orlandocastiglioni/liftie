import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// 2026-11-17 capture: the page still carries the summer bike-park report
// (areas "Chair Lifts" / "Downhill Trails" / "Meadow Trails"), so nothing is
// published until the winter report replaces it
lifts('tamarack-resort', 'html', {}, { example: 'tamarack-resort-summer' });
trails('tamarack-resort', [], { example: 'tamarack-resort-summer' });
