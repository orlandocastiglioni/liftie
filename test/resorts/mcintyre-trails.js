import trails from '../trails/index.js';

// 2025-12-17 capture: one trail per <br>
trails('mcintyre', [
  { name: 'Little Mac', status: 'open' },
  { name: 'Mighty Mac', status: 'open' },
  { name: 'The Quarry', status: 'open' },
  { name: "The Queen's Trail", status: 'open' },
  { name: "Don's Pass", status: 'open' },
  { name: 'The Ledge', status: 'open' },
  { name: "Gilman's Race Trail", status: 'open' }
]);

// 2025-02-10 capture: the whole list is one comma-separated line inside a
// <span>, so the <br> split falls back to splitting on commas
trails(
  'mcintyre',
  [
    { name: 'Little Mac', status: 'open' },
    { name: 'Mighty Mac', status: 'open' },
    { name: 'The Quarry', status: 'open' },
    { name: "The Queen's Trail", status: 'open' },
    { name: "Don's Pass", status: 'open' },
    { name: 'The Ledge', status: 'open' },
    { name: "Sandler's Trail", status: 'open' },
    { name: "Gilman's Trail", status: 'open' },
    { name: 'Exit 8', status: 'open' },
    { name: "Uncle Gus' Trail", status: 'open' },
    { name: 'Weston Trail', status: 'open' }
  ],
  { example: 'mcintyre-comma-list' }
);
