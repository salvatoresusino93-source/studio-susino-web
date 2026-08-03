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

module.exports = { SLUG, GIA_ESISTENTI };
