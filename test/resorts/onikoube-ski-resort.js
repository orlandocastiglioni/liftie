import lifts from '../lifts/index.js';

// Live pages of 2026-11-17, which still carry the last report of the 25/26
// season, stamped 更新日時：2026年3月22日8:00. The parser is date-gated, so the
// clock is pinned to the next day; read today, the same pages publish nothing
// (onikoube-ski-resort-stale.js).
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-03-23T00:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-03-23T00:00:00Z');
  }
};

lifts('onikoube-ski-resort', 'html', {
  '第1ペアリフト': 'closed',
  '第2ペアリフト': 'open',
  '第3ペアリフト': 'open',
  '第5ペアリフト': 'open',
  '第6ペアリフト': 'closed',
  '小柴ペアリフト': 'open',
  'テレキャビン': 'open'
});
