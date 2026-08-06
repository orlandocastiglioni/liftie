/**
 * Core Japanese lift/course status vocabulary.
 *
 * None of these tokens exist in lib/tools/coerce.js, so a Japanese resort that
 * feeds them straight to coerce gets 'scheduled' for every row - a closed lift
 * renders as "opening soon". Every JP resort therefore needs a translation
 * step, and this is the part they all agree on.
 *
 * It returns `undefined` for anything it does not recognise, rather than
 * guessing, so a resort layers its own vocabulary on top:
 *
 *   import jp from '../../tools/jp-status.js';
 *   export default function status(text = '') {
 *     return jp(text) ?? local(text);
 *   }
 *
 * DELIBERATELY NOT INCLUDED, because the existing resorts disagree and each
 * disagreement is load-bearing - decide these per resort:
 *
 *   △ / ▲        hirugano, dynaland, amihari -> 'hold', but some sites use it
 *                for 準備中 (not yet open today), which is 'scheduled'
 *   STANDBY      nayoro-piyashiri maps it to 'closed' on purpose: it is that
 *                site's off-season marker, and reading it as 'hold' made July
 *                look like a wind hold
 *   準備中        "preparing" - 'scheduled' at amihari, but sites that use it
 *                for summer closure mean 'closed'
 *   整備中        "under maintenance" - 'hold' at amihari, 'closed' at palcall
 *   要確認        "check with staff" - dynaland treats as 'hold'
 *   a time range  okunakayama publishes operating hours in the status cell, so
 *                 "8：35～19：50" means open there; elsewhere hours sit in their
 *                 own column and say nothing about status
 *
 * The six existing JP resorts keep their own status.js and are NOT refactored
 * onto this: their divergence is intentional and rewriting it risks changing
 * live output for no gain.
 */
export default function jpStatus(text = '') {
  // strip zero-width spaces, which several of these CMSs sprinkle in
  const t = String(text).replace(/[​﻿]/g, '').trim();
  if (!t) {
    return;
  }
  // 運行中 / 営業中 = operating, ○◯〇 = the open glyph (three codepoints in use,
  // and Amihari mixes U+3007 and U+25CB inside a single table)
  if (/^[○◯〇]/.test(t) || /運行中|営業中|運行$/.test(t)) {
    return 'open';
  }
  // 運休 = suspended, 営業終了 / 運行終了 = finished for the day or season.
  // ×✕✖ is the closed glyph; U+00D7 and U+2715 both appear in the wild.
  if (/^[×✕✖]/.test(t) || /運休|営業終了|運行終了/.test(t)) {
    return 'closed';
  }
  return;
}
