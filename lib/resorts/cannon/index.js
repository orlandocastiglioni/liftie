export default {
  selector: 'table.mb-16 tr',
  parse: {
    name: '1/0',
    status: {
      child: '0/0',
      attribute: 'aria-label',
      // aria-labels: 'Green circle with checkmark' | 'Red circle with X' |
      // 'Yellow circle with triangle' (the On Hold state in the table legend)
      regex: /(red|green|yellow)/i,
      // coerce knows red/green but not yellow
      fn: status => (status && /yellow/i.test(status) ? 'hold' : status)
    }
  }
};
