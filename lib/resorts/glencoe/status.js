// status is an image: 2.jpg shows on the summer-running access chair (open),
// 0.jpg on everything shut; 1.jpg presumed hold
export default function status(src = '') {
  const code = src.match(/images\/(\d)\.jpg/)?.[1];
  return { 0: 'closed', 1: 'hold', 2: 'open' }[code];
}
