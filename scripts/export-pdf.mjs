import { chromium } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const browser = await chromium.launch(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {});
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(pathToFileURL(resolve('slides/index.html')).href + '?print-pdf', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.energyDeck?.isReady() && document.querySelector('.pdf-page'));
  await page.emulateMedia({ media: 'print', reducedMotion: 'reduce' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: 'slides/apresentacao-inicial.pdf', printBackground: true, preferCSSPageSize: true });
  console.log('PDF salvo em slides/apresentacao-inicial.pdf');
} finally { await browser.close(); }
