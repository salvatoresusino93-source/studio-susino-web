#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ignoredDirectories = new Set(['.git', 'node_modules', 'RefertEco']);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const failures = [];
const noindexPages = new Set();
function fail(file, message) { failures.push(path.relative(root, file) + ': ' + message); }

function internalTargetExists(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return true;
  if (/^(?:https?:|mailto:|tel:|javascript:)/i.test(clean)) return true;
  const target = path.resolve(root, clean.replace(/^\//, ''));
  return target.startsWith(root + path.sep) && fs.existsSync(target);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (!/<html\s+[^>]*lang="(?:it|en)"/i.test(html)) fail(file, 'attributo lang assente o inatteso');
  if (!/<meta\s+name="viewport"/i.test(html)) fail(file, 'meta viewport assente');
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(file, 'title assente o vuoto');
  if (!/<main(?:\s|>)/i.test(html)) fail(file, 'landmark main assente');
  if (!/class="skip-link"/i.test(html)) fail(file, 'link salta al contenuto assente');
  if (!/class="menu-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="menu-mobile"/i.test(html)) fail(file, 'controlli ARIA menu incompleti');
  if (!/class="nav-mobile"[^>]*id="menu-mobile"/i.test(html)) fail(file, 'id menu mobile assente');
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(html)) fail(file, 'Google Fonts presente');
  if (/Text to be completed|Testo da completare|\[Qui inseriremo|\[The website privacy/i.test(html)) fail(file, 'segnaposto presente');
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) noindexPages.add(path.basename(file));

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    if (!internalTargetExists(match[1])) fail(file, 'risorsa interna mancante: ' + match[1]);
  }
  for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
    if (!/rel="[^"]*noopener/i.test(match[0])) fail(file, 'link _blank senza noopener');
  }
  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { fail(file, 'JSON-LD non valido: ' + error.message); }
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const page of noindexPages) if (sitemap.includes('/' + page + '</loc>')) fail(path.join(root, 'sitemap.xml'), 'pagina noindex inclusa: ' + page);

const sourceFiles = files.filter((file) => /\.(?:html|js|mjs|md|json|xml|txt)$/i.test(file));
const sourceText = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const bookingSourceText = files.filter((file) => /\.(?:html|js|mjs)$/i.test(file)).map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const literalBookingLinks = [...bookingSourceText.matchAll(/https:\/\/referteco-production\.up\.railway\.app\/prenota/g)].length;
const bookingConfig = fs.readFileSync(path.join(root, 'js', 'booking-config.js'), 'utf8');
const hasCanonicalConfig = /const BOOKING_ORIGIN = 'https:\/\/referteco-production\.up\.railway\.app';/.test(bookingConfig) && /const BOOKING_PATH = '\/prenota';/.test(bookingConfig);
if (literalBookingLinks !== 0 || !hasCanonicalConfig) failures.push('configurazione prenotazione non centralizzata (link letterali: ' + literalBookingLinks + ')');

for (const pattern of [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /AIza[0-9A-Za-z_-]{35}/, /(?:GOCSPX|ghp_|github_pat_)[0-9A-Za-z_-]{20,}/]) {
  if (pattern.test(sourceText)) failures.push('possibile segreto rilevato da ' + pattern);
}

if (failures.length) {
  console.error('Audit fallito: ' + failures.length + ' problema/i');
  failures.forEach((failure) => console.error('- ' + failure));
  process.exitCode = 1;
} else {
  console.log('Audit superato: ' + htmlFiles.length + ' pagine HTML e ' + files.length + ' file controllati.');
}
