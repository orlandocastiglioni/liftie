import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import descriptor from '../../lib/resorts/aomori-spring/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

// all 23 courses of the 2026-02-01 report, in page order: the first twelve come
// from the left-hand Course table and the rest from the right-hand one. Names
// are verbatim, misspellings ('Connecter') included, and the last one is a
// free-text CMS field the resort rewrites every season. No levels - the status
// page publishes none.
trails('aomori-spring', [
  { name: 'Panorama', status: 'open' },
  { name: 'Mainline', status: 'open' },
  { name: 'Sunshine', status: 'open' },
  { name: 'Skyline Connector', status: 'open' },
  { name: 'Family', status: 'open' },
  { name: 'Slender Line', status: 'open' },
  { name: 'Twister Connecter', status: 'open' },
  { name: 'Family Connecter', status: 'open' },
  { name: 'Aspen', status: 'open' },
  { name: 'Aspen Connecter', status: 'open' },
  { name: 'Paradise', status: 'open' },
  { name: 'Upper Wave', status: 'open' },
  { name: 'Lower Wave', status: 'open' },
  { name: 'Twister', status: 'open' },
  { name: 'Diamond', status: 'open' },
  { name: 'Link', status: 'open' },
  { name: 'Corkscrew', status: 'open' },
  { name: 'Piste Off', status: 'open' },
  { name: 'Pipe Dream', status: 'open' },
  { name: 'Skate Away', status: 'open' },
  { name: 'Dream Walker', status: 'open' },
  { name: 'Skyline', status: 'open' },
  { name: 'Half pipe 9:30-14:00.', status: 'closed' }
]);

function parse(html) {
  return new Promise((res, rej) => {
    parseHtml(
      html,
      dom => collect(dom, descriptor),
      (err, list) => (err ? rej(err) : res(list))
    );
  });
}

test('aomori-spring trails carry the board timestamp', async () => {
  // '<strong>Updated:</strong> 2026-02-01, 10:40', JST
  const html = readFileSync(resolve(import.meta.dirname, 'example/aomori-spring.html'), 'utf8');
  assert.equal((await parse(html)).reportedAt, '2026-02-01T01:40:00.000Z');
});

test('aomori-spring collapses whitespace in course names', async () => {
  // the resort has shipped 'Skyline  Connector' with a literal double space
  const list = await parse(
    '<html><body><table><thead><tr><th>Course</th><th>Status</th></tr></thead>' +
      '<tbody><tr><td>Skyline  Connector</td><td>Closed</td></tr></tbody></table></body></html>'
  );
  assert.deepEqual(list, [{ name: 'Skyline Connector', status: 'closed' }]);
});
