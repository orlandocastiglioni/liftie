const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

// WordPress serves `title.rendered` HTML-encoded in some contexts
// ("Mogul Mouse&#8217;s Magic Lift") - decode before publishing
export default function decode(str) {
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
