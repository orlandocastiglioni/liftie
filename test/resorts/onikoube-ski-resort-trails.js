import trails from '../trails/index.js';

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

trails(
  'onikoube-ski-resort',
  [
    { name: '1.フォレストロード', status: 'open' },
    { name: '2.スネークロード', status: 'open' },
    { name: '3.ラビットロード', status: 'open' },
    { name: '4.ロマンスフィールド', status: 'closed' },
    { name: '5.ロディオフィールド', status: 'open' },
    { name: '6.パスチャーフィールド', status: 'open' },
    { name: '7.メロウフィールド', status: 'open' },
    { name: '8.オールディフィールド', status: 'closed' }
  ],
  { example: 'onikoube-ski-resort-trails' }
);
