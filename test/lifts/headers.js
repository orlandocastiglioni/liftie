import assert from 'node:assert/strict';
import test from 'node:test';
import request from '../../lib/lifts/request.js';
import rest from '../../lib/lifts/rest.js';

/*
 * Some feeds are scoped entirely by request headers (an API token, a tenant id)
 * with no query-param equivalent, so resort.json may carry url.headers.
 * They merge over the defaults; a resort that sets none is unaffected.
 */

function captureFetch(fn) {
  const original = globalThis.fetch;
  globalThis.fetch = (url, init) => {
    fn(url, init);
    return Promise.resolve({
      status: 200,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve('')
    });
  };
  return () => {
    globalThis.fetch = original;
  };
}

test('rest passes resort headers through and keeps the defaults', async () => {
  let init;
  const restore = captureFetch((_url, i) => {
    init = i;
  });
  try {
    await new Promise(resolve => {
      rest(
        {
          host: 'https://example.com',
          pathname: '/api',
          json: true,
          headers: { 'X-Api-Token': 'secret', 'X-Org': '42' }
        },
        () => ({}),
        resolve
      );
    });
  } finally {
    restore();
  }
  assert.equal(init.headers['X-Api-Token'], 'secret');
  assert.equal(init.headers['X-Org'], '42');
  assert.equal(init.headers.Accept, 'application/json');
  assert.ok('User-Agent' in init.headers); // present even when LIFTIE_USER_AGENT is unset
});

test('rest is unchanged when a resort sets no headers', async () => {
  let init;
  const restore = captureFetch((_url, i) => {
    init = i;
  });
  try {
    await new Promise(resolve => {
      rest({ host: 'https://example.com', pathname: '/api', json: true }, () => ({}), resolve);
    });
  } finally {
    restore();
  }
  assert.deepEqual(Object.keys(init.headers).sort(), ['Accept', 'User-Agent']);
});

test('request passes resort headers through and keeps the defaults', async () => {
  let init;
  const restore = captureFetch((_url, i) => {
    init = i;
  });
  try {
    await request({
      host: 'https://example.com',
      pathname: '/trails',
      headers: { 'X-Api-Token': 'secret' }
    });
  } finally {
    restore();
  }
  assert.equal(init.headers['X-Api-Token'], 'secret');
  assert.equal(init.headers.Accept, '*/*');
  assert.ok('User-Agent' in init.headers); // present even when LIFTIE_USER_AGENT is unset
});

test('a resort header may override a default', async () => {
  let init;
  const restore = captureFetch((_url, i) => {
    init = i;
  });
  try {
    await request({ host: 'https://example.com', pathname: '/trails', headers: { Accept: 'application/json' } });
  } finally {
    restore();
  }
  assert.equal(init.headers.Accept, 'application/json');
});
