(function () {
  const PRENOTA_BASE = 'https://referteco-production.up.railway.app/prenota';
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const esame = (window.ESAMI || []).find((e) => e.id === id);
  const main = document.getElementById('exam-main');

  if (!main) return;

  if (!esame) {
    main.innerHTML =
      '<div class="container content-block">' +
      '<h1>Esame non trovato</h1>' +
      '<p>Non abbiamo trovato la pagina di questo esame.</p>' +
      '<a class="btn btn-primary" href="ecografie.html">Torna agli esami</a>' +
      '</div>';
    document.title = 'Esame non trovato — Studio Susino';
    return;
  }

  const prenotaUrl =
    PRENOTA_BASE + '?esame=' + encodeURIComponent(esame.prenotaNome);

  document.title = esame.nome + ' — Studio Susino';
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = esame.descrizione.slice(0, 155) + '…';

  main.innerHTML =
    '<section class="page-hero">' +
    '<div class="container">' +
    '<p class="exam-breadcrumb"><a href="ecografie.html">Ecografie</a> · ' +
    esame.categoria +
    '</p>' +
    '<h1>' +
    esame.nome +
    '</h1>' +
    '</div></section>' +
    '<section class="content-block"><div class="container exam-detail">' +
    '<h2>A cosa serve</h2>' +
    '<p>' +
    esame.descrizione +
    '</p>' +
    (window.PREPARAZIONE_ESAMI && PREPARAZIONE_ESAMI.richiedePreparazione(esame.nome)
      ? '<h2>Preparazione</h2>' + PREPARAZIONE_ESAMI.htmlNota()
      : '') +
    '<div class="btn-stack exam-actions">' +
    '<a class="btn btn-primary" href="' +
    prenotaUrl +
    '" rel="noopener noreferrer">Prenota questo esame</a>' +
    '<a class="btn btn-outline" href="ecografie.html">Torna all\'elenco</a>' +
    '</div>' +
    '<p class="exam-note">Preferisci prenotare al telefono? ' +
    '<a href="tel:+390932954441">0932 954441</a> · ' +
    '<a href="tel:+393394028454">339 402 8454</a></p>' +
    '</div></section>';
})();
