import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The January capture read on 2026-11-17: its 01.21.2026 stamp is ten months
// old, so nothing publishes - not even "closed".
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('oak-mountain', 'html', {}, { example: 'oak-mountain-2026-01' });
trails('oak-mountain', [], { example: 'oak-mountain-2026-01' });
