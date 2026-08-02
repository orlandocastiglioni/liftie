// same alpine-grooming page as the lifts: two '.StatusReport--trails' tables
// (West and East resort); tbody-scoped selector skips the tfoot status-key
// legend rows. cell 0 = td.StatusReport-type > span (beginner|intermediate|
// advanced|expert), cell 1 = th.StatusReport-title (name), cell 2 =
// td.StatusReport-status > span (open|closed|groomed|expected|race|hold)
export default {
  selector: '.StatusReport--trails tbody tr',
  parse: {
    name: '1/0',
    status: '2/0',
    level: '0/0'
  }
};
