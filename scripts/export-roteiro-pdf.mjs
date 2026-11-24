import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const source = resolve('docs/roteiro-apresentacao.md');
const stylesheet = resolve('docs/roteiro-apresentacao.css');
const temporaryHtml = resolve('docs/.roteiro-apresentacao.html');
const output = resolve('roteiro-apresentacao.pdf');

execFileSync('pandoc', [
  source,
  '--standalone',
  '--section-divs',
  '--metadata', 'lang=pt-BR',
  '--css', stylesheet,
  '--output', temporaryHtml
], { stdio: 'inherit' });

const browser = await chromium.launch(
  process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}
);

try {
  const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });
  await page.goto(pathToFileURL(temporaryHtml).href, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: output, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('PDF salvo em roteiro-apresentacao.pdf');
} finally {
  await browser.close();
  rmSync(temporaryHtml, { force: true });
}
