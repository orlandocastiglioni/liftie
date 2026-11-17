import lifts from '../lifts/index.js';

// Live page of 2026-11-17, which still carries the season's last board, stamped
// 更新日時:2026年03月29日（日）07:04: three lifts running, two courses, the kids
// park and the AI course (規制中・一部滑走可能, partly open) skiable. The page is
// date-gated (see staleness-safety.js), so the clock is pinned to the next day.
const RealDate = Date;
globalThis.Date = class extends RealDate {
  constructor(...args) {
    super(...(args.length ? args : ['2026-03-30T00:00:00Z']));
  }
  static now() {
    return RealDate.parse('2026-03-30T00:00:00Z');
  }
};

lifts('snow-resort-the-cupid-of-romance', 'html', {
  'パイオニアリフト': 'closed',
  'スカイリフト': 'open',
  'シルクリフト': 'open',
  'エーアイリフト': 'open',
  'ロマンスリフト': 'closed',
  'ファミリーリフト': 'closed'
});
