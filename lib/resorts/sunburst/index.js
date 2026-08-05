import ullrStatus from './status.js';

/**
 * Sunburst's live report comes from the public Ullr widget API; the key is the
 * one hard-coded in the <script src="https://widget.ullr.ski/ullr-widget.js?key=...">
 * tag on /our-hills/.
 *
 * Do NOT scrape the tables further down that page: they are a legacy Elementor
 * block hard-coded to "Open" for every run and carry
 * elementor-hidden-desktop/tablet/mobile, i.e. they are dead markup.
 *
 * Feed shape: a flat array of generic Ullr objects. The readable fields live in
 * `properties` as {key, value} pairs; `class` is the schema (it is where the
 * status option list lives) and carries no per-lift data. Names are raw
 * operator input and several carry stray whitespace (' Chair 2',
 * 'Tubing North Conveyor ').
 */
function property(lift, key) {
  return lift.properties?.find(p => p.key === key)?.value;
}

export default function parse(body) {
  const lifts = {};
  for (const lift of body ?? []) {
    if (lift.is_public === false || lift.archived_at) {
      continue;
    }
    const name = property(lift, 'name')?.trim();
    if (!name) {
      continue;
    }
    lifts[name] = ullrStatus(property(lift, 'status'));
  }
  return lifts;
}
