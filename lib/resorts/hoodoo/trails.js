// trail table lives on the same TablePress page as the lifts; cells are
// Trail | Difficulty | Status | Groomed | Night Ski - the difficulty cell is
// an icon <img> followed by a text node (EASIER / MORE DIFFICULT / DIFFICULT /
// MOST DIFFICULT - all known to normalizeLevel), hence the 1/1 child path;
// status is plain OPEN / CLOSED text; groomed and night ski are icon-only
// columns that don't fit liftie's trail shape
export default {
  selector: '#tablepress-3 tbody tr',
  parse: {
    name: 0,
    level: '1/1',
    status: 2
  }
};
