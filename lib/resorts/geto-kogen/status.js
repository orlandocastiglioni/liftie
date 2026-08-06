// stateId -> liftie status, read off the legend painted into the base trail map.
//
// The stateIds are the bare digits 4/5/6, and coerce.js maps 1->open,
// 2->scheduled, 3->closed and knows nothing about 4/5/6 - feeding them through
// raw would turn the entire report into 'scheduled'. Translate here first.
//
// Lift lines (.gif) - the legend beside them reads:
//   4  運行中          operating          -> open      (blue dotted, #006080)
//   5  一時見合せ中     temporarily halted -> hold      (red dotted, #C02020)
//   6  準備中          standby            -> scheduled (grey dotted, #404040)
//  absent 運休・終了    suspended/finished -> closed
// 準備中 is 'scheduled' here, not 'closed'. jp-status leaves 準備中 to each
// resort because sites that use it as an off-season marker mean 'closed', but
// Geto demonstrably uses it as a pre-opening state: on 2025-03-23 all five
// lifts read 6 at 02:03 JST and all five read 4 at 09:49 JST the same morning,
// and on 2026-01-14 at 09:20 JST two lifts sat at 6 while the two pairs ran at
// 4. So 6 means "will run", which is what liftie's 'scheduled' says. The cost
// is that out of season Geto leaves a couple of overlays painted at 6 for
// months (2021-09-16 had all five at 6 in September).
//
// 一時見合せ中 is explicitly a *temporary* interruption of a lift that is
// otherwise running today, which is exactly liftie's 'hold'.
const lift = {
  4: 'open',
  5: 'hold',
  6: 'scheduled'
};

// Course polygons (.png) - different legend, and note 4 and 5 swap meaning
// relative to the lifts:
//   4  一般コース非圧雪 OPEN / ツリーランエリア OPEN -> open (blue speckle)
//   5  クローズ                                  -> closed (salmon hatch)
//   6  準備中                                    -> scheduled (grey hatch)
//  absent 一般コース圧雪 OPEN groomed and open    -> open
// The inversion is the single easiest thing to get wrong: an open, groomed
// piste emits NO overlay because the base map already shows it white. On
// 2026-01-14 A1 - the main groomed run - was absent precisely because it was
// open.
const course = {
  4: 'open',
  5: 'closed',
  6: 'scheduled'
};

export function liftStatus(stateId) {
  return lift[stateId] ?? 'closed';
}

export function courseStatus(stateId) {
  return course[stateId] ?? 'open';
}
