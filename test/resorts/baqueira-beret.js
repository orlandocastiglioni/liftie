import lifts from '../lifts/index.js';

// Wayback capture from 2026-01-09, midwinter: 12 of 13 remontes open. That
// season the site served the per-sector tabbed layout, so /estado-pistas held
// the Baqueira sector alone.
lifts('baqueira-beret', 'html', {
  'CT Baqueira': 'open',
  'CT Bosque': 'open',
  'CT Carreretes 1': 'open',
  'CT Carreretes 2': 'open',
  'CT Parc Infantil': 'open',
  'TC Baqueira': 'open',
  'TQ Rabada': 'open',
  'TS Esquirós': 'open',
  'TSD Bosque': 'open',
  'TSD Era Cabana': 'open',
  'TSD Jorge Jordana': 'open',
  'TSD Mirador': 'closed',
  'TSD Pla de Baqueira': 'open'
});

// The layout the site serves today: all four sectors in one document, 36 lifts.
// Locks in the repeated-#remontes-section selector and the sector qualifier on
// 'CT Parc Infantil', which names a magic carpet in both Baqueira and Beret.
lifts(
  'baqueira-beret',
  'html',
  {
    'CT Baqueira': 'closed',
    'CT Bosque': 'closed',
    'CT Carreretes 1': 'closed',
    'CT Carreretes 2': 'closed',
    'CT Parc Infantil (Baqueira)': 'closed',
    'TC Baqueira': 'closed',
    'TQ Rabada': 'closed',
    'TS Esquirós': 'closed',
    'TSD Bosque': 'open',
    'TSD Era Cabana': 'closed',
    'TSD Jorge Jordana': 'closed',
    'TSD Mirador': 'closed',
    'TSD Pla de Baqueira': 'closed',
    'CT Beret': 'closed',
    'CT Parc Infantil (Beret)': 'closed',
    'TCD Dossau': 'closed',
    'TQ Costarjàs': 'closed',
    'TQ Fernández Ochoa': 'closed',
    'TQ Pla de Beret': 'closed',
    'TSD Blanhiblar': 'closed',
    'TSD Clot der Os': 'open',
    'TSD Dera Reina': 'closed',
    'TSD Dossau': 'closed',
    'TSD Jesús Serra': 'closed',
    'TCD Cap del Port': 'closed',
    'TQ Tuc de la Llança 1': 'closed',
    'TQ Tuc de la Llança 2': 'closed',
    'TS Argulls': 'closed',
    'TS Cap del Port': 'closed',
    'TS Manaud': 'closed',
    'TS Solei': 'closed',
    'TS Teso dera Mina': 'closed',
    'TSD Bonaigua': 'closed',
    'TSD La Peülla': 'closed',
    'TQ Baciver': 'closed',
    'TQ Saumet': 'closed'
  },
  { example: 'baqueira-beret-all-sectors' }
);
