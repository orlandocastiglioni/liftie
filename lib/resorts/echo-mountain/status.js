// status is an icon image: open.svg / projected.svg / closed.svg
export default function status(src = '') {
  const s = src.match(/images\/([a-z]+)\.svg/)?.[1];
  return s === 'projected' ? 'scheduled' : s;
}
