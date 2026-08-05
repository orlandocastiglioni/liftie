import trails from '../trails/index.js';

// mid-winter snapshot (2025-01-14): 12 rows in the "Currently Open Runs"
// pane. The "Currently Closed Runs" pane holds only the permanent
// "Check Back for Closed Runs" placeholder, which is filtered out, and the
// site publishes no difficulty anywhere, so no row carries a level.
trails('pine-mountain', [
  { name: 'Birch', status: 'open' },
  { name: 'Birch Access', status: 'open' },
  { name: 'Bunny Hill', status: 'open' },
  { name: 'Cut Across', status: 'open' },
  { name: 'Fallout', status: 'open' },
  { name: "Irvine's Revine", status: 'open' },
  { name: 'Middle Slope', status: 'open' },
  { name: 'Nirvana', status: 'open' },
  { name: 'Open Slope', status: 'open' },
  { name: 'Oak', status: 'open' },
  { name: 'Upper Oak', status: 'open' },
  { name: 'West Wall', status: 'open' }
]);

// 2024-03-01 snapshot: the open pane was emptied at season end
trails('pine-mountain', [], { example: 'pine-mountain-2024' });
