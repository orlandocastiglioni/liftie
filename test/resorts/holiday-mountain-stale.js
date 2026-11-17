import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The January capture read on 2026-11-17: its banners are ten months old, so
// nothing publishes.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('holiday-mountain', 'html', {}, { example: 'holiday-mountain-2026-01' });
trails('holiday-mountain', [], { example: 'holiday-mountain-2026-01' });
