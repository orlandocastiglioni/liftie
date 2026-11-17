import { gatedTrails } from '../../tools/alpinemedia.js';
import resort from './resort.json' with { type: 'json' };

// Alpine Media trails board, gated on the lifts; see lib/tools/alpinemedia.js.
export default gatedTrails(resort);
