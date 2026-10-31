#!/usr/bin/env node
/**
 * Genera le versioni WebP responsive delle foto del sito con sharp (Apache 2.0).
 *
 * Per ogni JPEG elencato in FOTO produce, accanto all'originale (che resta come
 * ripiego per i browser vecchi), un file .webp alla dimensione nativa e uno per
 * ogni larghezza ridotta richiesta, senza mai ingrandire. Qualita' 80.
 * Nelle pagine si usano con <picture>: vedi index.html (schede servizi) e le
 * pagine esame scritte a mano (figura in testa).
 *
 * Uso:  node scripts/ottimizza-immagini.js        (serve: npm ci)
 * Dopo aver aggiunto una foto: aggiungerla a FOTO, rilanciare, usare <picture>.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const QUALITA = 80;

// file -> larghezze ridotte da generare (oltre alla nativa)
const FOTO = {
  'images/servizi/addome.jpg': [360],
  'images/servizi/tiroide.jpg': [360],
  'images/servizi/muscolo-scheletrico.jpg': [360],
  'images/servizi/doppler.jpg': [360],
  'images/esame-addome.jpg': [400],
  'images/esame-tiroide.jpg': [400],
  'images/esame-muscolo-scheletrica.jpg': [400],
  'images/esame-carotidi.jpg': [400],
  'images/esame-arti-inferiori.jpg': [400],
};

async function main() {
  for (const [file, larghezze] of Object.entries(FOTO)) {
    const src = path.join(ROOT, file);
    const meta = await sharp(src).metadata();
    const base = src.replace(/\.jpe?g$/i, '');
    const righe = [];
    const out = base + '.webp';
    await sharp(src).webp({ quality: QUALITA }).toFile(out);
    righe.push(`${meta.width}w ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
    for (const w of larghezze) {
      if (w >= meta.width) continue;
      const outW = `${base}-${w}.webp`;
      await sharp(src).resize({ width: w }).webp({ quality: QUALITA }).toFile(outW);
      righe.push(`${w}w ${(fs.statSync(outW).size / 1024).toFixed(0)} KB`);
    }
    console.log(`${file} (${(fs.statSync(src).size / 1024).toFixed(0)} KB) -> ${righe.join(', ')}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
