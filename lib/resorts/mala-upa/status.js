// skimu.cz emits exactly two states site-wide - verified across the lift
// table, the slope table, the cross-country page and the March-2026 in-season
// capture: <span class="state state--green" title="V provozu"> and
// <span class="state state--off" title="Mimo provoz">. There is no third
// state; the hill has no hold/partial vocabulary at all.
//
// Neither Czech phrase is in coerce.js, so left raw every lift and every
// slope on the mountain would publish as 'scheduled'.
//
// Read the title, not the class. The class suffixes happen to be 'green' and
// 'off', which coerce already maps to open/closed, so a class-based reader
// would keep "working" (silently, wrongly) if the CMS ever recoloured a
// state. An explicit title map fails loudly instead: an unknown title falls
// through to coerce, which logs it and yields 'scheduled'.
const states = {
  'V provozu': 'open',
  'Mimo provoz': 'closed'
};

export default function status(span) {
  return states[span?.attribs?.title?.trim()];
}
