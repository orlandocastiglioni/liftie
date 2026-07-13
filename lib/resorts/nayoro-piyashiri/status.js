// status text translation - the page mixes English and Japanese labels
export default function status(text = '') {
  const t = text.trim();
  if (/運行中|営業中|^OPEN/i.test(t)) {
    return 'open';
  }
  if (/運休|終了|^CLOSE/i.test(t)) {
    return 'closed';
  }
  return t; // STANDBY etc - coerce maps standby to hold
}
