import { venueName, venueStatus } from './rows.js';

// rendered lift tab of the TE2 widget - see rows.js
export default {
  selector: 'li.venue-item',
  parse(node) {
    const name = venueName(node);
    if (!name) {
      return;
    }
    return { name, status: venueStatus(node) };
  }
};
