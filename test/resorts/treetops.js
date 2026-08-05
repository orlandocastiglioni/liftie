import lifts from '../lifts/index.js';

// 2026-02-09 wayback capture of /live/ - the only winter sample of the page
// that replaced /ski-snow/report/ (which now 404s).
//
// Treetops publishes no per-lift rows at all: the whole lift feed is the
// summary field "Lifts Open:" ('1 & 4 ' that day) plus "Magic Carpet Open:"
// ('Yes'). The inventory is fixed from the resort's trail map - Triple Chair
// #1, #3 and #4, there is no #2 - and a chair is open when its number shows
// up in the list, which is why #3 reads closed here.
lifts('treetops', 'html', {
  'Chair #1': 'open',
  'Chair #3': 'closed',
  'Chair #4': 'open',
  'Magic Carpet': 'open'
});
