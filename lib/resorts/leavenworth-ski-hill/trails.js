import statusRows from './rows.js';

/**
 * Everything that is not uphill transport. The venue prefix is mandatory:
 * 'Snowshoe Trail' is published three times and 'Nordic Trails 8km' twice, and
 * both collect() and shape() key by name, so unprefixed rows would silently
 * collapse five rows into two.
 *
 * LWSC publishes no difficulty rating on this feed, so no level is emitted.
 */
export default function parse(body) {
  return statusRows(body)
    .filter(row => !row.isLift)
    .map(row => ({
      name: row.location ? `${row.location} - ${row.name}` : row.name,
      status: row.status
    }));
}
