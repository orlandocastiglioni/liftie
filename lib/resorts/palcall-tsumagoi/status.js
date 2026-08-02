// shared status translation for the condition tables; the raw page carries
// Japanese vocabulary (plus OPEN/CLOSE for the parks) with stray zero-width
// spaces, but an on-page script rewrites it to English after page load and
// FlareSolverr hands us that post-JS DOM, so both vocabularies must map:
// 運行中->Operating, 減速運転->Operation Slowed, 待機調査->Temporarily
// Suspended, 運休->Closed, 整備中->Maintenance, 造成中->Preparation
export default function translate(text = '') {
  const t = text.replace(/[\u200B\s]+/g, '');
  if (/運行中|減速運転|営業中|OPEN|Operating|OperationSlowed/i.test(t)) {
    return 'open';
  }
  if (/待機調査|TemporarilySuspended/i.test(t)) {
    return 'hold';
  }
  if (/運休|運行終了|整備中|造成中|CLOSE|Maintenance|Preparation/i.test(t)) {
    return 'closed';
  }
  return t;
}
