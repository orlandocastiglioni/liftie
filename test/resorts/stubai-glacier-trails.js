import trails from '../trails/index.js';

// Same 2026-10-27 feed capture as stubai-glacier.js: 29 graded pistes and 7
// ski routes from `slopes`, in feed order. Austrian blue / red / black rides
// along as `grade`; the level is shifted one step down (red -> black,
// black -> doubleBlack). Ski routes carry grade 'skiroute' and no level.
trails(
  'stubai-glacier',
  [
    { name: '5 Eisjoch', status: 'open', level: 'blue', grade: 'blue' },
    { name: '4 Schaufelschuss', status: 'open', level: 'blue', grade: 'blue' },
    { name: '2 Steilhang', status: 'open', level: 'black', grade: 'red' },
    { name: '19 Obere Silberschneid', status: 'closed', level: 'black', grade: 'red' },
    { name: '22 Gamsgarten', status: 'closed', level: 'black', grade: 'red' },
    { name: '17 Zufahrt Fernau', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '21 Falwesuna', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '12 Gaiskarferner', status: 'closed', level: 'black', grade: 'red' },
    { name: '13 Sonnenhang', status: 'closed', level: 'black', grade: 'red' },
    { name: '10 Windachferner Nord', status: 'closed', level: 'black', grade: 'red' },
    { name: '7 Daunferner', status: 'open', level: 'blue', grade: 'blue' },
    { name: '6 Skiweg Eisgrat', status: 'open', level: 'blue', grade: 'blue' },
    { name: '14 Fernauferner', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '16 Pfaffenschneid', status: 'closed', level: 'black', grade: 'red' },
    { name: '23 Big Family Schuss', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '26 Daunfernerschuss', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '9 Kogelferner', status: 'closed', level: 'black', grade: 'red' },
    { name: '40 Fernau Mauer', status: 'closed', grade: 'skiroute' },
    { name: '35 Wilde Grube', status: 'closed', grade: 'skiroute' },
    { name: '37 Steile Zunge', status: 'closed', grade: 'skiroute' },
    { name: '39 Kanonenrohr', status: 'closed', grade: 'skiroute' },
    { name: '27 Daunhill', status: 'closed', level: 'doubleBlack', grade: 'black' },
    { name: '24 Skiweg Murmele', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '28 Skiweg Mutterberg', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '34 Fernau', status: 'closed', grade: 'skiroute' },
    { name: '15 Fernauschuss', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '36 Schartenschuss', status: 'closed', grade: 'skiroute' },
    { name: '3 Seeschuss', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '38 Bildstöckljoch', status: 'closed', grade: 'skiroute' },
    { name: '1 Seeblick', status: 'open', level: 'blue', grade: 'blue' },
    { name: '11 Windachferner Süd', status: 'closed', level: 'black', grade: 'red' },
    { name: '18 Bödele Schuss', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '20 Untere Silberschneid', status: 'closed', level: 'black', grade: 'red' },
    { name: '25 Süd-Ost Tangente', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '8 Daunenhang', status: 'closed', level: 'blue', grade: 'blue' },
    { name: '29 Rotadl', status: 'open', level: 'black', grade: 'red' }
  ],
  { ext: 'json' }
);
