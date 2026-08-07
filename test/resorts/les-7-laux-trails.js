import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { parseHtml } from '../../lib/lifts/parser.js';
import parse from '../../lib/resorts/les-7-laux/trails.js';
import collect from '../../lib/trails/parse.js';
import trails from '../trails/index.js';

/*
 * All 69 non-lift rows of the 2026-03-05 bulletin in page order - 53 alpine and
 * park runs, the 5 Beldina nordic tracks, the Voie Blanche, 7 freeski
 * itineraries, 2 itineraires ludiques and the Wiz luge.
 *
 * What this pins down:
 * - `grade` is the resort's own French word and `level` the local four tier
 *   reading, rouge -> black and noire -> doubleBlack. Without it the 19 rouges
 *   would publish with no level at all, since normalizeLevel has no red tier.
 * - 'Vallons du Pra' is status P, "En prevision d'ouverture" -> scheduled. The
 *   fourth code, HP (Hors periode), is mapped to closed rather than left for
 *   coerce, which does not know it and would call it scheduled.
 * - the three snowpark lines take terrainPark and keep their colour on grade;
 *   the Boardercross publishes no colour and so gets neither field.
 * - "Pre de l'arc (5 km)" and the other apostrophe names survive intact,
 *   because the name comes from .prl_name .text and never from the row's
 *   broken title attribute.
 */
trails('les-7-laux', [
  { 'name': 'Wiz luge (Pleynet)', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Domaine nordique de Beldina - Prapoutel', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Myrtillette (2.2 km)', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'La carabistouille (4.3 km)', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': "Pré de l'arc (5 km)", 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Beldina (6 km)', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Combe de Bédina', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Faucons', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Lagopède', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Le Pas du Chien', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Noisette', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Plagnes', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Variante', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Parcours de la taupe', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': "Parcours de l'écureuil", 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Blanchons', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Chanterelle Pipay', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Marcassins', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Charbonnière', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'La Biche', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Mataru inférieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Mataru supérieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Balcon', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Chanterelle Pleynet verte', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Oursons', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Coulemelle inférieure', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Coulemelle supérieure', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Crêt Granier', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Oursière', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Plan du Pra inférieure', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Rosée des prés', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Chanterelle Pleynet rouge', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Oursière inférieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Oursière supérieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Plan du Pra supérieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Roche noire', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': "L'évêque", 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Plan du Pra', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Vallons du Pra', 'status': 'scheduled', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Chanterelle Prapoutel', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': "P'tits Loups", 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Plan', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Souchette inférieure', 'status': 'open', 'level': 'green', 'grade': 'verte' },
  { 'name': 'Cabris', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Cèpe', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Girolle inférieure', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Russule', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Souchette supérieure', 'status': 'open', 'level': 'blue', 'grade': 'bleue' },
  { 'name': 'Ardoisière', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Armillaire inférieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Armillaire supérieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Bolet', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Chamois inférieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Chamois Supérieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Clapierre inférieure', 'status': 'closed', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Clapierre supérieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Girolle supérieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Jas du lièvre', 'status': 'closed', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Lac', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Pouta inférieure', 'status': 'open', 'level': 'black', 'grade': 'rouge' },
  { 'name': 'Bédina', 'status': 'open', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Jasse', 'status': 'open', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Pouta supérieure', 'status': 'open', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Rhodos', 'status': 'closed', 'level': 'doubleBlack', 'grade': 'noire' },
  { 'name': 'Ligne Snowpark Verte', 'status': 'open', 'level': 'terrainPark', 'grade': 'verte' },
  { 'name': 'Ligne Snowpark Bleue', 'status': 'open', 'level': 'terrainPark', 'grade': 'bleue' },
  { 'name': 'Ligne Snowpark Rouge', 'status': 'open', 'level': 'terrainPark', 'grade': 'rouge' },
  { 'name': 'Boardercross', 'status': 'open' },
  { 'name': 'Voie Blanche (3.5 km)', 'status': 'open', 'level': 'blue', 'grade': 'bleue' }
]);

test('les-7-laux trails reportedAt', (_t, done) => {
  const html = readFileSync(resolve(import.meta.dirname, 'example/les-7-laux.html'), 'utf8');
  parseHtml(
    html,
    dom => collect(dom, parse),
    (err, list) => {
      assert.ifError(err);
      // 'Mise a jour le 05/03/2026 a 17:07', Europe/Paris wall clock (CET)
      assert.equal(list.reportedAt, '2026-03-05T16:07:00.000Z');
      // non-enumerable, so it is not counted as a seventieth row
      assert.equal(list.length, 69);
      done();
    }
  );
});
