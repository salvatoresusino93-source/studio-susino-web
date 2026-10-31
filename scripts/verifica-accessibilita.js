#!/usr/bin/env node
/**
 * Controllo automatico di accessibilità con axe-core (Deque, MPL 2.0) su tutte
 * le pagine del sito, aperte con Playwright come su uno smartphone (390 px).
 *
 * Regole: WCAG 2.0/2.1 livello A e AA + buone pratiche axe. Qualsiasi
 * violazione fa fallire il controllo: su un sito per pazienti anziani, un
 * contrasto basso o un link indistinguibile sono difetti veri, non dettagli.
 *
 * Uso:  node scripts/verifica-accessibilita.js [pagina.html ...]
 *       (senza argomenti controlla tutte le pagine .html indicizzabili)
 * Serve un server locale sulla porta 8099 (python3 -m http.server 8099), se non
 * c'è lo avvia da solo. Dipendenze: npm ci (playwright + axe-core).
 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const PORT = 8099;
const BASE = `http://localhost:${PORT}/`;

async function serverAttivo() {
  try {
    const r = await fetch(BASE + 'robots.txt');
    return r.ok;
  } catch {
    return false;
  }
}

async function main() {
  const pagine = process.argv.length > 2
    ? process.argv.slice(2)
    : fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();

  let server = null;
  if (!(await serverAttivo())) {
    server = spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
    for (let i = 0; i < 50 && !(await serverAttivo()); i++) await new Promise((r) => setTimeout(r, 100));
  }

  const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  // Niente script esterni (CDN, analytics): il controllo riguarda l'HTML e il CSS del sito.
  await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());

  let totale = 0;
  const righe = [];
  for (const f of pagine) {
    await page.goto(BASE + f, { waitUntil: 'load' });
    await page.addScriptTag({ content: axeSrc });
    const r = await page.evaluate(() =>
      axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] })
    );
    if (r.violations.length) {
      totale += r.violations.length;
      righe.push(`\n${f}`);
      for (const v of r.violations) {
        righe.push(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} elementi) -> ${v.nodes[0].target[0]}`);
        righe.push(`     ${v.helpUrl}`);
      }
    }
  }
  await browser.close();
  if (server) server.kill();

  if (totale) {
    console.error(`Accessibilità: ${totale} violazioni in ${righe.filter((r) => r.startsWith('\n')).length} pagine su ${pagine.length}.` + righe.join('\n'));
    process.exit(1);
  }
  console.log(`Accessibilità OK: ${pagine.length} pagine, nessuna violazione axe (WCAG 2.1 A/AA + buone pratiche).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
