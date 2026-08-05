import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * The conditions report is plain server-rendered WordPress/Toolset markup, but
 * pknpk.com sits behind a BigScoots javascript interstitial that 403s every
 * plain fetch (and that FlareSolverr's Cloudflare detector does not recognise),
 * so resort.json pulls the page through renderd.
 *
 * Three Toolset views render into the page; the lifts one is view 5748, whose
 * container id is "wpv-view-layout-5748-<hash>". The hash has been stable
 * across every capture but is keyed by prefix anyway. A row is
 *   <div class="cond-rep-list-single">
 *     <div class="inner-wrap">
 *       <div class="list-single-left"><div class="list-single-title">NAME</div></div>
 *       <div class="list-single-right">
 *         <img class="list-single-icon open|closed" title="open|closed"><div>OPEN</div>
 *
 * The status is published four redundant ways (icon class, title, aria-label,
 * sibling text); the second class token is the cleanest and its vocabulary is
 * exactly {open, closed}, both of which coerce already knows.
 */
export default {
  selector: '[id^="wpv-view-layout-5748-"] .cond-rep-list-single',
  parse(node) {
    const name = findText(select(node, '.list-single-title')[0]);
    if (!name) {
      return;
    }
    return {
      name,
      status: select(node, 'img.list-single-icon')[0]?.attribs.class?.split(/\s+/)[1]
    };
  }
};
