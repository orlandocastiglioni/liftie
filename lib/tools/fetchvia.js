import Debug from 'debug';
import { LIFTIE_FLARESOLVERR, LIFTIE_RENDERD } from '../env.js';

const debug = Debug('liftie:fetchvia');

/**
 * proxy tier for sites that plain fetch cannot read:
 * - via: 'flaresolverr' - render through the local FlareSolverr instance
 *   (executes page javascript, clears Cloudflare challenges)
 * - via: 'renderd' - local chromium render service, supports waitSelector
 *   for pages that populate status rows from post-load XHR calls
 *
 * any url descriptor ({ host, pathname, query? }) from resort.json can opt in
 * by adding "via"; responses come back as fetch-Response-alikes so the
 * lifts/trails pipelines don't care how the bytes were obtained
 */

export function hasVia(url) {
  return Boolean(url?.via);
}

export function fullUrl({ host, pathname, query }) {
  const url = new URL(pathname, host);
  if (query) {
    url.search = new URLSearchParams(query).toString();
  }
  return url;
}

export default function fetchVia(url) {
  switch (url.via) {
    case 'flaresolverr':
      return flaresolverr(url);
    case 'renderd':
      return renderd(url);
    default:
      return Promise.reject(new Error(`unknown fetch proxy: ${url.via}`));
  }
}

async function flaresolverr(url) {
  if (url.body) {
    // flaresolverr only supports x-www-form-urlencoded posts; none of our
    // sources need that - route JSON posts through renderd instead
    throw new Error('flaresolverr proxy does not support request bodies');
  }
  const target = fullUrl(url);
  debug('flaresolverr fetch %s', target);
  const res = await fetch(LIFTIE_FLARESOLVERR, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cmd: 'request.get',
      url: target.toString(),
      maxTimeout: url.maxTimeout ?? 60000
    })
  });
  if (!res.ok) {
    return response(502, '');
  }
  const envelope = await res.json();
  if (envelope.status !== 'ok' || !envelope.solution) {
    debug('flaresolverr error for %s: %s', target, envelope.message);
    return response(502, '');
  }
  return response(envelope.solution.status, envelope.solution.response ?? '');
}

async function renderd(url) {
  if (!LIFTIE_RENDERD) {
    throw new Error('LIFTIE_RENDERD is not configured');
  }
  const target = new URL('/render', LIFTIE_RENDERD);
  target.searchParams.set('url', fullUrl(url).toString());
  if (url.waitSelector) {
    target.searchParams.set('wait', url.waitSelector);
  }
  if (url.maxTimeout) {
    target.searchParams.set('timeout', url.maxTimeout);
  }
  debug('renderd fetch %s', target);
  const res = await fetch(target);
  return response(res.status, await res.text());
}

function response(status, body) {
  return {
    status,
    text: async () => body,
    json: async () => unwrapJson(body)
  };
}

/**
 * a JSON endpoint rendered in headless chrome comes back as the browser's
 * JSON-viewer page - the payload lives inside a <pre> with html entities
 * escaped; a direct JSON body passes through untouched
 */
export function unwrapJson(body) {
  const text = body.trim();
  if (text.startsWith('{') || text.startsWith('[')) {
    return JSON.parse(text);
  }
  const pre = text.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
  if (!pre) {
    throw new Error('response is neither JSON nor a rendered JSON page');
  }
  return JSON.parse(decodeEntities(pre[1]));
}

function decodeEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, '&');
}
