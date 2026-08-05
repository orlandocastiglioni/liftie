import lifts from '../lifts/index.js';

// 2026-08-05 capture of /snow-report/. Trollhaugen has no winter snapshot of
// this markup anywhere - the "ski-area-snow-report" plugin landed after the
// last archived winter crawl - so every row reads closed. The vocabulary is
// binary: the plugin's admin is one "Status (Closed/Open)" toggle, no hold
// or scheduled state exists, and both words are already known to coerce.
// Worth re-checking in December that the operators flip the toggles.
//
// 4 chairs + 4 rope tows; p.tubing-access-name (Snow Tubing) is on the same
// page and is deliberately not a lift.
lifts('trollhaugen', 'html', {
  'Chair 1': 'closed',
  'Chair 2': 'closed',
  'Chair 3': 'closed',
  'Chair 4': 'closed',
  'Mickebakken Rope': 'closed',
  'Minibakken Rope': 'closed',
  'Tomtebakken Rope': 'closed',
  'Valhalla Rope': 'closed'
});
