export default {
  // the trails pp-table: Trails | Difficulty | Open/Closed | Conditions | LIGHTS
  selector: 'table:has(th:contains(Trails)) tbody tr',
  parse: {
    name: '0/0',
    level: '1/0',
    status: '2/0'
  }
};
