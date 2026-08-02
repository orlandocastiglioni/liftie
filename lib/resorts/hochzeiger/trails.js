import coerce from '../../tools/coerce.js';

const levels = {
  'easy-piste': 'green',
  'medium-piste': 'blue',
  'difficult-piste2': 'black',
  skiroute: 'doubleBlack'
};

export default function parse(data = {}) {
  const { items = [] } = data;
  // multi-segment pistes repeat under one title (Kaiserexpress x3) - merge
  // by title, open wins, first level kept
  const byTitle = new Map();
  for (const { title, state, facilityTypeIdentifier } of items) {
    if (!state) {
      continue; // off season the report carries no state
    }
    const prev = byTitle.get(title);
    if (!prev) {
      byTitle.set(title, { name: title, status: state, level: levels[facilityTypeIdentifier] });
    } else {
      // Micado emits 'opened', not 'open'
      if (coerce(state) === 'open') {
        prev.status = state;
      }
      prev.level ??= levels[facilityTypeIdentifier];
    }
  }
  return [...byTitle.values()];
}
