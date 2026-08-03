import lifts from '../lifts/index.js';

// Off-season fixture (Wix /snowreport has no winter Wayback capture); all four
// lifts read Closed. Structure and status vocabulary are what matter here.
lifts('hudson-bay-mountain', 'html', {
  'Panorama T-Bar': 'closed',
  'Skyline Chair Lift': 'closed',
  'Prairie T-Bar': 'closed',
  'Carpet Lift': 'closed'
});
