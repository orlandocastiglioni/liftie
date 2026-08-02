import coerce from '../../tools/coerce.js';

const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

// some titles arrive HTML-entity-encoded from the API itself
// ("Ellmi&#39;s Zauberteppich II") - decode before publishing
function decode(str) {
  return str.replace(/&(?:#(\d+)|#x([\da-f]+)|(amp|lt|gt|quot|apos));/gi, (_, dec, hex, name) => {
    if (dec) {
      return String.fromCodePoint(Number(dec));
    }
    if (hex) {
      return String.fromCodePoint(Number.parseInt(hex, 16));
    }
    return named[name.toLowerCase()];
  });
}

export default function parse(data = {}) {
  const { items = [] } = data;

  // two distinct lifts are both titled "Sonnenlift" (Brixen im Thale and
  // Going) - suffix duplicated titles so neither drops out of the map
  const counts = new Map();
  for (const { title } of items) {
    counts.set(title, (counts.get(title) ?? 0) + 1);
  }

  return items.reduce((ls, { title, state, location, number }) => {
    let name = decode(title);
    if (counts.get(title) > 1) {
      name = `${name} (${location || number})`;
    }
    ls[name] = coerce(state);
    return ls;
  }, {});
}
