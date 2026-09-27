#!/usr/bin/env node
/**
 * Dati strutturati (JSON-LD) dello studio e del medico: MedicalClinic + Physician.
 * Un punto solo per indirizzo, telefoni, coordinate e orari, scritto in:
 * home, contatti e chi sono (IT ed EN). Le pagine esame puntano allo stesso
 * "@id" (https://studiosusino.it/#business), quindi Google li collega.
 *
 * Se cambiano indirizzo, telefoni o orari: modificarli QUI, nelle pagine
 * (testo visibile) e nella scheda Google Business, poi rilanciare:
 *   node scripts/dati-strutturati-studio.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://studiosusino.it';

const indirizzo = {
  '@type': 'PostalAddress',
  streetAddress: "Via dell'Arno, 34",
  postalCode: '97016',
  addressLocality: 'Pozzallo',
  addressRegion: 'RG',
  addressCountry: 'IT',
};
const geo = { '@type': 'GeoCoordinates', latitude: 36.7299582, longitude: 14.8483942 };
const telefoni = ['+39-0932-954441', '+39-351-3746102'];
const orari = [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '12:30' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '15:00', closes: '19:00' },
];
const mappa = 'https://www.google.com/maps/place/?q=place_id:ChIJkV7oUY2NERMRBRtfNdC-_Oo';

function grafo(isEN) {
  const servizi = isEN
    ? ['Abdominal ultrasound', 'Thyroid and neck ultrasound', 'Musculoskeletal ultrasound', 'Vascular Doppler ultrasound']
    : ["Ecografia dell'addome", 'Ecografia della tiroide e del collo', 'Ecografia muscolo-scheletrica', 'Ecocolordoppler vascolare'];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalClinic',
        '@id': BASE + '/#business',
        name: 'Studio Ecografico Dr. Salvatore Susino',
        description: isEN
          ? 'Private ultrasound practice in Pozzallo (RG), Italy, at Arcobaleno Dentisti. By appointment.'
          : 'Studio ecografico privato a Pozzallo (RG), presso Arcobaleno Dentisti. Su appuntamento.',
        url: BASE + '/',
        logo: BASE + '/images/logo-mark.png',
        image: BASE + '/images/hero-studio-v2.jpg',
        telephone: telefoni,
        email: 'salvatoresusino.md@gmail.com',
        address: indirizzo,
        geo,
        hasMap: mappa,
        openingHoursSpecification: orari,
        medicalSpecialty: 'Radiology',
        availableService: servizi.map((name) => ({ '@type': 'MedicalProcedure', name })),
        areaServed: ['Pozzallo', 'Modica', 'Ispica', 'Scicli', 'Ragusa'].map((name) => ({ '@type': 'City', name })),
        subOrganization: { '@id': BASE + '/#physician' },
        sameAs: [mappa],
        priceRange: '€€',
      },
      {
        '@type': 'Physician',
        '@id': BASE + '/#physician',
        name: 'Dott. Salvatore Susino',
        description: isEN ? 'Radiologist' : 'Medico radiologo',
        url: BASE + '/chi-sono.html',
        medicalSpecialty: 'Radiology',
        telephone: telefoni,
        address: indirizzo,
        geo,
        openingHoursSpecification: orari,
        parentOrganization: { '@id': BASE + '/#business' },
      },
    ],
  };
}

const INIZIO = '<script type="application/ld+json" id="ld-studio">';

function blocco(isEN) {
  const json = JSON.stringify(grafo(isEN), null, 2).replace(/\n/g, '\n  ');
  return `${INIZIO}\n  ${json}\n  </script>`;
}

/* Blocchi vecchi da sostituire: MedicalBusiness in home, Physician in chi sono */
const VECCHIO = /<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": (\["MedicalBusiness", "LocalBusiness"\]|"Physician")[\s\S]*?<\/script>/;

for (const nome of ['index', 'contatti', 'chi-sono']) {
  for (const isEN of [false, true]) {
    const file = path.join(ROOT, nome + (isEN ? '-en' : '') + '.html');
    let html = fs.readFileSync(file, 'utf8');
    if (html.includes(INIZIO)) {
      html = html.replace(/<script type="application\/ld\+json" id="ld-studio">[\s\S]*?<\/script>/, blocco(isEN));
    } else if (VECCHIO.test(html)) {
      html = html.replace(VECCHIO, blocco(isEN));
    } else {
      html = html.replace('</head>', '  ' + blocco(isEN) + '\n</head>');
    }
    fs.writeFileSync(file, html, 'utf8');
    console.log('JSON-LD studio: ' + path.basename(file));
  }
}
