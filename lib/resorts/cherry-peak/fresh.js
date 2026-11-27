import select from '../../select.js';
import isStale from '../../tools/stale.js';

/**
 * Cherry Peak keeps serving the last winter report verbatim: on 2026-11-17 the
 * page still read "Nice coverage beautiful day!" with 3 of 4 lifts and 19 of 38
 * trails open. The visible page carries no date, but the Wix warmup data
 * (script#wix-warmup-data) embeds the report collection items it renders, each
 * with a Wix `_updatedDate` - the newest was 2026-03-07T15:15:51Z, the day of
 * that report. A new report is a new item, so in season the newest stamp is
 * days old at most. Gate on it.
 *
 * Fails open like every lib/tools/stale.js caller: no warmup data or no
 * stamp publishes as before.
 */
function text(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(text).join('');
}

// the newest report item's stamp (epoch ms), or undefined
export function reportDate(dom) {
  const json = text(select(dom, 'script#wix-warmup-data')[0]);
  const stamps = [...json.matchAll(/"_updatedDate":\{"\$date":"([^"]+)"\}/g)]
    .map(m => Date.parse(m[1]))
    .filter(Number.isFinite);
  return stamps.length ? Math.max(...stamps) : undefined;
}

export default function isFresh(dom) {
  return !isStale(reportDate(dom));
}
