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

## Planejamento

O acompanhamento central é feito na [issue #9 — Plano geral](https://github.com/guxvr/economia-de-energia/issues/9). Ela funciona como issue guarda-chuva e só deve ser encerrada depois que todas as outras tarefas do trabalho estiverem concluídas.

- [#1 — Estruturar o artigo em LaTeX/IEEE e definir o recorte](https://github.com/guxvr/economia-de-energia/issues/1)
- [#2 — Redigir introdução, justificativa e metodologia](https://github.com/guxvr/economia-de-energia/issues/2)
- [#3 — Analisar a economia do petróleo](https://github.com/guxvr/economia-de-energia/issues/3)
- [#4 — Analisar a economia do gás natural](https://github.com/guxvr/economia-de-energia/issues/4)
- [#5 — Analisar a economia do carvão mineral](https://github.com/guxvr/economia-de-energia/issues/5)
- [#6 — Integrar a discussão comparativa e redigir a conclusão](https://github.com/guxvr/economia-de-energia/issues/6)
- [#7 — Revisar referências, redação e PDF final](https://github.com/guxvr/economia-de-energia/issues/7)
- [#8 — Preparar slides e ensaiar a apresentação](https://github.com/guxvr/economia-de-energia/issues/8)

Cada issue possui critérios de aceitação verificáveis. Novas tarefas necessárias à conclusão do projeto devem ser vinculadas à issue #9.

## Cronograma interno

| Etapa | Data sugerida |
| --- | --- |
| Estrutura e protocolo metodológico | 16/11/2026 |
| Dados e esboços das análises | 17/11/2026 |
| Introdução, justificativa e método | 18/11/2026 |
| Seções de petróleo, gás e carvão | 19/11/2026 |
| Discussão integrada e primeiros slides | 21/11/2026 |
| Revisão cruzada | 22/11/2026 |
| PDF, impressão, slides e ensaio final | 23/11/2026 |
| Apresentação | 24/11/2026 |

As datas anteriores à apresentação são metas de organização do grupo, não prazos adicionais da disciplina.

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
