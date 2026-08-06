import jp from '../../tools/jp-status.js';

// Tangram runs on the Yukiyama platform: every row is
// <div class="line TOKEN"><div>name</div><div class="cond">label</div>…</div>
// where TOKEN is the machine status and .cond is the Japanese label shown to
// users. The enum below is the operator's own, taken from
// https://www.tangram.jp/ski/ski/common/css/yukiyama.css, whose comments gloss
// each group; the legacy CamelCase aliases are still in that stylesheet and are
// accepted here in case they come back.
//
// coerce.js knows OPEN, CLOSED, HOLD, Open and Close, but NOT OPERATING or
// TODAY_CLOSED - the two commonest real lift states - so without this map a
// running lift and a shut lift would both publish as 'scheduled'.
const map = {
  // 運行中 - running
  OPERATING: 'open',
  Open: 'open',
  OPEN: 'open',
  // 減速運転 - running at reduced speed; still rideable
  OPERATION_SLOWED: 'open',
  Slow: 'open',
  // 運行待ち - waiting to start. 'scheduled' rather than 'hold': this is a lift
  // that has not begun its day yet, not one that stopped mid-day. (Off-season
  // Tangram uses TODAY_CLOSED, not STANDBY, so 'scheduled' cannot leak into
  // summer and advertise a closed area as opening soon.)
  STANDBY: 'scheduled',
  Wait: 'scheduled',
  In_preparation: 'scheduled',
  // まもなくオープン - seen on 2022-01-18 for a tree run and a restaurant not yet
  // open for the season, with an empty .cond
  COMING_SOON: 'scheduled',
  // 待機調査中 - halted while conditions are checked; the mid-day interruption
  OPERATION_TEMPORARILY_SUSPENDED: 'hold',
  Stop: 'hold',
  HOLD: 'hold',
  // 運休 / 本日営業終了. SUSPENDED is grouped with these by yukiyama.css and the
  // one field observation agrees on the substance even though its label reads
  // 待機調査中: 第2ペア, 2026-03-08, note 'コースの状況が不安定の為、暫く運休いた
  // します' - suspended for a while, i.e. days, not a wind hold.
  SUSPENDED: 'closed',
  TODAY_CLOSED: 'closed',
  Close: 'closed',
  CLOSED: 'closed'
};

// token is the class on div.line, label is the .cond text; the label is the
// fallback so a new class token still resolves through the Japanese wording
// (運行中 / 営業中 / 運休 / 本日営業終了 are all in jp-status).
export default function status(token = '', label = '') {
  // hasOwn, not `in`: the token is an ASCII CSS class and would otherwise reach
  // Object.prototype ('constructor', 'toString', …)
  const t = String(token).trim();
  if (Object.hasOwn(map, t)) {
    return map[t];
  }
  const l = String(label).trim();
  return jp(l) ?? local(l) ?? t;
}

function local(l) {
  if (/減速運転/.test(l)) {
    return 'open';
  }
  if (/待機調査中/.test(l)) {
    return 'hold';
  }
  if (/運行待ち/.test(l)) {
    return 'scheduled';
  }
  if (/閉鎖中/.test(l)) {
    return 'closed';
  }
  if (/見合わせ中/.test(l)) {
    return 'hold';
  }
}
