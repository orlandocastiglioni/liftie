import { lifts } from '../../tools/alpinemedia.js';

// Alpine Media lifts board; see lib/tools/alpinemedia.js (token, errors, stale
// gate). The org header must be middlebury-snowbowl, not the embed host's
// ski-middlebury, which answers an empty board (see resort.json's
// `alpinemedia` note).
export default lifts;
