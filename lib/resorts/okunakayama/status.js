// shared status glyph translation for the Japanese status tables
export default function status(text = '') {
  const t = text.trim();
  if (/^[○◯〇]$|運行|営業中/.test(t)) {
    return 'open';
  }
  if (/^[×✕✖-]$|運休|営業終了/.test(t)) {
    return 'closed';
  }
  return t;
}
