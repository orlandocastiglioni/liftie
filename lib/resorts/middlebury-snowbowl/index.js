import { lifts } from '../../tools/alpinemedia.js';

// Alpine Media lifts board; see lib/tools/alpinemedia.js (token, errors, stale
// gate). The X-Alpine-API-Token in resort.json is still blank (see its
// `alpinemedia` note): without it the service answers 401 and without the
// X-Alpine-Org header an empty board, so keep this resort out of
// LIFTIE_RESORTS until the key is filled in.
export default lifts;
