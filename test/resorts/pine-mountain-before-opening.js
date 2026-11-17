import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// Live capture 2026-11-17 (scripts stripped): the undated page still shows
// last spring's report, every run and lift "open". The day before resort.json's
// opening (2026-12-05) nothing publishes - not "closed", no rows at all.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-12-04T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-12-04T12:00:00Z');
  }
};

lifts('pine-mountain', 'html', {}, { example: 'pine-mountain-2026-11' });
trails('pine-mountain', [], { example: 'pine-mountain-2026-11' });
