import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Lifts and courses share one board: div.con_movement_info holds two
// <table class="tbl_movement_info box_l|box_r">, each row being
// <th>name</th><td>status…</td>.
//
// box_l / box_r are layout columns only and have never been a reliable split -
// in 2022 both tables held lifts, since 2024 box_l is lifts+legend and box_r is
// courses - so rows are classified by their own <th> (see index.js / trails.js)
// and never by which table they sit in. Scoping to .con_movement_info also
// keeps us clear of the unrelated div.box_table inside .con_description.
//
// Off-season the entire div is dropped from the page, so this returns [] and
// both parsers publish nothing rather than throwing.
export default function rows(dom) {
  const list = [];
  for (const tr of select(dom, 'div.con_movement_info table.tbl_movement_info tr')) {
    const cells = select(tr.children, 'th, td');
    const name = findText(cells[0])?.trim();
    // '表示の見方' is the legend ('〇＝運行 Operating…'), not a lift
    if (!name || name.startsWith('表示の見方')) {
      continue;
    }
    const status = cellStatus(cells[1]);
    if (status) {
      list.push({ name, status });
    }
  }
  return list;
}

// Only the first line of the status cell is the status: notes are appended
// after <br> ('〇<br>※上部の急斜面は積雪不足のため…') and would otherwise be
// read as part of it.
function cellStatus(td) {
  const first = td?.children?.find(c => c.type === 'text' && c.data.trim());
  return (first?.data ?? '').trim();
}

// the board dates itself: '2026年2月7日9：50更新' (full-width colon; one 2024
// snapshot doubled the 更新 suffix, hence no anchor at the end). JST.
export function reportedAt(dom) {
  const p = select(dom, 'div.con_movement_info p.txt_update')[0];
  const m = findText(p)?.match(/(\d{4})年(\d{1,2})月(\d{1,2})日\s*(\d{1,2})[:：](\d{2})/);
  if (!m) {
    return;
  }
  const [, y, mo, d, h, min] = m;
  const iso = `${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${min}:00+09:00`;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function pad(n) {
  return String(n).padStart(2, '0');
}
