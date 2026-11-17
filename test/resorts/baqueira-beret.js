import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { liftStatus } from '../../lib/resorts/baqueira-beret/index.js';

// The four sector documents from www.baqueira.es/bb-content/headless/spotlio/<zone>
// (Baqueira, Beret, Baciver, Bonaigua) fetched 2026-11-17, pre-season: 1 of 38
// remontes and 1 piste (3 segments) open, matching the summary feed's own
// remontes 1/38 and the 143 pistas it totals.
const zones = JSON.parse(readFileSync(resolve(import.meta.dirname, 'example/baqueira-beret-zones.json'), 'utf8'));

test('baqueira-beret lifts from the sector feeds', () => {
  assert.deepEqual(liftStatus(zones), {
    'CT Bosque': 'closed',
    'CT Carreretes': 'closed',
    'CT Parc Infantil (Baqueira)': 'closed',
    'CT Pastors': 'closed',
    'CT Rabadà': 'closed',
    'TC Baqueira': 'closed',
    'TSD Bosque (Baqueira)': 'open',
    'TSD Bosque (Baqueira) 2': 'closed',
    'TSD Era Cabana': 'closed',
    'TSD Jorge Jordana': 'closed',
    'TSD Mirador': 'closed',
    'TSD Pla de Baqueira': 'closed',
    'TS Esquirós': 'closed',
    'CT Era Escaleta 1': 'closed',
    'CT Era Escaleta 2': 'closed',
    'CT Parc Infantil (Beret)': 'closed',
    'TCD Dossau': 'closed',
    'TQ Costarjàs': 'closed',
    'TQ Fernández Ochoa': 'closed',
    'TQ Pla de Beret': 'closed',
    'TSD Blanhiblar': 'closed',
    'TSD Clot der Os (Beret)': 'closed',
    'TSD Clot der Os (Beret) 2': 'closed',
    'TSD Dera Reina': 'closed',
    'TSD Dossau': 'closed',
    'TSD Jesús Serra': 'closed',
    'TQ Baciver': 'closed',
    'TQ Saumet': 'closed',
    'TCD Saboredo': 'closed',
    'TQ Tuc de la Llança 1': 'closed',
    'TQ Tuc de la Llança 2': 'closed',
    'TS Argulls': 'closed',
    'TS Cap del Port': 'closed',
    'TSD Bonaigua': 'closed',
    'TSD La Peülla': 'closed',
    'TS Manaud': 'closed',
    'TS Solei': 'closed',
    'TS Teso dera Mina': 'closed'
  });
});

test('baqueira-beret lift parser is async (fetches the sector feeds)', async () => {
  const { default: lifts } = await import('../../lib/resorts/baqueira-beret/index.js');
  assert.equal(lifts.length, 2);
});
