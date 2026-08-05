import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

/**
 * Shared row readers for the WordPress "ski-resort-trail-conditions" plugin
 * markup: one div.ski-resort-container holding div.ski-resort-section blocks,
 * each a div.ski-resort-header plus div.ski-resort-item rows. Lift rows carry
 * a div.ski-resort-lifttype, trail rows a span.ski-resort-difficulty.
 */

export function rowName(node) {
  return findText(select(node, '.ski-resort-name')[0])?.trim();
}

// the plugin swaps the status div's CLASS as well as its text: it is
// .ski-resort-status when open and .ski-resort-closed when closed, so match
// on either and read the text. Trail rows sometimes append a snow condition
// to the status ("Open, Groomed", "Open, Thin Cover") - only the part before
// the comma is a status token, the rest would coerce to <scheduled>.
export function rowStatus(node) {
  const status = findText(select(node, '.ski-resort-status, .ski-resort-closed')[0]);
  return status?.split(',')[0].trim();
}
