/**
 * Shared status rule for Levi's lifts and slopes - both endpoints carry the
 * identical `open` object, so both go through here.
 *
 * Levi publishes TWO booleans and they are not the same thing:
 *
 *   open.operating - the day/season flag the operator sets. Stable all day.
 *   open.now       - operating AND the wall clock is currently inside
 *                    open.hours. Flips to false every evening at closing.
 *
 * We key on `operating`. Evidence (2025-11-17 19:43Z = 21:43 local, the
 * fixtures in test/resorts/example/levi*.json): four lifts and four slopes
 * had operating=true with now=false, and each of those had hours ending at
 * 19:00 while the one lift still reading now=true ran to 23:00 - i.e. `now`
 * is purely the clock gate. Levi's own headline tally at that same instant
 * (statistics/v1/today) reported lifts 4/26, slopes 3/44, snowParks 1/4,
 * which is exactly the `operating` count (the fourth open slope, Fun Park,
 * is the snowPark) and not the `now` count. So `operating` is the day-level
 * truth the resort itself publishes; `now` would black out the whole
 * mountain from 19:00 Finnish time onwards, i.e. from lunchtime in North
 * America, every single winter day.
 *
 * The site's own icon renderer does `temporarilyClosed ? orange : now ?
 * green : red` - we keep its temporarilyClosed branch (the 'Tilapaisesti
 * kiinni' state, which Levi uses for wind holds) and only swap now->operating.
 *
 * inSnowPreparation is the slopes-only 'Lumetus kaynnissa' badge: snowmaking
 * under way on a run that is not open yet. That is liftie's 'scheduled'
 * (coerce.js already maps the equivalent 'in-preparations' that way). Lifts
 * have no such field, so the branch is a no-op for them.
 *
 * These are booleans, so nothing here needs coerce - the four strings
 * returned are liftie statuses verbatim. The Finnish words on the public
 * page ('Avoinna' / 'Tilapaisesti kiinni' / 'Suljettu') are not in
 * coerce.js, but they never appear in the API payload.
 */
export default function status(row) {
  const open = row?.open ?? {};
  if (open.temporarilyClosed) {
    return 'hold';
  }
  if (open.operating) {
    return 'open';
  }
  if (row?.inSnowPreparation) {
    return 'scheduled';
  }
  return 'closed';
}

/**
 * name.en is a genuine translation on the lifts ('Etelan sompahissi' ->
 * 'South pome lift'); on the slopes both languages hold the same map code.
 * Never key on `identifier` - all eight surface/carpet lifts share the
 * literal '='.
 */
export function name(row) {
  return (row?.name?.en || row?.name?.fi || '').trim();
}

/** {"data": [...]} wrapper, unwrapped the way Levi's own client does it */
export function rows(body) {
  return Array.isArray(body) ? body : (body?.data ?? []);
}
