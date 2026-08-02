// same admin-ajax feed as the lifts; trail statuses[] is [modifier?, Open|Closed]
// (e.g. ['Groomed', 'Open']) - the definitive token is always the LAST element,
// statuses[0] would read the modifier
const statuses = {
  // coerce does not know 'Partially Open' (it would become 'scheduled')
  'partially open': 'open'
};

export default function parse(data) {
  const { trails = [] } = data?.report?.facilities ?? {};
  return trails
    .filter(t => !t.excluded)
    .map(({ name, difficulty, statuses: s = [] }) => {
      const status = s[s.length - 1];
      return {
        name,
        status: statuses[status?.toLowerCase()] ?? status,
        // easiest, more-difficult, most-difficult, expert-only, terrain
        level: difficulty
      };
    });
}
