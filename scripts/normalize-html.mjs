#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html'));

for (const name of htmlFiles) {
  const file = path.join(root, name);
  let html = fs.readFileSync(file, 'utf8');
  const isEnglish = /<html\s+lang="en"/i.test(html);
  const skipText = isEnglish ? 'Skip to main content' : 'Salta al contenuto principale';

  html = html.split('\n').filter((line) => !/fonts\.(?:googleapis|gstatic)\.com/i.test(line)).join('\n');

  if (!/class="skip-link"/i.test(html)) {
    html = html.replace(/<body>/i, '<body>\n  <a class="skip-link" href="#main-content">' + skipText + '</a>');
  }

  html = html.replace(/<main(?:\s+id="exam-main")?>/i, '<main id="main-content">');
  html = html.replace(/<button class="menu-toggle"([^>]*)>/gi, (_match, attributes) => {
    const clean = attributes.replace(/\s+aria-expanded="[^"]*"/gi, '').replace(/\s+aria-controls="[^"]*"/gi, '');
    return '<button class="menu-toggle"' + clean + ' aria-expanded="false" aria-controls="menu-mobile">';
  });
  html = html.replace(/<nav class="nav-mobile"([^>]*)>/gi, (_match, attributes) => {
    const clean = attributes.replace(/\s+id="[^"]*"/gi, '').replace(/\s+aria-hidden="[^"]*"/gi, '');
    return '<nav class="nav-mobile" id="menu-mobile"' + clean + ' aria-hidden="true">';
  });
  html = html.replace(/js\/main\.js\?v=[0-9A-Za-z]+/g, 'js/main.js?v=20260902');
  fs.writeFileSync(file, html, 'utf8');
}

console.log('Normalizzate ' + htmlFiles.length + ' pagine HTML.');
