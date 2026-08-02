// snow report tables all share class snowtable1 - lift rows are the ones
// whose first cell starts with "Lift #" (that also skips trail rows and the
// thead difficulty cells)
export default {
  selector: 'table.snowtable1 tbody tr',
  parse: {
    name: {
      child: 0,
      // "Lift #1 Double Chairlift" -> "#1 Double Chairlift"
      fn: name => /^Lift #/.test(name) && name.slice(5)
    },
    status: 1
  }
};
