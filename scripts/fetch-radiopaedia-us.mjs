#!/usr/bin/env node
/**
 * Scarica schermate ecografiche da Radiopaedia.org per ogni esame.
 * Fonte: scripts/radiopaedia-manifest.json
 *
 * Uso: node scripts/fetch-radiopaedia-us.mjs
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DEST = path.join(ROOT, 'images', 'us-reali');
const MANIFEST = path.join(__dirname, 'radiopaedia-manifest.json');
const ATTRIBUTIONS = path.join(DEST, 'ATTRIBUTIONS.md');
const UA =
  'StudioSusinoBot/1.0 (https://studiosusino.it; contact salvatoresusino.md@gmail.com)';

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: { 'User-Agent': UA, Accept: '*/*' },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }
    );
    req.on('error', reject);
  });
}

async function fetchJson(url) {
  const buf = await fetchBuffer(url);
  return JSON.parse(buf.toString('utf8'));
}

function collectImageUrls(node, out = []) {
  if (typeof node === 'string') {
    if (node.includes('prod-images-static.radiopaedia.org')) out.push(node);
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((v) => collectImageUrls(v, out));
    return out;
  }
  if (node && typeof node === 'object') {
    Object.values(node).forEach((v) => collectImageUrls(v, out));
  }
  return out;
}

function scoreUrl(url) {
  if (/_thumb\.|_tiny\.|_small\./i.test(url)) return 0;
  if (/_big_gallery\./i.test(url)) return 100;
  if (/_gallery\./i.test(url)) return 85;
  if (/_medium\./i.test(url)) return 70;
  if (/_original\./i.test(url)) return 95;
  return 50;
}

function pickImageUrl(urls, imageIndex = 0) {
  const ranked = [...new Set(urls)]
    .map((u) => ({ u, s: scoreUrl(u) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  if (!ranked.length) return null;
  return ranked[Math.min(imageIndex, ranked.length - 1)].u;
}

async function downloadStudyImage(entry) {
  const api = `https://radiopaedia.org/studies/${entry.studyId}/annotated_viewer_json?lang=us`;
  const json = await fetchJson(api);
  const urls = collectImageUrls(json);
  const imageUrl = pickImageUrl(urls, entry.imageIndex ?? 0);
  if (!imageUrl) {
    throw new Error(`Nessuna immagine nello studio ${entry.studyId}`);
  }
  const buf = await fetchBuffer(imageUrl);
  if (buf.length < 5000) {
    throw new Error(`Immagine troppo piccola (${buf.length} byte)`);
  }
  const destPath = path.join(DEST, entry.dest);
  fs.writeFileSync(destPath, buf);
  return { destPath, imageUrl, bytes: buf.length };
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  fs.mkdirSync(DEST, { recursive: true });

  const lines = [
    '# Attribuzione immagini ecografiche (Radiopaedia.org)',
    '',
    'Le miniature in `images/esami/` derivano da casi didattici su [Radiopaedia.org](https://radiopaedia.org),',
    'licenza [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/).',
    '',
    'Per ogni caso: citazione autore, DOI e link al case study.',
    '',
    '| Esame | File sorgente | Citazione | DOI |',
    '|-------|---------------|-----------|-----|',
  ];

  let ok = 0;
  let fail = 0;

  for (const entry of manifest.sources) {
    process.stdout.write(`→ ${entry.dest} (studio ${entry.studyId})… `);
    try {
      const result = await downloadStudyImage(entry);
      console.log(`OK (${result.bytes} byte)`);
      lines.push(
        `| ${entry.exam} | \`${entry.dest}\` | ${entry.citation} | [${entry.doi}](https://doi.org/${entry.doi}) |`
      );
      ok += 1;
    } catch (err) {
      console.log(`FAIL — ${err.message}`);
      fail += 1;
    }
  }

  lines.push('');
  lines.push('Link ai case study:');
  lines.push('');
  for (const entry of manifest.sources) {
    lines.push(`- **${entry.exam}**: ${entry.caseUrl}`);
  }
  lines.push('');
  lines.push(
    '_Generato automaticamente da `scripts/fetch-radiopaedia-us.mjs`. ' +
      'Rigenerare con: `node scripts/fetch-radiopaedia-us.mjs`._'
  );

  fs.writeFileSync(ATTRIBUTIONS, lines.join('\n'));

  console.log('');
  console.log(`Completato: ${ok} OK, ${fail} errori`);
  console.log(`Attribuzioni: ${ATTRIBUTIONS}`);
  if (fail) {
    console.log('Alcuni download sono falliti — controlla connessione e rilancia.');
    process.exit(1);
  }
  console.log('Ora: bash scripts/build-esami-images.sh');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
