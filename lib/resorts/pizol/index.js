import { lifts, report } from '../../tools/infosnow-portal.js';

/**
 * pizol.com's winter sports report embeds infosnow (APG|SGA) area 47, so the
 * source is that report (lib/tools/infosnow-portal.js). Anlagen, category 1:
 * twelve lifts lettered A-L as on the piste map, from the Bad Ragaz - Pardiel
 * gondola to the Wangs - Furt gondola and the Riderpark tow.
 */
export default function parse(dom) {
  return lifts(report(dom), [1]);
}
