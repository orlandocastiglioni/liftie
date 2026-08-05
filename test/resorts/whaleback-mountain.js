import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/whaleback-mountain/index.js';
import lifts from '../lifts/index.js';

lifts('whaleback-mountain', 'html', {
  'Summit Chair': 'closed',
  'Magic Carpet': 'closed',
  'Handle Tow Learning': 'closed',
  'T-Bar': 'closed',
  'Spout Mega Tow': 'closed'
});

// the only capture of the sheet that exists (live and on the Wayback Machine)
// is off-season, so every cell reads X. The sheet's Key block documents the
// rest of the vocabulary - keep it covered until a winter capture replaces the
// example above.
test('whaleback-mountain should map the O/G/R/X key', (_t, done) => {
  const rows = [
    ['', 'Lifts', 'Open', 'Notes'],
    ['', 'Summit Chair', 'O', ''],
    ['', 'Magic Carpet', 'G', ''],
    ['', 'T-Bar', 'R', ''],
    ['', 'Handle Tow Learning', 'X', ''],
    ['', '', '', ''],
    ['', 'Key', '', ''],
    ['O', 'Open', '', ''],
    ['G', 'Groomed', '', ''],
    ['R', 'Race', '', ''],
    ['X', 'Closed', '', '']
  ];
  const html = `<table><tbody>${rows
    .map(row => `<tr><th>x</th>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

  parseHtml(html, parse, (err, status) => {
    assert.ifError(err);
    assert.deepEqual(status, {
      'Summit Chair': 'open',
      'Magic Carpet': 'open',
      'T-Bar': 'closed',
      'Handle Tow Learning': 'closed'
    });
    done();
  });
});
