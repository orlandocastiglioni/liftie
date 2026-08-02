// shared status glyph translation for the Japanese status tables
export default function status(text = '') {
  const t = text.trim();
  if (/^[○◯〇]$|運行|営業中/.test(t)) {
    return 'open';
  }
  // in winter the status cell of an operating lift holds its hours,
  // e.g. 8：35～19：50 (full-width colon and tilde)
  if (/\d[:：]\d{2}\s*[～〜~-]/.test(t)) {
    return 'open';
  }
  if (/^[×✕✖-]$|運休|営業終了/.test(t)) {
    return 'closed';
  }
  return t;
}
