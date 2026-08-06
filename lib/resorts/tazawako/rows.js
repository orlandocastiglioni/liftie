import select from '../../select.js';

// The homepage carries two div.box01 panels and toggles them with an inline
// display style - off-season the news/weather one is shown and the status one is
// hidden, in winter the other way round. Both are always in the HTML and the
// lift/course rows only ever exist in the status panel, so the inline styles are
// ignored and the rows are simply selected.
//
// Lifts sit in the unique .box01_c block, one row per .box01_c01/.box01_c02
// (the classes only alternate for zebra striping), each holding three divs:
//   .box01_c_l name   .box01_c_c glyph   .box01_c_r hours or a Japanese note
export function lifts(dom) {
  return select(dom, '.box01_c01, .box01_c02').map(row => {
    const cells = row.children.filter(c => c.name === 'div');
    return {
      name: text(cells[0]).trim(),
      glyph: text(cells[1]).trim(),
      note: text(cells[2]).trim()
    };
  });
}

// Courses sit in the ゲレンデ整備状況 section as two side-by-side columns of nine,
// .box01_inner02_box01_contents then .box01_inner02_box02_contents, each row
// holding a name div and a 整備状況 div.
export function courses(dom) {
  return select(dom, '.box01_inner02_box01_contents, .box01_inner02_box02_contents').map(row => {
    const cells = row.children.filter(c => c.name === 'div');
    return { name: text(cells[0]).trim(), status: text(cells[1]).trim() };
  });
}

// The panel dates itself in .box01_text, with the month/day wrapped in a span:
// '2026 <span class="ren25p">4/1</span> (水)　12:00更新'. Worth publishing because
// the data never blanks - off-season the panel still holds April's final values.
export function reportedAt(dom) {
  const m = text(select(dom, '.box01_text')[0]).match(/(\d{4})\s*(\d{1,2})\/(\d{1,2}).*?(\d{1,2})[:：](\d{2})\s*更新/);
  if (!m) {
    return;
  }
  const [, y, mo, d, h, min] = m;
  const date = new Date(`${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${min}:00+09:00`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

// the names and the timestamp are split across nested spans, so the whole
// subtree has to be flattened rather than reading the first text node
function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

function pad(n) {
  return String(n).padStart(2, '0');
}
