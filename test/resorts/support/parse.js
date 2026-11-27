import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import makeParse from '../../../lib/lifts/parse.js';
import { parseHtml } from '../../../lib/lifts/parser.js';
import collect from '../../../lib/trails/parse.js';

/**
 * Helpers for tests that need what a parser returned - not just its rows but
 * the non-enumerable metadata it hangs off them (reportedAt, the
 * lib/tools/suppressed.js marker), which deepEqual on the rows cannot see.
 * Lives outside test/*\/*.js so `node --test` does not run it as a test file.
 */
const example = name => resolve(import.meta.dirname, '../example', name);

function read(name) {
  const text = readFileSync(example(name), 'utf8');
  return name.endsWith('.json') ? { json: JSON.parse(text) } : { html: text };
}

export async function liftsOf(id, name) {
  const parse = await makeParse(id);
  const { json, html } = read(name);
  if (json) {
    return parse(json);
  }
  return new Promise((ok, fail) => parseHtml(html, parse, (err, rows) => (err ? fail(err) : ok(rows))));
}

export async function trailsOf(id, name) {
  const { default: descriptor } = await import(`../../../lib/resorts/${id}/trails.js`);
  const { json, html } = read(name);
  if (json) {
    return collect(json, descriptor);
  }
  return new Promise((ok, fail) =>
    parseHtml(
      html,
      dom => collect(dom, descriptor),
      (err, rows) => (err ? fail(err) : ok(rows))
    )
  );
}

/**
 * Pin the clock for gates that read Date.now(). `node --test` runs every file
 * in its own process, so an override never leaks into another file. Returns
 * a function that restores the real clock.
 */
export function pinDate(iso) {
  const RealDate = globalThis.Date;
  globalThis.Date = class extends RealDate {
    constructor(...args) {
      super(...(args.length ? args : [iso]));
    }
    static now() {
      return RealDate.parse(iso);
    }
  };
  return () => {
    globalThis.Date = RealDate;
  };
}
