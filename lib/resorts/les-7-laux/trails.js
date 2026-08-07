import rows, { LIFTS, reportedAt } from './rows.js';

/**
 * GRADE AND LEVEL. Every non-lift row carries a type icon whose code is
 * <discipline>-<colour>:
 *
 *   A-V  A-B  A-R  A-N     piste alpine        verte bleue rouge noire
 *   F-V  F-B  F-R          ski de fond         (the Beldina nordic domain)
 *   LS-V LS-B LS-R         ligne de snowpark
 *   ZL-N                   itinéraire freeride (all 7 Freeski rows)
 *   L-V                    luge (the Wiz run)
 *   BC-                    boardercross - no colour at all
 *
 * Les 7 Laux runs the standard French FOUR tier scale, verte < bleue < rouge <
 * noire, and liftie's level has four values of which one is a terrain park - so
 * something has to give. normalizeLevel has no red tier whatsoever, so a
 * straight pass-through would drop the grade of the 19 rouges outright, and the
 * French words are not keys either. Mapped locally one step down each - rouge ->
 * black, noire -> doubleBlack - which keeps all four tiers distinct and in the
 * resort's own order. Same reading as the other four tier European resorts in
 * the registry (lib/resorts/norefjell), and the same red -> black convention
 * lib/resorts/glencoe and lib/resorts/baqueira-beret document.
 *
 * `grade` then carries the verbatim French word, so a consumer can render the
 * real verte/bleue/rouge/noire scale instead of liftie's lossy reading. The
 * words are the resort's own: its infos-pistes page spells them out for screen
 * readers as 'Piste verte|bleue|rouge|noire', and the 49 alpine runs shared
 * between the two sources partition 1:1 onto A-V/A-B/A-R/A-N.
 *
 * The snowpark lines are the one exception. They are graded by colour like a
 * piste, but they are park features in the Snowpark sector, and terrainPark is
 * a level liftie has and nothing else here would use - so they take it, and
 * their colour survives on `grade`. The boardercross publishes no colour, so it
 * gets neither: a missing level beats a made-up one.
 */
const levels = {
  V: 'green',
  B: 'blue',
  R: 'black',
  N: 'doubleBlack'
};

const grades = {
  V: 'verte',
  B: 'bleue',
  R: 'rouge',
  N: 'noire'
};

/**
 * PISTES ET ACTIVITÉS - 69 rows in the March 2026 board: 53 alpine and park
 * runs (Prapoutel 25, Pleynet 17, Pipay 7, Snowpark 4), the 5 tracks of the
 * Domaine nordique de Beldina plus the Voie Blanche at Pleynet, 7 freeski
 * itineraries, 2 itinéraires ludiques and the Wiz luge. All of them have real
 * per-row status, which is why this resort is kind 'both'.
 *
 * Sector and category are seasonal; anything that is not under the Remontées
 * heading is a row here.
 */
export default function trails(dom) {
  const list = [];
  for (const row of rows(dom)) {
    if (row.category === LIFTS || !row.name) {
      continue;
    }
    const [family, colour] = (row.type ?? '').split('-');
    list.push({
      name: row.name,
      status: row.status,
      level: family === 'LS' ? 'terrainPark' : levels[colour],
      grade: grades[colour]
    });
  }
  const at = reportedAt(dom);
  if (at) {
    // non-enumerable: metadata about the list, not one of its rows
    Object.defineProperty(list, 'reportedAt', { value: at });
  }
  return list;
}
