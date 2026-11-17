import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The same closing-day report as served on 2026-11-17: older than
// lib/tools/stale.js's window, so nothing publishes (not "closed").
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T15:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T15:00:00Z');
  }
};

lifts('whitecap-mountains-resort', 'html', {});
trails('whitecap-mountains-resort', []);
