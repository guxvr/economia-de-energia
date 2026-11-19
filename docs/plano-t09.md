# T09 — apresentação inicial e continuidade

Base: branch `t09-finaliza-o-dos-slides`, commit `6fd7c5127c9795b4ff7703b7fe8fd50dc8317fa3`.
Referência de conteúdo: relatório fornecido por Gustavo, datado de 17/11/2026. A apresentação é inicial e deverá acompanhar o feedback da professora. Druck continuará a edição e a revisão visual.

## Divisão multi-agente

| Frente | Branch / worktree | Responsabilidade |
| --- | --- | --- |
| Estrutura | `t09/estrutura` / `.worktrees/estrutura` | Roteiro, conteúdo editável, visual, navegação e notas |
| Gráficos | `t09/graficos` / `.worktrees/graficos` | Dados rastreáveis, SVG, controles, teclado, impressão |
| Revisão independente | `t09/revisao` / `.worktrees/revisao` | GPT-6.2 Astra: conferir relatório, integração, acessibilidade e PDF |
| Integração | branch atual | Dependências locais, documentação, publicação, testes e PDF |

Todas as worktrees partem do mesmo commit da branch atual. Os agentes trabalham em arquivos separados; seus commits são integrados após revisão.

## Interatividade incluída no plano

- Pelo menos um gráfico temporal com observações reais do relatório: dependência externa brasileira em 2016, 2021 e 2025 (Tabela 7).
- Selecionar ano, reproduzir, pausar e reiniciar; comparar séries com a mesma unidade e definição indicada.
- Não interpolar anos ausentes. Exibir fontes, unidades, abrangência, ano e valores; manter escala fixa durante a reprodução.
- Permitir consulta por teclado, seleção de séries e preferência de movimento reduzido. Pausar ao sair do slide.
- Disponibilizar tabela de dados e representação estática completa para impressão, independente do estado interativo.
- Incluir código, dados e bibliotecas locais para funcionamento sem internet. Sem backend.
- Conferir recortes: carvão mineral da Tabela 7 não deve ser confundido com carvão e coque em base energética do BEN.

## Entrega inicial

Slides Reveal.js em `slides/`, conteúdo separado dos gráficos, PDF, cópia offline, workflow GitHub Pages e instruções de edição. O site só estará publicado após envio ao GitHub, integração na branch de publicação e configuração do Pages.

## Continuidade pelo Druck

Revisar conteúdo com os cinco integrantes; incorporar feedback da professora; revisar fontes/recortes; ajustar visual e notas; conferir links e publicação; ensaiar em até 30 minutos. Não marcar a T09 concluída antes dessa revisão.

O plano local registra a ampliação de escopo; a edição remota da issue #10 permanece pendente por falta de autenticação de escrita no GitHub.
