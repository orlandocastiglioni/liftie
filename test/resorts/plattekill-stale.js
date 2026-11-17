import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The January capture read on 2026-11-17: "REPORT AS OF: 1/11/26" is ten
// months old, so nothing publishes - not even "closed".
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('plattekill', 'html', {}, { example: 'plattekill-2026-01' });
trails('plattekill', [], { example: 'plattekill-2026-01' });
