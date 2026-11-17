import lifts from '../lifts/index.js';

// SYNTHETIC in part: the SisControl webreport rendered by the Pi's renderd on
// 2026-11-17 (pre-season, every status icon sis-closed), with three icons
// hand-switched because no in-season render exists: lift A Waldstafel and run
// 4 Gruoba to sis-open, lift D Jochalp to sis-preparation. The icon names are
// the report legend's own.

lifts('tschiertschen-chur', 'html', {
  'A Waldstafel': 'open',
  'D Jochalp': 'scheduled',
  'B Hüenerchöpf': 'closed',
  'Ponylift': 'closed',
  'C Gürgaletsch': 'closed',
  'Zauberteppich': 'closed'
});
