import { findText } from '../../tools/domutil.js';

// table captions read 'NAME - STATUS'; the status can be a multi-word phrase
// ('CLOSED UNTIL FURTHER NOTICE') so split on the first ' - ' only and reduce
// anything starting with OPEN/CLOSED to tokens coerce knows.
//
// The spacing is hand-typed and not reliable: on 2026-11-26 the caption read
// 'Lift 7 -OPEN' (no space after the dash), the strict ' - ' split failed and
// the lift vanished from the feed while it was turning. So first look for a
// dash followed by OPEN/CLOSED with any spacing; only that vocabulary, so a
// hyphen inside a name can never be taken for the separator. Fall back to the
// spaced ' - ' split for any other status phrase.
const KNOWN = /^(.+?)\s*[-\u2013\u2014]\s*((?:open|closed)\b.*)$/i;
const SPACED = /^(.+?)\s+-\s+(.+)$/;

export default {
  selector: '.tablepress-table-name',
  parse(node) {
    const caption = findText(node)?.trim() ?? '';
    const [, name, status] = caption.match(KNOWN) ?? caption.match(SPACED) ?? [];
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
