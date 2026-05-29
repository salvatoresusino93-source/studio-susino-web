(function (root) {
  // Stesse regole dell'agenda interna (checkPreparazione in app.js)
  const PREP_KEYWORDS = [
    'addome',
    'addominale',
    'epatica',
    'epato',
    'fegato',
    'colecisti',
    'colecistopatia',
    'biliare',
    'pancreas',
    'pancreatica',
    'pancreatico',
    'splenica',
    'milza',
    'renale',
    'rene',
    'reni',
    'urinario',
    'urinaria',
    'urinari',
    'vescic',
    'surrenal',
    'aorta',
    'portale',
    'portali',
    'mesenter',
    'anse intestinali',
    'retroperiton',
    'ceus',
    'arterie renali',
  ];

  const TESTO =
    'Venire a digiuno (almeno 6 ore, solo acqua permessa) e con vescica piena ' +
    '(non urinare nelle 2–3 ore prima dell\'esame).';

  function richiedePreparazione(nome) {
    const n = String(nome || '').toLowerCase();
    return PREP_KEYWORDS.some(function (k) {
      return n.includes(k);
    });
  }

  function htmlNota() {
    return (
      '<div class="exam-prep-note" role="note">' +
      '<strong>Preparazione:</strong> venire a <strong>digiuno</strong> e con ' +
      '<strong>vescica piena</strong> (non urinare nelle 2–3 ore prima).' +
      '</div>'
    );
  }

  root.PREPARAZIONE_ESAMI = {
    richiedePreparazione: richiedePreparazione,
    htmlNota: htmlNota,
    testo: TESTO,
  };
})(typeof window !== 'undefined' ? window : globalThis);
