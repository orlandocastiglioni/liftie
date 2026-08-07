import reportedAt from './reported-at.js';
import status from './status.js';

/**
 * intermaps files the resort's non-lift terrain into three buckets and taking
 * only .slopes[] would drop a third of it: .slopes[] = 15 pistes and Skirouten,
 * .routes[] = 7 further status-bearing lines (4 Winterwanderwege, the Rodelbahn,
 * the Rennstrecke and the Familyslope) and .pois['362'] = Funpark Nuggetpark.
 * All 23 carry a real open/closed status; together they are a strict superset
 * of the 19 rows in the bergfex widget the resort publishes alongside this one.
 *
 * GRADES. Rauris is an Austrian three-tier hill: blau / rot / schwarz, spelled
 * out by the platform's own translation table as 2614 'Skipiste blau',
 * 2615 'Skipiste rot', 2616 'Skipiste schwarz', plus 2617 'Skiroute'. The feed
 * also ships an English .popup.difficulty of easy|medium|difficult - DO NOT pass
 * that through: normalizeLevel reads easy->green and medium->blue, which shifts
 * the whole scale down a step and publishes every blue piste as green. The
 * German leicht/mittel/schwer and the '2614-easy' type codes are not in the
 * levels map at all, so an explicit map is required either way.
 *
 * Mapped on the baqueira-beret / corralco convention for a European scale whose
 * red is not the map's 'red': blau->blue, rot->black, schwarz->doubleBlack,
 * which keeps the three tiers distinct and correctly ordered. `grade` carries
 * the resort's own German word so the real scale survives the normalisation.
 * Skirouten are unpatrolled ski routes with no difficulty - no level, grade
 * 'Skiroute' - and the routes/funpark rows carry their intermaps subtitle
 * (Winterwandern / Rodeln / Rennstrecke / Funslope / Funpark) as the grade.
 */
const levels = {
  2614: 'blue',
  2615: 'black',
  2616: 'doubleBlack'
};

const grades = {
  2614: 'blau',
  2615: 'rot',
  2616: 'schwarz',
  2617: 'Skiroute'
};

function slope(row) {
  // .type is '2614-easy' | '2615-medium' | '2616-difficult' | '2617'
  const code = String(row.type ?? '').split('-')[0];
  return {
    level: levels[code],
    grade: grades[code] ?? row.subtitle
  };
}

// the Familyslope and Funpark Nuggetpark have no difficulty but are freestyle
// terrain, which is a level liftie has
function feature(row) {
  return {
    level: /^fun(slope|park)$/i.test(row.subtitle ?? '') ? 'terrainPark' : undefined,
    grade: row.subtitle
  };
}

function collect(rows, kind, out) {
  for (const row of rows ?? []) {
    const name = row.popup?.title?.trim();
    if (!name) {
      continue;
    }
    out.push({
      name,
      status: status(row.status ?? row.popup?.status),
      ...kind(row)
    });
  }
}

export default function trails(data) {
  const rows = [];
  collect(data?.slopes, slope, rows);
  collect(data?.routes, feature, rows);
  collect(data?.pois?.['362'], feature, rows);
  const at = reportedAt(data);
  if (at) {
    Object.defineProperty(rows, 'reportedAt', { value: at });
  }
  return rows;
}
