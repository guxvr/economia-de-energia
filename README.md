# Economia de Energia

Projeto acadêmico sobre a economia dos combustíveis fósseis, desenvolvido para a disciplina de Economia de Energia. O trabalho compara petróleo, gás natural e carvão mineral no Brasil e no mundo, relacionando dados setoriais a conceitos econômicos.

## Objetivo

Produzir um artigo técnico e uma apresentação que analisem:

- oferta, demanda, custos e formação de preços;
- cadeias produtivas, comércio e estruturas de mercado;
- segurança energética, externalidades e transição energética;
- diferenças e relações entre o contexto brasileiro e o mundial.

## Entregas e requisitos

| Entrega | Requisitos principais |
| --- | --- |
| Artigo | Português, LaTeX, padrão IEEE e 17–22 páginas no PDF final |
| Análise | Petróleo, gás natural e carvão mineral, com dados do Brasil e do mundo |
| Evidências | Fontes verificáveis, preferencialmente primárias, com ano, unidade e abrangência identificados |
| Apresentação | 24/11/2026, com participação do grupo e duração máxima de 30 minutos |
| Versão final | PDF revisado e versão física preparada para a entrega |

## Bibliografia e redação

A [relação de referências](docs/referencias.md) reúne os 12 arquivos (10 publicações), o conteúdo de cada documento, a divisão da pesquisa entre os integrantes e as orientações para citar os dados. Os arquivos estão em [`Trabalho/Trabalho/`](Trabalho/Trabalho/).

- [Anuário Mineral Brasileiro Interativo — ANM (Power BI)](https://app.powerbi.com/view?r=eyJrIjoiODIyOWJlMTgtZTBlNi00ODFhLWJiOGEtYzlmOWM3MjhmMWQ4IiwidCI6ImEzMDgzZTIxLTc0OWItNDUzNC05YWZhLTU0Y2MzMTg4OTdiOCJ9).
- [Projeto do artigo no Overleaf](https://www.overleaf.com/project/6af8b6f2e99d9136ba422eeb/share#c5ef527f53bf21e2605ec48fbc48131520d46d52940df7c9).

## Planejamento

O [GitHub Project — Cronograma do Grupo 7](https://github.com/users/guxvr/projects/2) reúne as 12 issues, seus responsáveis, datas de início e entrega e o marco final de 24/11/2026. O [cronograma em CSV](docs/cronograma.csv) registra os períodos da imagem de planejamento. As datas são metas internas, com apresentação e entrega oficial em 24/11.

O acompanhamento central é feito na [issue #9 — T12: Plano geral](https://github.com/guxvr/economia-de-energia/issues/9). Ela funciona como issue guarda-chuva e só deve ser encerrada depois que todas as outras tarefas do trabalho estiverem concluídas.

| Tarefa | Atividade | Responsável | Prazo | Issue |
| --- | --- | --- | --- | --- |
| T01 | Estruturar artigo em LaTeX/IEEE e definir recorte, objetivos e indicadores comuns | Matheus | 16/11/2026 | [#1](https://github.com/guxvr/economia-de-energia/issues/1) |
| T02 | Redigir introdução, justificativa e metodologia | Gadelha | 18/11/2026 | [#2](https://github.com/guxvr/economia-de-energia/issues/2) |
| T03 | Analisar a economia do petróleo | Gustavo | 19/11/2026 | [#3](https://github.com/guxvr/economia-de-energia/issues/3) |
| T04 | Analisar a economia do gás natural | Heitor | 19/11/2026 | [#4](https://github.com/guxvr/economia-de-energia/issues/4) |
| T05 | Analisar a economia do carvão mineral | Pedro | 19/11/2026 | [#5](https://github.com/guxvr/economia-de-energia/issues/5) |
| T06 | Elaborar discussão econômica comparativa | Gadelha, com apoio de T03–T05 | 21/11/2026 | [#6](https://github.com/guxvr/economia-de-energia/issues/6) |
| T07 | Redigir conclusão e integrar seções no artigo | Matheus | 21/11/2026 | [#7](https://github.com/guxvr/economia-de-energia/issues/7) |
| T08 | Revisar conteúdo, referências, figuras e formatação | Todos; Matheus consolida | 22/11/2026 | [#8](https://github.com/guxvr/economia-de-energia/issues/8) |
| T09 | Elaborar os slides e consolidar a apresentação | Pedro (visual); todos (conteúdo) | 20–23/11/2026 | [#10](https://github.com/guxvr/economia-de-energia/issues/10) |
| T10 | Dividir falas, ensaiar e preparar respostas para discussão | Todos | 23/11/2026 | [#11](https://github.com/guxvr/economia-de-energia/issues/11) |
| T11 | Gerar PDF definitivo, preparar versão física e apresentar | Matheus e Pedro (entrega); todos (apresentação) | 23–24/11/2026 | [#12](https://github.com/guxvr/economia-de-energia/issues/12) |
| T12 | Acompanhar cronograma, dependências e pendências | Matheus | Contínuo | [#9](https://github.com/guxvr/economia-de-energia/issues/9) |

Cada issue possui dependências e critérios de aceitação verificáveis. Novas tarefas necessárias à conclusão do projeto devem ser vinculadas à T12. As datas anteriores à apresentação são metas internas de organização do grupo, não prazos adicionais da disciplina.

## Estrutura do repositório

No estágio atual, os rascunhos usados no planejamento estão em `docs/issues/`. A estrutura de produção prevista na issue #1 é:

```text
.
├── main.tex
├── referencias.bib
├── secoes/
├── dados/
├── figuras/
└── docs/
    └── issues/
```

O comando de compilação e as instruções de integração serão adicionados quando a base LaTeX for implementada.

## Como contribuir

1. Escolha uma issue e confirme suas dependências.
2. Siga o protocolo comum de dados e referências definido no projeto.
3. Entregue texto, dados, figuras e referências nos diretórios indicados pela issue.
4. Abra um pull request vinculado à tarefa e solicite a revisão de outro integrante.
5. Marque os critérios de aceitação somente após verificar os arquivos e resultados correspondentes.

Nenhum dado ou referência deve ser inventado. Divergências de período, unidade, moeda, abrangência ou metodologia devem ser registradas e justificadas no texto.
