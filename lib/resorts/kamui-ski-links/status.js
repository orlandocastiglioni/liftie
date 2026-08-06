import jp from '../../tools/jp-status.js';

// The 本日の営業内容 board writes its lift column in a mixture of English and
// clock times. OPEN / CLOSED are the only two tokens coerce.js already knows;
// everything below would otherwise degrade to 'scheduled'.
//
// Per-resort decisions jp-status deliberately leaves open:
//
//   a bare time range -> 'open'. Unlike resorts that keep hours in their own
//     column, Kamui puts the day's operating window IN the status cell and that
//     IS the in-season value for every individual lift ('9:00-15:30'); the
//     whole-area スキー場 row reads OPEN alongside it. A lift that is not
//     running says 'stop service' instead, so hours never sit next to a closed
//     marker here (contrast Amihari, where '× 8：30～16：00' is closed).
//   'stop service' -> 'closed'. The site's own English for 運休, observed on
//     第2/第3リフト on 2024-03-04 while the other lifts published hours.
//   '--' -> 'closed'. Pre-season placeholder (2024-12-04, with スキー場 CLOSED).
//   'CLOSE' -> handled by coerce.js already; both spellings occur in the course
//     block.
//   △ / 準備中 / 整備中 / 要確認 / STANDBY never appear on this page, so they
//     are left unmapped rather than guessed at.
export default function status(text = '') {
  const t = String(text).trim();
  if (!t) {
    return t;
  }
  if (/\d{1,2}[:：]\d{2}\s*[-–~〜～]\s*\d{1,2}[:：]\d{2}/.test(t)) {
    return 'open';
  }
  if (/^stop\s*service$/i.test(t) || /^-{2,}$/.test(t)) {
    return 'closed';
  }
  return jp(t) ?? t;
}
