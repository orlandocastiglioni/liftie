const levels = {
  'easy-piste': 'green',
  'medium-piste': 'blue',
  'difficult-piste2': 'black',
  skiroute: 'doubleBlack'
};

export default function parse(data = {}) {
  const { items = [] } = data;
  return items
    .filter(item => item.state) // off season the report carries no state
    .map(({ title, state, facilityTypeIdentifier }) => ({
      name: title,
      status: state,
      level: levels[facilityTypeIdentifier]
    }));
}
