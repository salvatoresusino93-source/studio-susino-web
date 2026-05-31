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
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36';

const JSON_HEADERS = {
  'User-Agent': UA,
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://radiopaedia.org/',
  'X-Requested-With': 'XMLHttpRequest',
};

const IMAGE_HEADERS = {
  'User-Agent': UA,
  Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
  Referer: 'https://radiopaedia.org/',
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchBuffer(url, headers = IMAGE_HEADERS) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers,
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(res.headers.location, headers).then(resolve).catch(reject);
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
  const buf = await fetchBuffer(url, JSON_HEADERS);
  return JSON.parse(buf.toString('utf8'));
}

function pickStackImageUrls(stacks, imageIndex = 0) {
  if (!Array.isArray(stacks)) return [];

  for (const stack of stacks) {
    const images = (stack.images || [])
      .filter(
        (img) =>
          img.content_type?.startsWith('image/') &&
          !/\.mp4(\?|$)/i.test(img.fullscreen_filename || img.public_filename || '')
      )
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

    if (!images.length) continue;

    const idx = Math.min(imageIndex ?? 0, images.length - 1);
    const img = images[idx];
    const urls = [img.fullscreen_filename, img.public_filename].filter(Boolean);
    if (urls.length) return [...new Set(urls)];
  }

  return [];
}

async function downloadStudyImage(entry) {
  const stacksUrl = `https://radiopaedia.org/studies/${entry.studyId}/stacks?lang=us`;
  const stacks = await fetchJson(stacksUrl);
  const imageUrls = pickStackImageUrls(stacks, entry.imageIndex ?? 0);

  if (!imageUrls.length) {
    throw new Error(`Nessuna immagine nello studio ${entry.studyId}`);
  }

  let lastError = null;
  for (const imageUrl of imageUrls) {
    try {
      const buf = await fetchBuffer(imageUrl);
      if (buf.length < 5000) {
        throw new Error(`Immagine troppo piccola (${buf.length} byte)`);
      }
      const destPath = path.join(DEST, entry.dest);
      fs.writeFileSync(destPath, buf);
      return { destPath, imageUrl, bytes: buf.length };
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError ?? new Error(`Download fallito per studio ${entry.studyId}`);
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
      await sleep(350);
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
