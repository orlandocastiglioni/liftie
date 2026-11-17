import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * kijimadaira-ski.com/gelande/ (the former Kijimadaira ski area, renamed under
 * a naming-rights deal; NOT kijimadaira.info, which is now a parked spam
 * domain) server-renders two .b-slope__item blocks: リフト運行情報 (lifts) and
 * ゲレンデ状況 (courses). Every facility is a span whose class is its state,
 * per the block's own legend (ul.b-slope__item__listIco):
 *
 *   cirle   運行中 / 滑走可能                         running / open
 *   tago    天候回復待ち・点検中 / 規制中・一部滑走可能   waiting on weather or an
 *           inspection (a lift on hold) / restricted, partly open (a course
 *           that can be skied)
 *   icox    運休中 / 滑走不可                          not running / closed
 *
 * STALE GATE. Both headings carry 更新日時:2026年03月29日（日）07:04 and the
 * board is not cleared after the season (November 2026 still shows 29 March,
 * with lifts running), so the stamp, Japan time, goes through stale.js.
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

export function clean(s) {
  return s.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

export function reportedAt(dom) {
  const m = clean(text(select(dom, '.b-slope__item__ttl small')[0])).match(
    /(\d{4})年(\d{1,2})月(\d{1,2})日.*?(\d{1,2}):(\d{2})/
  );
  if (!m) {
    return;
  }
  const [, y, mo, d, h, mi] = m;
  const pad = n => n.padStart(2, '0');
  return new Date(`${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${mi}:00+09:00`);
}

/** the spans of the block whose title starts with `title`, as [name, class] */
export function items(dom, title) {
  if (isStale(reportedAt(dom))) {
    return [];
  }
  const block = select(dom, '.b-slope__item').find(b =>
    clean(text(select(b, '.b-slope__item__ttl')[0])).startsWith(title)
  );
  return (block ? select(block, '.b-slope__item__list span') : []).flatMap(span => {
    const name = clean(text(span));
    return name ? [[name, span.attribs.class ?? '']] : [];
  });
}

export function dated(result, dom) {
  const at = reportedAt(dom);
  if (at && !Number.isNaN(at.getTime())) {
    Object.defineProperty(result, 'reportedAt', { value: at.toISOString() });
  }
  return result;
}
