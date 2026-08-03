/**
 * minimal RFC-4180 CSV parser for resorts that publish their report as a
 * CSV endpoint (typically a "Publish to web" Google Sheet). Returns an
 * array of rows, each row an array of string cells. Handles quoted fields,
 * embedded commas/newlines, doubled quotes, and CRLF or LF line endings.
 *
 * a url descriptor opts in with "csv": true; the resort's parse function
 * then receives the rows array instead of parsed JSON or a DOM.
 */
export default function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  let i = 0;
  const n = text.length;

  const endField = () => {
    row.push(field);
    field = '';
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  while (i < n) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        quoted = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      quoted = true;
      i++;
      continue;
    }
    if (c === ',') {
      endField();
      i++;
      continue;
    }
    if (c === '\r') {
      // swallow CRLF and lone CR as a single line break
      endRow();
      i += text[i + 1] === '\n' ? 2 : 1;
      continue;
    }
    if (c === '\n') {
      endRow();
      i++;
      continue;
    }
    field += c;
    i++;
  }
  // flush trailing field/row unless the text ended exactly on a line break
  if (field !== '' || row.length > 0) {
    endRow();
  }
  return rows;
}
