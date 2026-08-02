import { findText } from '../../tools/domutil.js';

// see: `DecodeStatus` in https://skiron.intermaps.com/js/sdds_data.js
// 126 -> "in Vorbereitung" (in preparation) - the run is being readied, so
// report it as scheduled; codes the site does not know decode to
// "keine Meldung" (no report), same as 128 -> treat unknowns as closed
const code2status = {
  7: 'closed',
  94: 'closed',
  169: 'open',
  126: 'scheduled',
  205: 'open',
  412: 'open',
  128: 'closed',
  229: 'closed'
};

// see: `DecodeDifficulty` in the same sdds_data.js
// 128 -> "skiroute" only appears on unfinished CMS entries here
const code2level = {
  320: 'easy',
  288: 'medium',
  326: 'difficult',
  404: 'extreme'
};

function tagText(node, tag) {
  const el = node.children?.find(c => c.name === tag);
  return el && findText(el);
}

export default {
  selector: 'ELEMENTGROUP ELEMENT',
  // SLOPE elements carry more tags than LIFT ones (Name_p1, Name_p2 etc.),
  // so pick children by tag name instead of index
  parse(element) {
    // HACK: `ELEMENTGROUP[NAME="SLOPE"]` should work instead of this
    if (element.parent.attribs.NAME !== 'SLOPE') {
      return;
    }
    const name = tagText(element, 'name');
    // the feed carries unfinished CMS entries like
    // "new object by hemlock_resort" - skip them
    if (!name || /^new object/i.test(name)) {
      return;
    }
    return {
      name,
      status: code2status[tagText(element, 'status')] ?? 'closed',
      level: code2level[tagText(element, 'difficulty')]
    };
  }
};
