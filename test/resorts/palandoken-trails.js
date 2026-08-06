import trails from '../trails/index.js';

// live /api/pistes, 2026-08-06: all 36 pistes Closed (northern summer). Levels
// come from colorCode - blue / red / black with no green tier, translated to
// blue / black / doubleBlack so the ordering survives; the two park features
// are graded terrainPark instead.
trails(
  'palandoken',
  [
    {
      'name': 'EJDER [1A]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'KIZILGEÇİT [4A]',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'GEYİK KAYA [4D]',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'KUZEY [1B]',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'EĞERLİ [4B]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'KAPIKAYA [2]',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'ÇİFTE SİVRİ [5B]',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'YUSUFUN DERE [14]',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'ŞANLI ASKER [4E]',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'DADAŞ [4C]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'KIRKGÖZE',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'VİRANŞEHİR [3]',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'KARDELEN [7A]',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'BOZ YOKUŞ [7B]',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'VADİ [9]',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'DEREBOĞAZI [13A]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'MURAT DEDEMAN [6A]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'BORAN [8]',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'VİLAYETLER [13D]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'VİLAYETLER [13B]',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'VİLAYETLER [13C]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'GELİNCİK [6B]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'KIRKDEĞİRMEN [12B]',
      'status': 'closed',
      'level': 'blue'
    },
    {
      'name': 'ÇARIK YIRTAN',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': 'SNOWPARK [SLOPESTYLE]',
      'status': 'closed',
      'level': 'terrainPark'
    },
    {
      'name': 'FIRTINA [11]',
      'status': 'closed',
      'level': 'black'
    },
    {
      'name': '3A',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': '3B',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': '5A',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': '5C',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': '15A',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': '15B',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'HALFPİPE',
      'status': 'closed',
      'level': 'terrainPark'
    },
    {
      'name': 'MUGOLS',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'BAĞLANTI YOLU',
      'status': 'closed',
      'level': 'doubleBlack'
    },
    {
      'name': 'SPEED SLOPE',
      'status': 'closed',
      'level': 'doubleBlack'
    }
  ],
  { ext: 'json', example: 'palandoken-pistes' }
);
