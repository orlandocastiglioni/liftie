import Debug from 'debug';
import * as domutil from '../tools/domutil.js';

const debug = Debug('liftie:lifts');

/**
 * Key of the marker wrappedParse returns when a parser throws. It used to hand
 * back {} - indistinguishable from a page that really lists no lifts - so a
 * broken parse published an empty board. lib/lifts/index.js turns the marker
 * into an error instead, and the last good board stays up.
 */
export const PARSE_ERROR = Symbol('liftie:parse-error');

/**
 * catch exceptions thrown by parse
 */
export default async function getParseFn(resortId) {
  const { default: descriptor } = await import(`../resorts/${resortId}/index.js`);
  const parse = typeof descriptor === 'function' ? descriptor : collectParse;

  wrappedParse.isAsync = parse.length > 1;

  return wrappedParse;

  function wrappedParse(...args) {
    try {
      return parse(...args);
    } catch (e) {
      console.error(`Exception when parsing ${resortId}`, e);
      return { [PARSE_ERROR]: e };
    }
  }

  function collectParse(dom) {
    const liftStatus = domutil.collect(dom, descriptor.selector, descriptor.parse);
    debug(`${resortId} Lift Status:`, liftStatus);
    return liftStatus;
  }
}
