(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.STUDIO_BOOKING = api;
})(typeof window !== 'undefined' ? window : null, function (root) {
  'use strict';

  const BOOKING_ORIGIN = 'https://referteco-production.up.railway.app';
  const BOOKING_PATH = '/prenota';

  function allowedExamNames(exams) {
    return new Set(
      (Array.isArray(exams) ? exams : [])
        .map((exam) => exam && exam.prenotaNome)
        .filter((name) => typeof name === 'string' && name.length > 0)
    );
  }

  function buildBookingUrl(options) {
    const opts = options || {};
    const url = new URL(BOOKING_PATH, BOOKING_ORIGIN);
    const names = allowedExamNames(opts.exams);
    if (typeof opts.exam === 'string' && names.has(opts.exam)) url.searchParams.set('esame', opts.exam);
    if (opts.language === 'en') url.searchParams.set('lang', 'en');
    return url.toString();
  }

  function configureBookingLinks(doc, locationSearch, exams) {
    if (!doc || typeof doc.querySelectorAll !== 'function') return;
    const params = new URLSearchParams(locationSearch || '');
    const language = doc.documentElement && doc.documentElement.lang === 'en' ? 'en' : 'it';
    const href = buildBookingUrl({ exam: params.get('esame'), language, exams });
    doc.querySelectorAll('[data-booking-link]').forEach(function (link) {
      link.setAttribute('href', href);
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('referrerpolicy', 'no-referrer');
    });
  }

  if (root && root.document) configureBookingLinks(root.document, root.location.search, root.ESAMI || []);

  return { BOOKING_ORIGIN, BOOKING_PATH, allowedExamNames, buildBookingUrl, configureBookingLinks };
});
