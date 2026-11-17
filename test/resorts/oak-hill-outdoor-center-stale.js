import trails from '../trails/index.js';

// The same capture read on 2026-11-17: the newest grooming record is seven
// months old, so nordic-pulse-fresh publishes nothing until the club grooms.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-11-17T12:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-11-17T12:00:00Z');
  }
};

trails('oak-hill-outdoor-center', []);
