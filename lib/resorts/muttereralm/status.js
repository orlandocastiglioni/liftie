/**
 * The Intermaps widget embedded in ski-plus-city.com's area pages publishes
 * status as a Font Awesome icon class and nothing else - there is no word, no
 * title attribute, no data- flag anywhere in the row:
 *
 *   <i class="fa fa-check"></i>   open
 *   <i class="fa fa-times"></i>   closed
 *
 * Those are the only two the widget emits, in the live summer page and in the
 * winter capture this resort's fixture comes from alike.
 *
 * coerce.js resolves 'check' to open on its own, but it has NO entry for
 * 'times' - its closed aliases are 'cross' and 'x', and coerce only strips
 * [\s_-] before the lookup, so nothing folds 'times' into either. Left alone
 * every closed lift and piste on the mountain would fall through to the
 * unknown-token default and publish as 'scheduled', i.e. about to open. Map it
 * here instead.
 */
export default function status(icon = '') {
  if (/\bfa-times\b/.test(icon)) {
    return 'closed';
  }
  if (/\bfa-check\b/.test(icon)) {
    return 'open';
  }
  // hand anything new the widget starts emitting to coerce unchanged, so it
  // surfaces in the debug log rather than being silently forced to a value
  return icon;
}
