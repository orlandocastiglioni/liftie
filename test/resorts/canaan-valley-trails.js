import trails from '../trails/index.js';

// summer 2026-08-01 capture of https://www.canaanresort.com/trail-report:
// the site was rebuilt after 2026-03-14 and the new template strips all trail
// tbody rows out of season ('Trails are Closed for the Season', 'Trails Open: 0/0'),
// so an empty list is the correct summer result. No winter capture of the new
// template exists yet - replace this fixture with a populated snapshot early in
// the 2026-27 season to assert real rows.
trails('canaan-valley', []);
