/**
 * Mappa unica: id esame -> nome del file della sua pagina (senza .html).
 * La usano sia genera-pagine-esami.js sia generate-sitemap.js,
 * cosi' non possono andare fuori sincrono.
 */

/* Esami che hanno gia' una pagina scritta a mano: non vanno rigenerati,
   altrimenti due pagine competerebbero sulla stessa ricerca. */
const GIA_ESISTENTI = {
  tiroide: 'ecografia-tiroide',
  'muscolo-scheletrica': 'ecografia-muscolo-scheletrica',
  'doppler-tsa': 'ecocolordoppler-carotidi',
  'doppler-arti-inferiori': 'ecocolordoppler-arti-inferiori',
  'addome-completo': 'ecografia-addome',
};

const SLUG = {
  'addome-completo': 'ecografia-addome',
  'addome-superiore': 'ecografia-addome-superiore',
  'addome-inferiore': 'ecografia-addome-inferiore',
  'apparato-urinario': 'ecografia-apparato-urinario',
  renale: 'ecografia-renale',
  'vescico-prostatica': 'ecografia-vescico-prostatica',
  'scrotale-testicolare': 'ecografia-scrotale-testicolare',
  tiroide: 'ecografia-tiroide',
  collo: 'ecografia-collo',
  'muscolo-scheletrica': 'ecografia-muscolo-scheletrica',
  spalla: 'ecografia-spalla',
  ginocchio: 'ecografia-ginocchio',
  anca: 'ecografia-anca',
  'anca-neonatale': 'ecografia-anca-neonatale',
  gomito: 'ecografia-gomito',
  'polso-mano': 'ecografia-polso-mano',
  'caviglia-piede': 'ecografia-caviglia-piede',
  'parti-molli': 'ecografia-parti-molli',
  'doppler-tsa': 'ecocolordoppler-carotidi',
  'doppler-aorta': 'ecocolordoppler-aorta-addominale',
  'doppler-arterie-renali': 'ecocolordoppler-arterie-renali',
  'doppler-arti-inferiori': 'ecocolordoppler-arti-inferiori',
  'doppler-arti-superiori': 'ecocolordoppler-arti-superiori',
  linfonodi: 'ecografia-linfonodi',
};

/* Collegamenti "Esami correlati" fra categorie diverse (vanno in testa alla
   lista, prima degli esami della stessa categoria). Servono a non lasciare
   pagine isolate: ogni pagina esame deve ricevere link da almeno 3 altre.
   Per le pagine scritte a mano la lista e' completa (niente stessa categoria
   automatica): la usa scripts/correlati-pagine-manuali.js. */
const CORRELATI_EXTRA = {
  collo: ['tiroide', 'linfonodi'],
  linfonodi: ['collo', 'tiroide', 'parti-molli'],
  'parti-molli': ['linfonodi'],
  anca: ['anca-neonatale'],
  'anca-neonatale': ['anca', 'muscolo-scheletrica'],
  'addome-superiore': ['addome-completo', 'renale'],
  'addome-inferiore': ['addome-completo', 'apparato-urinario'],
  'apparato-urinario': ['addome-inferiore'],
  renale: ['doppler-arterie-renali'],
  'doppler-arterie-renali': ['renale'],
  'doppler-aorta': ['addome-completo'],
};

const CORRELATI_MANUALI = {
  tiroide: ['collo', 'linfonodi', 'doppler-tsa'],
  'addome-completo': ['addome-superiore', 'addome-inferiore', 'renale', 'apparato-urinario', 'doppler-aorta'],
  'muscolo-scheletrica': ['spalla', 'ginocchio', 'anca', 'gomito', 'polso-mano', 'caviglia-piede', 'parti-molli', 'anca-neonatale'],
  'doppler-tsa': ['doppler-arti-superiori', 'doppler-arti-inferiori', 'doppler-aorta', 'collo'],
  'doppler-arti-inferiori': ['doppler-arti-superiori', 'doppler-tsa', 'doppler-aorta', 'doppler-arterie-renali'],
};

module.exports = { SLUG, GIA_ESISTENTI, CORRELATI_EXTRA, CORRELATI_MANUALI };
