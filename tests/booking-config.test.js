const test = require('node:test');
const assert = require('node:assert/strict');
const { BOOKING_ORIGIN, buildBookingUrl } = require('../js/booking-config.js');

const exams = [
  { prenotaNome: 'Ecografia addome completo' },
  { prenotaNome: 'Ecografia tiroide' },
];

test('usa esclusivamente origine HTTPS e percorso attesi', () => {
  const url = new URL(buildBookingUrl({ exams }));
  assert.equal(url.origin, BOOKING_ORIGIN);
  assert.equal(url.protocol, 'https:');
  assert.equal(url.pathname, '/prenota');
});

test('inoltra solo un esame presente nel catalogo locale', () => {
  const valid = new URL(buildBookingUrl({ exam: 'Ecografia tiroide', exams, language: 'it' }));
  const invalid = new URL(buildBookingUrl({ exam: '<img src=x onerror=alert(1)>', exams, language: 'it' }));
  assert.equal(valid.searchParams.get('esame'), 'Ecografia tiroide');
  assert.equal(invalid.searchParams.has('esame'), false);
});

test('accetta soltanto il valore lingua inglese previsto', () => {
  const english = new URL(buildBookingUrl({ exams, language: 'en' }));
  const unexpected = new URL(buildBookingUrl({ exams, language: 'fr' }));
  assert.equal(english.searchParams.get('lang'), 'en');
  assert.equal(unexpected.searchParams.has('lang'), false);
});

test('codifica correttamente il nome esame', () => {
  const url = buildBookingUrl({ exam: 'Ecografia addome completo', exams });
  assert.match(url, /esame=Ecografia\+addome\+completo/);
});
