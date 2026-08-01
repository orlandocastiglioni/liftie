import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { after, before, test } from 'node:test';

let server;
let fetchVia;
let unwrapJson;
let solution; // what the mock flaresolverr answers with

before(async () => {
  server = createServer((req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const { cmd, url } = JSON.parse(body);
      assert.equal(cmd, 'request.get');
      assert.ok(url.startsWith('https://'));
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(solution));
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  process.env.LIFTIE_FLARESOLVERR = `http://127.0.0.1:${server.address().port}/v1`;
  ({ default: fetchVia, unwrapJson } = await import('../../lib/tools/fetchvia.js'));
});

after(() => server.close());

const url = {
  host: 'https://resort.example',
  pathname: '/snow-report',
  via: 'flaresolverr'
};

test('flaresolverr proxy returns rendered html', async () => {
  solution = {
    status: 'ok',
    solution: { status: 200, response: '<ul><li class="lift">Summit Quad</li></ul>' }
  };
  const res = await fetchVia(url);
  assert.equal(res.status, 200);
  assert.match(await res.text(), /Summit Quad/);
});

test('flaresolverr proxy unwraps chrome json viewer pages', async () => {
  solution = {
    status: 'ok',
    solution: {
      status: 200,
      response:
        '<html><head></head><body>' +
        '<pre style="word-wrap: break-word;">{"Lifts":[{"Name":"Peak Triple &amp; Co","Open":true}]}</pre>' +
        '</body></html>'
    }
  };
  const res = await fetchVia(url);
  const data = await res.json();
  assert.deepEqual(data, { Lifts: [{ Name: 'Peak Triple & Co', Open: true }] });
});

test('flaresolverr proxy passes raw json bodies through', async () => {
  solution = {
    status: 'ok',
    solution: { status: 200, response: ' {"open": 3} ' }
  };
  const res = await fetchVia(url);
  assert.deepEqual(await res.json(), { open: 3 });
});

test('flaresolverr failure maps to a 502 response', async () => {
  solution = { status: 'error', message: 'challenge failed' };
  const res = await fetchVia(url);
  assert.equal(res.status, 502);
});

test('unknown proxy is rejected', async () => {
  await assert.rejects(fetchVia({ ...url, via: 'nope' }), /unknown fetch proxy/);
});

test('request bodies are rejected for flaresolverr', async () => {
  await assert.rejects(fetchVia({ ...url, body: { a: 1 } }), /does not support request bodies/);
});

test('unwrapJson rejects non-json pages', () => {
  assert.throws(() => unwrapJson('<html><body>404</body></html>'), /neither JSON/);
});
