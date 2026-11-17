import select from '../../select.js';
import jp from '../../tools/jp-status.js';
import isStale from '../../tools/stale.js';

/**
 * onikoube.com (WordPress, SWELL theme) keeps two hand-edited tables: リフト運行
 * 状況 on /snow/lift/ (lift | status | hours) and ゲレンデ状況 on
 * /snow/ski-slope/ (course | status | note). A status cell is a glyph and a
 * word, from the legend the editors copy from (a hidden "コピペ用" paragraph):
 *
 *   ● 運行 / ● 全面滑走可   running / fully open           -> open
 *   ▲ 一部滑走可            partly open                    -> open
 *   △ 運行見合わせ中         operation suspended for now    -> hold
 *   × 運休 / × 滑走不可      not running / closed           -> closed
 *
 * ● (U+25CF, the filled circle) is not one of the open glyphs jp-status.js
 * knows, so it is read here; the words are a fallback through jp-status.
 *
 * STALE GATE. The tables are not cleared after the season: in November 2026
 * both still carry the last day, stamped 更新日時：2026年3月22日8:00 (with
 * full-width digits on the slope page). The stamp, Japan time, goes through
 * lib/tools/stale.js, which publishes nothing for a report that is provably
 * old and fails open when the stamp is missing.
 */
function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function clean(s) {
  return s.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

export function status(cell) {
  const t = clean(cell);
  if (/^●/.test(t) || /全面滑走可|一部滑走可/.test(t) || /^▲/.test(t)) {
    return 'open';
  }
  if (/^△/.test(t) || /見合わせ/.test(t)) {
    return 'hold';
  }
  if (/滑走不可/.test(t)) {
    return 'closed';
  }
  return jp(t) ?? 'scheduled';
}

export function reportedAt(dom) {
  for (const p of select(dom, 'p')) {
    const m = clean(text(p)).match(/更新日時\s*[:：]\s*(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日\s*(\d{1,2}):(\d{2})/);
    if (m) {
      const [, y, mo, d, h, mi] = m;
      const pad = n => n.padStart(2, '0');
      return new Date(`${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${mi}:00+09:00`);
    }
  }
}

/** rows of the table whose first header cell is `header`, as [name, status cell] */
export function rows(dom, header) {
  if (isStale(reportedAt(dom))) {
    return [];
  }
  const table = select(dom, 'table').find(t => {
    const first = select(t, 'tr')[0];
    return first && clean(text(select(first, 'th, td')[0])) === header;
  });
  return (table ? select(table, 'tr').slice(1) : []).flatMap(tr => {
    const [name, state] = select(tr, 'td').map(td => clean(text(td)));
    return name ? [[name, state ?? '']] : [];
  });
}

export function dated(result, dom) {
  const at = reportedAt(dom);
  if (at && !Number.isNaN(at.getTime())) {
    Object.defineProperty(result, 'reportedAt', { value: at.toISOString() });
  }
  return result;
}
