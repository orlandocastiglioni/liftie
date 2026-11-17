import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The January capture read on 2026-11-17: the "Tuesday 1/20/26" announcement
// is ten months old, so nothing publishes.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('kissing-bridge', 'html', {}, { example: 'kissing-bridge-2026-01' });
trails('kissing-bridge', [], { example: 'kissing-bridge-2026-01' });
