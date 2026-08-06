import select from '../../select.js';
import coerce from '../../tools/coerce.js';
import { allText } from '../../tools/domutil.js';

/**
 * Flatten a rich-text node into <br>-delimited lines. The pod is authored in
 * Umbraco's editor, so a value may sit in a bare text node one week and inside
 * an <em> the next (and the trailing '<em><br></em>' separator has to count as
 * a break) - walking the tree rather than reading innerHTML absorbs both.
 */
function lines(node, out = ['']) {
  for (const child of node.children ?? []) {
    if (child.type === 'tag' && child.name === 'br') {
      out.push('');
    } else if (child.type === 'text') {
      out[out.length - 1] += child.data;
    } else {
      lines(child, out);
    }
  }
  return out;
}

/**
 * This pod publishes a weekly SCHEDULE, not live status: in season a lift
 * reads '9:00 - 4:00' or 'Sat & Sun 10:00 - 3:00', out of season 'CLOSED'.
 * coerce handles the closed case but would quietly file every scheduled lift
 * under 'scheduled', so a time range is reported as open. Note this cannot
 * reflect wind holds, staffing closures or day-of changes - no live per-lift
 * feed is published anywhere on the site.
 */
function toStatus(value) {
  if (/closed/i.test(value)) {
    return 'closed';
  }
  if (/\d{1,2}\s*:\s*\d{2}/.test(value)) {
    return 'open';
  }
  return value;
}

/**
 * Lifts live in a hand-authored 'Lift Hours*' pod on the homepage: a single <p>
 * of '<br>'-separated 'Name: value' lines, closed by an <em> disclaimer. The
 * row set is edited by hand and drifts through the season ('Aspen Night' - the
 * Aspen triple running for night skiing - comes and goes), so nothing is
 * assumed about which or how many lifts appear. Requiring a colon drops the
 * disclaimer and the heading line; the value may omit the space after the
 * colon ('Aspen:CLOSED'), so the split is on the first colon only.
 */
export default function parse(dom) {
  const pod = select(dom, '.usn_pod_textimage .text.base-text').find(node =>
    select(node, 'span.heading').some(heading => allText(heading).trim().startsWith('Lift Hours'))
  );
  if (!pod) {
    return {};
  }
  const status = {};
  for (const paragraph of select(pod, 'p')) {
    for (const line of lines(paragraph)) {
      const match = line.match(/^\s*([^:*][^:]*?)\s*:\s*(\S.*?)\s*$/);
      if (match) {
        status[match[1]] = coerce(toStatus(match[2]));
      }
    }
  }
  return status;
}
