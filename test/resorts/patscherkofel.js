import lifts from '../lifts/index.js';

// wayback snapshot 20251211030908 of the SKI plus CITY area page, mid-season:
// the header reads "open lifts 4 / 7" and the table agrees
lifts('patscherkofel', 'html', {
  'A Patscherkofelbahn Sektion II': 'open',
  'A Patscherkofelbahn Sektion I': 'open',
  'B Übungslift Patscherkofel': 'closed',
  'F Übungslift Igls': 'closed',
  'C Heiligwasserlift': 'open',
  'D Zauberteppich': 'open',
  'E Kinderlift': 'closed'
});
