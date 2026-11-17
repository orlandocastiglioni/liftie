import lifts from '../lifts/index.js';

// 2026-01-24, mid-season. The single table on the page is shared verbatim with
// the Panorama ski area and lists it FIRST - センタークワッド, ファミリーリフト,
// 第2ペアリフト, 第1ペアリフト - so a parser that misses the 下倉スキー場 section
// row publishes seven lifts here, and Panorama's 第2ペアリフト silently
// overwrites Shimokura's under the same key.
lifts('hachimantai-shimokura', 'html', {
  第1トリプルリフト: 'open',
  第2ペアリフト: 'open',
  第3ペアリフト: 'open'
});

// 2026-08-06, pre-season: every row sits at '－' U+FF0D. coerce.js only knows the
// ASCII hyphen, so without the resort's status map all three chairs would read
// 'scheduled' - "opening soon" - for the seven months the page looks like this.
lifts(
  'hachimantai-shimokura',
  'html',
  {
    第1トリプルリフト: 'closed',
    第2ペアリフト: 'closed',
    第3ペアリフト: 'closed'
  },
  { example: 'hachimantai-shimokura-preseason' }
);

// 2026-11-17, after the site redesign: the Shimokura page now carries its own
// table with only Shimokura's three chairs and no 下倉スキー場 section row, so
// the section filter must not discard everything. Pre-season, every row is an
// ASCII '-'.
lifts(
  'hachimantai-shimokura',
  'html',
  {
    第1トリプルリフト: 'closed',
    第2ペアリフト: 'closed',
    第3ペアリフト: 'closed'
  },
  { example: 'hachimantai-shimokura-2026-11' }
);
