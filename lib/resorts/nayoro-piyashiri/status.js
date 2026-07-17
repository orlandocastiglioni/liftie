// status text translation - the page mixes English and Japanese labels
export default function status(text = '') {
  const t = text.trim();
  if (/運行中|営業中|^OPEN/i.test(t)) {
    return 'open';
  }
  if (/運休|終了|^CLOSE|^STANDBY/i.test(t)) {
    // STANDBY is the site's not-operating marker (used off-season for every
    // course) - reading it as 'hold' made July look like a wind-hold
    return 'closed';
  }
  return t;
}
