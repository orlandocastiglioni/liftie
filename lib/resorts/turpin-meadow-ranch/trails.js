// Nordic/fat-bike guest ranch in Buffalo Valley (Moran, WY) with seven groomed
// XC loops and zero uphill conveyances, hence "no": { "lifts": true }. Grooming
// is published by Jackson Hole Nordic through Nordic Pulse; the per-area
// data-npww JSON feed is 403 to non-browser requests, but the "?embed=true"
// page server-renders that same payload into <script id="ng-state"> and the
// shared parser reads it from there. This feed emits only easy/intermediate
// levels and the parser's own open/closed/hold statuses, all of which
// normalizeLevel() and coerce() already know.
export { default } from '../../tools/nordic-pulse.js';
