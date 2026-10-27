/**
 * SKI plus CITY retired the #pisten_anlagen widget this parser used to read:
 * since 2026-09-22 every area page on ski-plus-city.com embeds an Intermaps
 * panorama instead, and the lift/slope tables are gone (the feed went empty
 * for eight areas at the same second). The operator's data is still published
 * in full on Intermaps' Skigebietsmanager page for region_id=831 - the same
 * template lib/resorts/rangger-koepfl and lib/resorts/hochoetz already read -
 * so this area points dataUrl at that page and re-uses rangger-koepfl's
 * caption-walking parser, which also reads the page's own 'Last Update' stamp.
 */
export { default } from '../rangger-koepfl/index.js';
