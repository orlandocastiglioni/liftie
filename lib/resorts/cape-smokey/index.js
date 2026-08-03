// Cape Smokey's operator feed (operator.capesmokey.ca/api/status.php) reports
// the main Gondola as the top-level whole-hill `is_open` flag - it is
// schedule-driven, so the gondola reads open during summer sightseeing hours
// too. The only separately-named lift entry is the Magic Carpet: a `trails[]`
// row with difficulty 'lift'. `is_open` is a boolean and coerce throws on
// boolean true, so map straight to a status string here.
export default function parse(body) {
  const lifts = { Gondola: body.is_open ? 'open' : 'closed' };
  for (const t of body.trails || []) {
    if (t.difficulty === 'lift') {
      lifts[t.name] = t.is_open ? 'open' : 'closed';
    }
  }
  return lifts;
}
