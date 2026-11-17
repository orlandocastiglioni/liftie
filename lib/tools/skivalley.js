/**
 * Shared reader for the "Ski Valley" Drupal sites Ruka and Pyha run
 * (ruka.fi, pyha.fi). Their "Slopes & lifts" page is a React app
 * (SlopesAndLifts.bundle.js) that fetches
 *
 *   /<lang>/api/slopes_and_lifts?routes=<ids>&lifts=<ids>&season=winter
 *
 * where the id lists come from the page's drupalSettings
 * (slopes_and_lifts_selected_routes / _lifts). The answer is
 * { slopes: [...], lifts: [...], exceptions: [...] }; every row carries
 * open_today - today's opening hours ('9:30-19:00') or null - and the week's
 * opening_hours. A row with hours today is open today, which is how the
 * resort's own page marks it; null is closed. The data is the resort's own
 * daily schedule, so there is no stale board to gate: out of season every row
 * is simply null.
 *
 * Slopes carry difficulty { level, name } on the Finnish four-colour scale:
 * Very easy (green), Easy (blue), Intermediate (red), Challenging (black).
 * liftie has no red, so the top two shift down one slot - the same reading as
 * the French and Swiss resorts - and the resort's word is kept as the grade.
 */
const LEVELS = {
  'very easy': 'green',
  easy: 'blue',
  intermediate: 'black',
  challenging: 'doubleBlack'
};

function clean(s) {
  return typeof s === 'string' ? s.replace(/\s+/g, ' ').trim() : '';
}

export function status(row) {
  return clean(row?.open_today) ? 'open' : 'closed';
}

export function lifts(data, skip = () => false) {
  const ls = {};
  for (const row of data?.lifts ?? []) {
    const name = clean(row?.name);
    if (name && !skip(name)) {
      ls[name] = status(row);
    }
  }
  return ls;
}

export function trails(data) {
  return (data?.slopes ?? []).flatMap(row => {
    const name = clean(row?.name);
    if (!name) {
      return [];
    }
    const grade = clean(row?.difficulty?.name) || undefined;
    return [{ name, status: status(row), level: LEVELS[grade?.toLowerCase()], grade }];
  });
}
