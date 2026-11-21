import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('workflow tenta novamente o deploy após falha na artefação', async () => {
  const workflow = await readFile('.github/workflows/slides.yml', 'utf8');

  assert.match(workflow, /continue-on-error:\s*true/);
  assert.match(workflow, /Aguardar disponibilização do artefato[\s\S]*?run:\s*sleep 15/);
  assert.match(workflow, /Publicar novamente[\s\S]*?uses:\s*actions\/deploy-pages@v4/);
});
