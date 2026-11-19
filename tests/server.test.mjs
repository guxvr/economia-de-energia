import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

test('servidor entrega slides e diferencia arquivo ausente', async t => {
  const child = spawn(process.execPath, ['scripts/serve.mjs'], { env: { ...process.env, PORT: '4174' }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  t.after(() => child.kill());
  await Promise.race([
    once(child.stdout, 'data'),
    once(child, 'exit').then(([code]) => { throw new Error(`Servidor saiu: ${code}`); })
  ]);
  const index = await fetch('http://127.0.0.1:4174/');
  assert.equal(index.status, 200);
  assert.match(index.headers.get('content-type'), /text\/html/);
  assert.match(await index.text(), /lang="pt-BR"/);
  assert.equal((await fetch('http://127.0.0.1:4174/arquivo-inexistente.js')).status, 404);
  assert.equal((await fetch('http://127.0.0.1:4174/%2e%2e%2fpackage.json')).status, 403);
});
