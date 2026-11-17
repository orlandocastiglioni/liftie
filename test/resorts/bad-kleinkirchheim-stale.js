import lifts from '../lifts/index.js';
import trails from '../trails/index.js';

// The same 2026-11-17 board read two months later: older than
// lib/tools/stale.js's window, so nothing publishes (not "closed").
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2027-01-20T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2027-01-20T12:00:00Z');
  }
};

lifts('bad-kleinkirchheim', 'html', {});
trails('bad-kleinkirchheim', []);
