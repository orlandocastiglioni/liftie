import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import level from '../../lib/resorts/stoten/levels.js';
import parse from '../../lib/resorts/stoten/trails.js';
import trails from '../trails/index.js';

// Same live 2026-08-06 response as the lifts, all closed out of season: the
// complete published roster of 69 downhill runs, 8 cross-country loops and 9
// park/adventure features, less the one row (Vargys Äventyrsbana) the resort
// publishes under both the slope and the adventure tab.
//
// Difficulty is not in the feed - it is joined in by name from the resort's
// own table, see levels.js - and the eight multi-segment parents carry none
// because the site does not grade them either; their segments do.
trails(
  'stoten',
  [
    { name: 'Granis', status: 'closed', level: 'green' },
    { name: 'Vargen', status: 'closed', level: 'green' },
    { name: 'Mormors Störtlopp', status: 'closed' },
    { name: 'Mormors Störtlopp, övre', status: 'closed', level: 'green' },
    { name: 'Mormors Störtlopp, nedre', status: 'closed', level: 'green' },
    { name: 'Vargys Äventyrsbana', status: 'closed', level: 'green' },
    { name: 'Mommovägen', status: 'closed', level: 'green' },
    { name: 'Halkospåret', status: 'closed', level: 'blue' },
    { name: 'Halkotrikken', status: 'closed' },
    { name: 'Halkotrikken, övre', status: 'closed', level: 'blue' },
    { name: 'Halkotrikken, nedre', status: 'closed', level: 'blue' },
    { name: 'Mormorluvan', status: 'closed', level: 'green' },
    { name: 'Björnspåret', status: 'closed', level: 'green' },
    { name: 'Järvsvängen', status: 'closed', level: 'blue' },
    { name: 'Älvan', status: 'closed' },
    { name: 'Älvan övre', status: 'closed', level: 'doubleBlack' },
    { name: 'Älvan nedre', status: 'closed', level: 'doubleBlack' },
    { name: 'Pistoff', status: 'closed', level: 'black' },
    { name: 'Björnen', status: 'closed' },
    { name: 'Björnen, övre', status: 'closed', level: 'green' },
    { name: 'Björnen, mitten', status: 'closed', level: 'green' },
    { name: 'Björnen, nedre', status: 'closed', level: 'green' },
    { name: 'Losvängen', status: 'closed' },
    { name: 'Losvängen, övre', status: 'closed', level: 'blue' },
    { name: 'Losvängen, nedre', status: 'closed', level: 'black' },
    { name: 'Vargsvansen', status: 'closed', level: 'green' },
    { name: 'Gammelmormor', status: 'closed', level: 'green' },
    { name: 'Granbarret', status: 'closed', level: 'blue' },
    { name: 'Räven', status: 'closed', level: 'green' },
    { name: 'Haren', status: 'closed', level: 'blue' },
    { name: 'Skidvägen', status: 'closed', level: 'green' },
    { name: 'Familjebacken', status: 'closed', level: 'blue' },
    { name: 'Tomteluvan', status: 'closed', level: 'doubleBlack' },
    { name: 'Tomten', status: 'closed', level: 'black' },
    { name: 'Trollet', status: 'closed', level: 'black' },
    { name: 'Dvärgen (Stöten SnowPark)', status: 'closed', level: 'green' },
    { name: 'World Cup', status: 'closed' },
    { name: 'World Cup, övre', status: 'closed', level: 'doubleBlack' },
    { name: 'World Cup, mitten', status: 'closed', level: 'black' },
    { name: 'World Cup, nedre', status: 'closed', level: 'blue' },
    { name: 'Alven', status: 'closed', level: 'green' },
    { name: 'Vätten', status: 'closed', level: 'green' },
    { name: 'Parallellen', status: 'closed' },
    { name: 'Parallellen, övre', status: 'closed', level: 'doubleBlack' },
    { name: 'Parallellen, mitten', status: 'closed', level: 'blue' },
    { name: 'Parallellen, nedre', status: 'closed', level: 'green' },
    { name: 'Näcken', status: 'closed' },
    { name: 'Näcken, övre', status: 'closed', level: 'doubleBlack' },
    { name: 'Näcken, nedre', status: 'closed', level: 'black' },
    { name: 'Ranchvägen', status: 'closed', level: 'green' },
    { name: 'Solvägen', status: 'closed', level: 'green' },
    { name: 'Kronvägen', status: 'closed', level: 'green' },
    { name: 'Kronoparken', status: 'closed', level: 'green' },
    { name: 'Tunneln', status: 'closed', level: 'green' },
    { name: 'Harvägen', status: 'closed', level: 'green' },
    { name: 'Lovägen', status: 'closed', level: 'green' },
    { name: 'Genvägen', status: 'closed', level: 'green' },
    { name: 'Myrstigen', status: 'closed', level: 'green' },
    { name: 'Puderrännan', status: 'closed', level: 'black' },
    { name: 'Ravinen', status: 'closed', level: 'blue' },
    { name: 'Varulven', status: 'closed', level: 'doubleBlack' },
    { name: 'Pistvägen', status: 'closed', level: 'green' },
    { name: 'Lill-Haren', status: 'closed', level: 'green' },
    { name: 'Mullvaden', status: 'closed', level: 'blue' },
    { name: 'Nissen', status: 'closed', level: 'green' },
    { name: 'Älvdansen', status: 'closed', level: 'green' },
    { name: 'Harlorten', status: 'closed', level: 'blue' },
    { name: 'Bjärven', status: 'closed', level: 'green' },
    { name: 'Farfars fartvind', status: 'closed', level: 'blue' },
    { name: 'Östra Granfjällsturen', status: 'closed' },
    { name: 'Toppspåret', status: 'closed' },
    { name: 'Comborundan', status: 'closed' },
    { name: 'Slingersvansen', status: 'closed' },
    { name: 'Träningsspåret', status: 'closed' },
    { name: 'Pipsvängen', status: 'closed' },
    { name: 'Lysrundan (tänd till 23:00)', status: 'closed' },
    { name: 'Konstsnöspåret', status: 'closed' },
    { name: 'Jibb Arena', status: 'closed', level: 'terrainPark' },
    { name: 'Junior Park', status: 'closed', level: 'terrainPark' },
    { name: 'Pucklis', status: 'closed', level: 'terrainPark' },
    { name: 'Self-timer', status: 'closed', level: 'terrainPark' },
    { name: 'Side by side', status: 'closed', level: 'terrainPark' },
    { name: 'Speed Freak', status: 'closed', level: 'terrainPark' },
    { name: 'Stöten Cross', status: 'closed', level: 'terrainPark' },
    { name: 'Stöten Snowpark', status: 'closed', level: 'terrainPark' }
  ],
  { ext: 'json' }
);

test('stoten levels are the Swedish 4-tier scale, one grade down', () => {
  // Mycket lätt / Lätt / Medelsvår / Svår, mapped so the red tier does not
  // vanish and the four grades stay distinct
  assert.equal(level('Granis'), 'green');
  assert.equal(level('Halkospåret'), 'blue');
  assert.equal(level('Tomten'), 'black');
  assert.equal(level('Varulven'), 'doubleBlack');
  // a parent row the site does not grade, and a name the join does not know:
  // no level rather than a guess
  assert.equal(level('Mormors Störtlopp'), undefined);
  assert.equal(level('Nyheten 2027'), undefined);
});

test('stoten publishes every array of the report exactly once', () => {
  const data = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/stoten.json'), 'utf8'));
  const list = parse(data);
  assert.equal(list.length, data.Slopes.length + data.Tracks.length + data.Adventures.length - 1);
  assert.equal(new Set(list.map(t => t.name)).size, list.length);
  // the cross-country loops are ungraded, the park features are terrainPark
  assert.equal(list.filter(t => !t.level).length, 16);
  assert.equal(list.filter(t => t.level === 'terrainPark').length, 8);
});
