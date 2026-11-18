import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { after, before, test } from 'node:test';

let server;
let fetchVia;
let seen; // the request line the mock renderd received

before(async () => {
  server = createServer((req, res) => {
    seen = req.url;
    res.setHeader('Content-Type', 'text/html');
    res.end('<ul><li>Summit Quad</li></ul>');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  process.env.LIFTIE_RENDERD = `http://127.0.0.1:${server.address().port}`;
  ({ default: fetchVia } = await import('../../lib/tools/fetchvia.js'));
});

after(() => server.close());

const url = {
  host: 'https://resort.example',
  pathname: '/status',
  query: { show: 'lifts' },
  via: 'renderd',
  waitSelector: 'li.venue-item'
};

test('renderd: existing descriptors ask for the same URL as before shadow/settle existed', async () => {
  const res = await fetchVia(url);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /Summit Quad/);
  assert.equal(seen, '/render?url=https%3A%2F%2Fresort.example%2Fstatus%3Fshow%3Dlifts&wait=li.venue-item');
});

test('renderd: shadow and settle are appended only when set', async () => {
  await fetchVia({ ...url, maxTimeout: 60000, shadow: true, settle: 3000 });
  assert.equal(
    seen,
    '/render?url=https%3A%2F%2Fresort.example%2Fstatus%3Fshow%3Dlifts&wait=li.venue-item&timeout=60000&shadow=1&settle=3000'
  );
});
