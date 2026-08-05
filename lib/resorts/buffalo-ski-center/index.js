import { rowName, rowStatus } from './rows.js';

// lifts and trails share one server-rendered page; a lift row is the
// div.ski-resort-item that carries a lift type (Chair Lift / Conveyor /
// Handle Tow / T-Bar) where a trail row carries a difficulty icon instead.
// Status vocabulary is just open/closed - the plugin CSS defines no other
// state - and both spellings are already known to coerce.
export default {
  selector: 'div.ski-resort-item:has(.ski-resort-lifttype)',
  parse(node) {
    return { name: rowName(node), status: rowStatus(node) };
  }
};
