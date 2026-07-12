import assert from 'node:assert/strict';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parser from '../../lib/lifts/parser.js';
import collect from '../../lib/trails/parse.js';

export default async function testTrails(name, expected, opts = {}) {
  const filename = resolve(import.meta.dirname, `../resorts/example/${opts.example ?? name}.html`);
  const { default: descriptor } = await import(`../../lib/resorts/${name}/trails.js`);

  function testHTML(_t, done) {
    const stream = createReadStream(filename);
    stream.on('error', done);
    stream.pipe(
      parser(
        dom => collect(dom, descriptor),
        (err, list) => {
          assert.ifError(err);
          assert.deepEqual(list, expected, `trails should match for ${name}, received: ${JSON.stringify(list)}`);
          done();
        }
      )
    );
  }

  test(`${name} trails`, testHTML);
}
