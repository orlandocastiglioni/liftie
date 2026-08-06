import select from '../../select.js';
import { allText, findText } from '../../tools/domutil.js';
import status from './status.js';

/**
 * Levels are static - the Conditions grid carries no difficulty marker, so
 * these come from the ゲレンデガイド at /guide/, which grades each course
 * 初級 / 中級 / 上級 / 超上級. Those words are not in the levels map in
 * lib/trails/parse.js, so the colour word is emitted instead.
 */
const levels = {
  ラビットコース: 'green', // 初級
  メイプルコース: 'green', // 初級
  ロッキーコース: 'blue', // 中級
  カリブーコース: 'blue', // 中級・未圧雪
  マーモットコース: 'blue', // 中級
  バッファローコース: 'blue', // 中級・未圧雪
  キャニオンコース: 'black', // 上級・未圧雪
  デスバレーコース: 'doubleBlack' // 超上級・未圧雪
};

/**
 * The 'Conditions / コース状況' block is an Elementor e-grid of text-editor
 * widgets, one per course, with no .elementor-widget-container wrapper - the
 * name is a bare text child of the widget div and the state is a coloured span:
 *
 *   <div class="... elementor-widget-text-editor" data-id="0a5b987">
 *     ラビットコース:<span style="color:red;font-weight: 400">✕整備中</span></div>
 *
 * Rows are matched on that shape rather than on the container id or the eight
 * row ids, because Elementor regenerates every data-id when a widget is
 * recreated. The shape is specific enough: across the whole ~350 kB homepage
 * exactly eight text-editor widgets are '<label>:' plus a colour-styled span,
 * and those eight are the courses.
 *
 * The inline colour is a deliberate second signal - coerce.js already maps
 * green -> open and red -> closed - so a state word this resort has not used
 * yet still lands on the right side instead of falling through to 'scheduled'.
 */
export default function parse(dom) {
  const list = [];
  for (const widget of select(dom, 'div.elementor-widget-text-editor')) {
    const name = allText(widget)
      .replace(/\s+/g, ' ')
      .trim()
      .match(/^(.+?)\s*[:：]$/)?.[1];
    const span = select(widget.children, 'span')[0];
    const style = span?.attribs?.style ?? '';
    const text = (findText(span) ?? '').trim();
    // a colour-styled span is what marks this widget as a status badge rather
    // than some other 'label:' text on the page
    if (!name || !text || !/color\s*:/.test(style)) {
      continue;
    }
    const colour = style.match(/color\s*:\s*(green|red)\b/i)?.[1];
    list.push({
      name,
      // raw text last, so an unrecognised token in an unrecognised colour is
      // still published (as 'scheduled') rather than silently dropped
      status: status(text) ?? colour ?? text,
      level: levels[name]
    });
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}

// The block dates itself in its own text-editor widget: '2026.03.06 14:51更新',
// JST. Worth carrying: off-season this grid is not emptied, every course simply
// reads ✕整備中, so the timestamp is the only way to tell a live all-closed day
// from August.
export function reportedAt(dom) {
  for (const widget of select(dom, 'div.elementor-widget-text-editor')) {
    const m = allText(widget).match(/(\d{4})\.(\d{1,2})\.(\d{1,2})\s+(\d{1,2}):(\d{2})\s*更新/);
    if (!m) {
      continue;
    }
    const [, y, mo, d, h, min] = m;
    const date = new Date(`${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${min}:00+09:00`);
    if (!Number.isNaN(date.getTime())) {
      return date.toISOString();
    }
  }
}

function pad(n) {
  return String(n).padStart(2, '0');
}
