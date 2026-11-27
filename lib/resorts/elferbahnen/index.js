/**
 * SKI plus CITY retired the #pisten_anlagen tables this parser used to read
 * (2026-09-22, the same day as its eleven sibling areas - see
 * lib/resorts/serlesbahnen), which is why the Elfer went empty. The siblings
 * moved to Intermaps' Skigebietsmanager then; the Elfer was held back because
 * its region (1063) was flagged 'SRM -> OFF' there and had reported 4/4 open
 * while the network page said 1/4.
 *
 * With the network page gone there is no second source left to disagree
 * with, and region 1063 is live again: on 2026-11-27 its masthead read
 * "Last Update: 27 November 2026 19:42:49", the operator's own contact block
 * (Hochstubai Liftanlagen, elfer.at) and the full board - the gondola, the
 * three drag lifts and the Krößbach practice lift. So this area now reads
 * region 1063 through rangger-koepfl's caption-walking parser like the others,
 * and publishes that stamp as reportedAt, so a frozen board stays visible as one.
 */
export { default } from '../rangger-koepfl/index.js';
