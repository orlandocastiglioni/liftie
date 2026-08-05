/**
 * Leavenworth Winter Sports Club runs four venues (Ski Hill, Icicle River
 * Trails, Golf Course, Peshastin Mill Site) off one Drupal JSON:API node.
 *
 *   data[0].relationships.field_trail_status.data -> ordered refs to the 14
 *     status paragraphs; `included` itself is unordered, so this array is the
 *     only source of report order
 *   included[]                                    -> the paragraphs plus the
 *     node--location entries their field_location points at
 *
 * The same 14 rows mix uphill transport, nordic/snowshoe/fat-bike terrain, a
 * tubing park, a ski jump, a sledding hill and the lodge, so lifts and trails
 * can only be told apart by an explicit name test.
 */

// the only uphill transport LWSC publishes: two rope tows sold as one row,
// plus the moving carpet - both on the Ski Hill
const LIFT = /rope tow|carpet/i;

export default function statusRows(body) {
  const node = Array.isArray(body?.data) ? body.data[0] : body?.data;
  const refs = node?.relationships?.field_trail_status?.data ?? [];
  const included = new Map((body?.included ?? []).map(entry => [entry.id, entry]));
  const rows = [];
  for (const ref of refs) {
    const paragraph = included.get(ref?.id);
    const name = paragraph?.attributes?.field_sub_location?.trim();
    if (!name) {
      continue;
    }
    const locationId = paragraph.relationships?.field_location?.data?.id;
    const location = included.get(locationId)?.attributes?.title?.trim();
    rows.push({
      name,
      location,
      status: paragraph.attributes.field_trail_status,
      isLift: location === 'Ski Hill' && LIFT.test(name)
    });
  }
  return rows;
}
