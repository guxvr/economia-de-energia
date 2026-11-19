# Apresentação inicial — Grupo 7

Esta versão usa o relatório de 17/11/2026 fornecido por Gustavo. Druck poderá finalizar o conteúdo e o visual após o feedback da professora. Não representa aprovação dos cinco integrantes nem conclusão da T09.

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

Ao mudar dados, confira a fonte e atualize a tabela acessível, as notas e o PDF. Não use dados ilustrativos como resultados. As observações do relatório ainda estão sujeitas à revisão acadêmica do grupo.

## PDF

`apresentacao-inicial.pdf` é a fotografia da versão inicial. Para regenerar:

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

O workflow `.github/workflows/slides.yml` publica o conteúdo desta pasta após alterações em `main`, ou execução manual. Em Settings → Pages, selecione **GitHub Actions** como fonte. O endereço previsto é https://guxvr.github.io/economia-de-energia/. A existência do workflow local não significa que o site já está publicado. Consulte a [documentação GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Testar

```sh
npm ci
npx playwright install chromium
npm test
```

O teste abre a versão `file://`, exige ausência de recursos externos, verifica dados/controle por teclado, reprodução e pausa ao trocar de slide, filtros, tabela e gráfico completo de impressão. Aceita `BROWSER_EXECUTABLE` como a exportação.

`npm run vendor` atualiza a cópia do Reveal.js a partir da versão fixada no lockfile. A licença está em `vendor/reveal/LICENSE`.

## Pendências do Druck e do grupo

- Incorporar feedback da professora e revisar os recortes e os números com os autores de cada seção.
- Ajustar visual, divisão de falas e notas, ensaiando em até 30 minutos.
- Confirmar links, legibilidade no projetor e funcionamento das notas no equipamento da sala.
- Conferir PDF regenerado e cópia offline em outro computador.
- Publicar e conferir o endereço público; atualizar a issue #10 e seus critérios após verificação.

O [plano e a divisão das worktrees](../docs/plano-t09.md) registram a implementação e a revisão independente.
