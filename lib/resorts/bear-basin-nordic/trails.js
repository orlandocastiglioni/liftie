// Nordic-only club area (Payette Lakes Ski Club, McCall ID) - no lifts at all,
// hence "no": { "lifts": true }. The Nordic Pulse embed page server-renders the
// 403-only data-npww feed into <script id="ng-state">; the shared parser reads
// it. Feed emits only open/closed/hold statuses and easy/intermediate/advanced
// levels, all already known to coerce() and normalizeLevel().
export { default } from '../../tools/nordic-pulse.js';
