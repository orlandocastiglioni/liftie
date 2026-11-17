import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';
import { cleanName } from './row.js';

/**
 * terrypeak.com was rebuilt in 2026-11: /the-mountain/trails-lifts/ now
 * redirects to /trails-lifts, which server-renders a "DOR" status widget
 *
 *   div.dor-status-display > div.dor-status-display__section
 *     h3.dor-status-display__heading   "Lift Status" | "Trail Status"
 *     (trails only) div.dor-status-display__column, headed by
 *       div.dor-status-display__column-heading--beginner|intermediate|advanced
 *     div.dor-status-display__item
 *       span.dor-status-display__badge.dor-status-display__badge--<status>
 *       span.dor-status-display__name
 *
 * Status comes from the badge's modifier class (only --closed seen so far,
 * pre-season) with the badge text as the fallback. The lift's
 * __lift-type icon and a trail's __conditions span (grooming / snowmaking) are
 * never read as status.
 */
const BADGE = /\bdor-status-display__badge--([a-z-]+)/;
const LEVEL = /\bdor-status-display__column-heading--([a-z-]+)/;

function text(node) {
  return node ? allText(node).replace(/\s+/g, ' ').trim() : '';
}

function deepText(node) {
  if (!node) {
    return '';
  }
  if (node.type === 'text') {
    return node.data;
  }
  return (node.children ?? []).map(deepText).join('');
}

function statusOf(item) {
  const badge = select(item, '.dor-status-display__badge')[0];
  if (!badge) {
    return;
  }
  const word = badge.attribs?.class?.match(BADGE)?.[1];
  return coerce(word ?? deepText(badge));
}

function section(dom, heading) {
  return select(dom, '.dor-status-display .dor-status-display__section').find(s =>
    new RegExp(heading, 'i').test(text(select(s, '.dor-status-display__heading')[0]))
  );
}

function row(item) {
  const name = cleanName(deepText(select(item, '.dor-status-display__name')[0]));
  const status = statusOf(item);
  return name && status ? { name, status } : undefined;
}

export function isDor(dom) {
  return select(dom, '.dor-status-display').length > 0;
}

export function lifts(dom) {
  const status = {};
  const s = section(dom, 'lift');
  for (const item of s ? select(s, '.dor-status-display__item') : []) {
    const r = row(item);
    if (r && !(r.name in status)) {
      status[r.name] = r.status;
    }
  }
  return status;
}

export function trails(dom) {
  const rows = [];
  const s = section(dom, 'trail');
  for (const column of s ? select(s, '.dor-status-display__column') : []) {
    const heading = select(column, '.dor-status-display__column-heading')[0];
    const level = heading?.attribs?.class?.match(LEVEL)?.[1];
    for (const item of select(column, '.dor-status-display__item')) {
      const r = row(item);
      if (r) {
        rows.push(level ? { ...r, level } : r);
      }
    }
  }
  return rows;
}
