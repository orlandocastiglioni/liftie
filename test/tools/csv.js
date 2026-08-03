import assert from 'node:assert/strict';
import test from 'node:test';
import parseCsv from '../../lib/tools/csv.js';

test('parses simple rows', () => {
  assert.deepEqual(parseCsv('a,b,c\n1,2,3'), [
    ['a', 'b', 'c'],
    ['1', '2', '3']
  ]);
});

test('handles CRLF line endings', () => {
  assert.deepEqual(parseCsv('a,b\r\nc,d\r\n'), [
    ['a', 'b'],
    ['c', 'd']
  ]);
});

test('keeps quoted fields with embedded commas', () => {
  assert.deepEqual(parseCsv('name,note\r\nSummit,"steep, icy"'), [
    ['name', 'note'],
    ['Summit', 'steep, icy']
  ]);
});

test('unescapes doubled quotes', () => {
  // google-sheet terrain-park names arrive as """HOLLYWOOD"" Terrain Park"
  assert.deepEqual(parseCsv('"""HOLLYWOOD"" Terrain Park",,OPEN'), [['"HOLLYWOOD" Terrain Park', '', 'OPEN']]);
});

test('preserves empty cells and does not emit a trailing blank row', () => {
  assert.deepEqual(parseCsv('a,,c\r\n'), [['a', '', 'c']]);
});

test('keeps newlines inside quoted fields', () => {
  assert.deepEqual(parseCsv('"line1\nline2",x'), [['line1\nline2', 'x']]);
});
