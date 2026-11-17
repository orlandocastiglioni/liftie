import trails from '../trails/index.js';

// 2026-11-17 capture: Lumiplan still lists all 30 runs open, with all 8 lifts
// closed. With no lift open, every run publishes closed.
trails(
  'corralco',
  [
    { name: 'Bandurrias', status: 'closed', level: 'green' },
    { name: 'Cachañas Este', status: 'closed', level: 'green' },
    { name: 'Cachañas Oeste', status: 'closed', level: 'green' },
    { name: 'Canaleta', status: 'closed', level: 'green' },
    { name: 'Chucao', status: 'closed', level: 'green' },
    { name: 'Escuelita Este Niños', status: 'closed', level: 'green' },
    { name: 'Escuelita Oeste Adultos', status: 'closed', level: 'green' },
    { name: 'Liebre Este', status: 'closed', level: 'green' },
    { name: 'Liebre Oeste', status: 'closed', level: 'green' },
    { name: 'Nueva Bandurrias', status: 'closed', level: 'green' },
    { name: 'Pudúes', status: 'closed', level: 'green' },
    { name: 'Aguilucho Alto', status: 'closed', level: 'blue' },
    { name: 'Aguilucho Bajo', status: 'closed', level: 'blue' },
    { name: 'Carpinteros', status: 'closed', level: 'blue' },
    { name: 'Chichimoyes', status: 'closed', level: 'blue' },
    { name: 'Mirador Navidad', status: 'closed', level: 'blue' },
    { name: 'Tunducos Este', status: 'closed', level: 'blue' },
    { name: 'Tunducos Oeste', status: 'closed', level: 'blue' },
    { name: 'Zorros Bajos', status: 'closed', level: 'blue' },
    { name: 'Águilas', status: 'closed', level: 'black' },
    { name: 'Chingues', status: 'closed', level: 'black' },
    { name: 'Guiñas Alto', status: 'closed', level: 'black' },
    { name: 'Zorritos', status: 'closed', level: 'black' },
    { name: 'Zorros', status: 'closed', level: 'black' },
    { name: 'Cóndor Este', status: 'closed', level: 'doubleBlack' },
    { name: 'Cóndor Oeste', status: 'closed', level: 'doubleBlack' },
    { name: 'Coruros', status: 'closed', level: 'doubleBlack' },
    { name: 'Pumas Este', status: 'closed', level: 'doubleBlack' },
    { name: 'Pumas Oeste', status: 'closed', level: 'doubleBlack' },
    { name: 'Pumitas', status: 'closed', level: 'doubleBlack' }
  ],
  { example: 'corralco-no-lift' }
);
