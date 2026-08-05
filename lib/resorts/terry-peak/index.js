import { name, status } from './row.js';

// Lift rows sit in the #liftStatus accordion; the .o-status__legend block
// above them uses .o-status__legend-icon and lives outside .o-status__table-row,
// so it cannot leak in. Five lifts, unchanged between the winter capture and
// the live summer page - the table never empties off-season.
export default {
  selector: '#liftStatus .o-status__table-row',
  parse(node) {
    const lift = name(node);
    const state = status(node);
    if (!lift || !state) {
      return;
    }
    return { name: lift, status: state };
  }
};
