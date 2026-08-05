import select from '../../select.js';
import { findText } from '../../tools/domutil.js';

// Snowstar's hand-built static site publishes its whole operating report as
// four tiles in two `.two_col_weather` rows: Lifts, Tubing Hill, Terrain Park
// and Base Depth. Each tile is `<div class="weather_item"><h3>STATUS</h3>
// <div class="activity">Label</div></div>`.
//
// There is no per-lift or per-trail breakdown anywhere on the site (the trail
// map is a rasterised PDF), so these three aggregate tiles are the complete
// status feed - hence no trails.js and no "trails" in resort.json.
//
// The forecast block below uses the SAME .weather_item class inside
// `.three_col_weather`, so the selector must stay scoped to .two_col_weather
// or Temperature / Humidity / UV Index get ingested as lifts.
export default {
  selector: 'section.weather_content div.two_col_weather div.weather_item',
  parse(node) {
    // the label carries stray whitespace and a trailing space ("Lifts ")
    const name = findText(select(node, '.activity')[0])?.trim();
    const status = findText(select(node, 'h3')[0])?.trim();
    if (!name || !status) {
      return;
    }
    // the fourth tile is Base Depth - its h3 is a depth (`0"`), not a status,
    // and coerce would turn it into 'scheduled'
    if (name === 'Base Depth' || /^[\d.]+"?$/.test(status)) {
      return;
    }
    return { name, status };
  }
};
