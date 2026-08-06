import select from '../../select.js';

/**
 * "Trail Map & Stats" is a Wix Thunderbolt page whose repeaters are
 * server-rendered, so a plain GET is enough (a full browser render produces
 * byte-equivalent repeater content).
 *
 * The five repeaters appear in this DOM order:
 *   0 lifts   #comp-ku2eej1x
 *   1 trails  #comp-ku37eiiz
 *   2 trail status, left visual column   #comp-ku3ccaz1
 *   3 trail status, right visual column  #comp-ku3clj0j
 *   4 terrain parks  #comp-ku3eazgy
 *
 * comp-* are Wix editor component ids. They survive page revisions but not a
 * rebuild of the section, so every lookup falls back to the repeater's ordinal
 * position.
 */
export function repeaterRows(dom, id, ordinal) {
  const byId = select(dom, `#${id} div[role="listitem"]`);
  if (byId.length > 0) {
    return byId;
  }
  const repeater = select(dom, '.wixui-repeater')[ordinal];
  return repeater ? select(repeater, 'div[role="listitem"]') : [];
}
