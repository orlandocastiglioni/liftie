import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import parse from '../../lib/resorts/stubai-glacier/index.js';
import lifts from '../lifts/index.js';

// winter.intermaps.com/stubaier_gletscher/data?lang=en, captured live
// 2026-10-27 (trimmed to lifts/slopes/routes/lastUpdate): the glacier's early
// season, twelve of 25 lifts turning. The SKI plus CITY network page this used
// to be read from dropped its tables on 2026-09-22; see index.js.
lifts('stubai-glacier', 'json', {
  'Gamsgarten I': 'open',
  'Gamsgarten II': 'open',
  'Schaufeljoch': 'open',
  'Eisjoch': 'open',
  'Fernau': 'closed',
  'Murmele': 'closed',
  'Pfaffengrat': 'closed',
  'Wildspitz': 'closed',
  'Schlepplift Fernau': 'closed',
  'Schlepplift Gaiskarferner': 'open',
  'Schlepplift Windachferner': 'closed',
  'Schlepplift Daunferner I': 'open',
  'Schlepplift Daunferner II': 'open',
  'Schlepplift Daunscharte': 'closed',
  'Übungslift Gamsgarten': 'closed',
  'Tellerlift Kitzlift': 'closed',
  'Zauberteppich 1': 'closed',
  'Schneekarussell': 'closed',
  'Rotadl': 'open',
  'Daunjoch': 'closed',
  'Snowpark-Lift': 'open',
  '3S Eisgratbahn I': 'open',
  '3S Eisgratbahn II': 'open',
  'Zauberteppich 3, 4': 'closed',
  'Zauberteppich Eisgrat': 'open'
});

test('stubai-glacier reportedAt', () => {
  const body = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/stubai-glacier.json'), 'utf8'));
  const ls = parse(body);
  // lastUpdate '2026-10-27T16:31:19' is Tirol wall clock, CET after the
  // 2026-10-25 switch
  assert.equal(ls.reportedAt, '2026-10-27T15:31:19.000Z');
  assert.equal(Object.keys(ls).length, 25, 'the stamp must not count as a lift');
});
