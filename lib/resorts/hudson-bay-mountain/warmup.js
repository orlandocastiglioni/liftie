import select from '../../select.js';
import { allText } from '../../tools/domutil.js';

// The Wix snow-report page server-renders every report field as one JSON blob
// in <script type="application/json" id="wix-warmup-data">. Content collections
// live under appsWarmupData.dataBinding.dataStore.recordsByCollectionId, keyed
// by collection id (HBMLiftStatus for lifts, TerrainParkTTT for the trail/park
// items); each collection is an object of { recordId: record }.
export default function records(dom, collection) {
  const script = select(dom, 'script#wix-warmup-data')[0];
  if (!script) {
    return [];
  }
  const data = JSON.parse(allText(script) || '{}');
  const store = data?.appsWarmupData?.dataBinding?.dataStore?.recordsByCollectionId ?? {};
  return Object.values(store[collection] ?? {});
}
