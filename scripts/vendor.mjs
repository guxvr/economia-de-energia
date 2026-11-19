import { mkdir, copyFile, cp } from 'node:fs/promises';
const dest = new URL('../slides/vendor/reveal/', import.meta.url);
const src = new URL('../node_modules/reveal.js/', import.meta.url);
await mkdir(dest, { recursive: true });
for (const name of ['reveal.js', 'reveal.css', 'reset.css']) {
  await copyFile(new URL(`dist/${name}`, src), new URL(name, dest));
}
await copyFile(new URL('LICENSE', src), new URL('LICENSE', dest));
await cp(new URL('plugin/notes/', src), new URL('plugin/notes/', dest), { recursive: true });
console.log('Reveal.js e licença copiados para slides/vendor/reveal.');
