const states = ['open', 'hold', 'scheduled', 'closed'];

export default function stats(rows) {
  const r = Object.fromEntries(states.map(s => [s, 0]));
  rows.forEach(({ status }) => {
    if (status in r) {
      r[status] += 1;
    }
  });
  return r;
}
