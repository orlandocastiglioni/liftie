// shared status glyph translation for the Japanese condition tables
export default function status(text = '') {
  const t = text.trim();
  if (/^[○◯〇]/.test(t) || /運行中|営業中/.test(t)) {
    return 'open';
  }
  if (/^[△▲]/.test(t) || /要確認/.test(t)) {
    // 要確認 = "check with staff" - conditionally open tree run areas
    return 'hold';
  }
  if (/^[×✕✖-]/.test(t) || /運休|終了/.test(t)) {
    return 'closed';
  }
  return t;
}
