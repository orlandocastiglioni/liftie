import lifts from '../lifts/index.js';

// SYNTHETIC: maneige.ski refuses every scripted client (the Pi reaches it
// through flaresolverr), so no REST body could be captured here. This is the
// shape of the vallee-bleue / mont-habitant fixtures (acf counts only) filled
// with the counts Kanasuta's own maneige page showed in the Wayback capture of
// 2025-02-18: day trails 5/11, night 0/4, glades 0/8, parks 1/2, chairs day
// 2/3, night 0/1.

lifts('mont-kanasuta', 'json', {
  'Lifts (day): 2/3 open': 'open',
  'Lifts (night): 0/1 open': 'closed'
});
