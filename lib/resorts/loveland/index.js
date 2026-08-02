import { findText } from '../../tools/domutil.js';

// table captions read 'NAME - STATUS'; the status can be a multi-word phrase
// ('CLOSED UNTIL FURTHER NOTICE') so split on the first ' - ' only and reduce
// anything starting with OPEN/CLOSED to tokens coerce knows
export default {
  selector: '.tablepress-table-name',
  parse(node) {
    const [, name, status] = findText(node)?.match(/^(.+?)\s+-\s+(.+)$/) ?? [];
    if (!name) {
      return;
    }
    return {
      name,
      status: normalize(status)
    };
  }
};

function normalize(status) {
  if (/^closed\b/i.test(status)) {
    return 'closed';
  }
  if (/^open\b/i.test(status)) {
    return 'open';
  }
  return status;
}
