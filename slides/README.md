# Apresentação final — Grupo 7

Esta versão foi conferida contra o artigo final e revisada pelos apresentadores. Como não houve novo retorno da professora, ela é a versão final vigente para a apresentação de 24/11/2026.

## Abrir e apresentar

Abra `index.html` diretamente no navegador: o roteiro, os dados, os gráficos e o Reveal.js estão incluídos nesta pasta. Para a cópia offline, copie **a pasta inteira `slides/`**. Os links externos exigem internet.

Para notas do apresentador, prefira servidor local, pois os navegadores restringem a comunicação entre janelas em `file://`:

```sh
npm ci
npm run serve
```

Acesse `http://127.0.0.1:4173`. Setas avançam/voltam; `Esc` abre visão geral; `F` alterna tela cheia; `S` abre notas. Dentro dos controles dos gráficos, as teclas operam o controle focado; use Tab para sair e voltar à navegação.

## Editar

- `content.js`: roteiro, textos, fontes, links e notas de cada slide.
- `styles.css`: identidade visual e impressão.
- `data/energy-data.js`: valores, fontes, páginas, unidades, abrangência e ressalvas dos gráficos.
- `charts.js` e `charts.css`: controles e gráficos SVG, inclusive versão para impressão.
- `app.js`: montagem e configuração Reveal.js.

Os gráficos temporais usam apenas 2016, 2021 e 2025, observados na Tabela 7; não interpolam anos ausentes. Valores negativos representam exportação líquida. A participação na OIE e a dependência externa são indicadores diferentes. A dependência do carvão na Tabela 7 tem recorte distinto do cálculo de 78,8% em base energética para carvão e coque; preserve as notas ao revisar.

Ao mudar dados, confira a fonte e atualize a tabela acessível, as notas e o PDF. Não use dados ilustrativos como resultados.

## PDF

`apresentacao-inicial.pdf` é o arquivo exportado da apresentação. Regere-o sempre que o conteúdo ou o visual for alterado:

```sh
npm ci
npx playwright install chromium
npm run export:pdf
```

Se o Chromium já estiver instalado em outro caminho, informe `BROWSER_EXECUTABLE` ao comando. No PowerShell, por exemplo:

```powershell
$env:BROWSER_EXECUTABLE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
npm run export:pdf
```

Também é possível abrir `index.html?print-pdf` em Chromium/Chrome/Edge e salvar como PDF com fundo habilitado e sem margens. Os gráficos de impressão incluem todos os anos e séries, mesmo que a tela esteja pausada ou filtrada. Veja a [documentação Reveal.js](https://revealjs.com/pdf-export/).

## Publicar

O workflow `.github/workflows/slides.yml` publica o conteúdo desta pasta após alterações em `main`, ou execução manual. A apresentação está disponível em https://guxvr.github.io/economia-de-energia/. Consulte a [documentação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Testar

```sh
npm ci
npx playwright install chromium
npm test
```

O teste abre a versão `file://`, exige ausência de recursos externos, verifica dados/controle por teclado, reprodução e pausa ao trocar de slide, filtros, tabela e gráfico completo de impressão. Aceita `BROWSER_EXECUTABLE` como a exportação.

`npm run vendor` atualiza a cópia do Reveal.js a partir da versão fixada no lockfile. A licença está em `vendor/reveal/LICENSE`.

## Verificações finais

- Levar a pasta `slides/` completa para uso offline.
- Na sala, confirmar a legibilidade no projetor e o funcionamento das notas; essa verificação só pode ser feita no equipamento da apresentação.

O roteiro, a divisão das falas e a preparação para perguntas estão em [`docs/roteiro-apresentacao.md`](../docs/roteiro-apresentacao.md). O ensaio cronometrado deve ser registrado nesse arquivo.

O [plano e a divisão das worktrees](../docs/plano-t09.md) registram a implementação e a revisão independente.
