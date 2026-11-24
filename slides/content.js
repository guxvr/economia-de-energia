/* Conteúdo editorial da apresentação. Fontes e páginas referem-se à paginação
 * impressa do relatório final, não ao número da página no leitor de PDF.
 * Ao atualizar o artigo, revise este arquivo; não altere dados em charts.js.
 */
window.SLIDE_CONTENT = [
  {
    id: 'inicio', chapter: 'Economia de Energia · Universidade de Brasília', className: 'cover',
    title: 'Combustíveis<br>fósseis',
    html: '<p class="subtitle">Economia, infraestrutura e transição<br>no Brasil e no mundo.</p><div class="team-grid" aria-label="Integrantes do Grupo 7"><figure class="team-member"><img src="assets/team/gustavo.png" alt="Gustavo Xavier Evangelista"><figcaption>Gustavo<br>Xavier Evangelista</figcaption></figure><figure class="team-member"><img src="assets/team/heitor.png" alt="Heitor Macedo Ricardo"><figcaption>Heitor<br>Macedo Ricardo</figcaption></figure><figure class="team-member"><img src="assets/team/gadelha.png" alt="João Victor Diniz Gadelha"><figcaption>João Victor<br>Diniz Gadelha</figcaption></figure><figure class="team-member"><img src="assets/team/matheus.png" alt="Matheus Henrique Faria e Cruz"><figcaption>Matheus Henrique<br>Faria e Cruz</figcaption></figure><figure class="team-member"><img src="assets/team/pedro.png" alt="Pedro Druck Montalvao Reis"><figcaption>Pedro Druck<br>Montalvao Reis</figcaption></figure></div><p class="course">Professora Drª. Paula Meyer Soares · Grupo 7</p>',
    source: 'Versão final vigente · artigo consolidado · apresentação em 24/11/2026',
    notes: 'Tempo sugerido: 1 min. Apresentar os integrantes e o recorte. O roteiro completo soma aproximadamente 27 minutos, deixando margem para transições.'
  },
  {
    id: 'pergunta', chapter: '01 / O problema', title: 'Ter recursos é suficiente<br>para ter segurança energética?',
    html: '<p class="lead">A disponibilidade de petróleo, gás ou carvão não garante, por si só, abastecimento, preços acessíveis ou capacidade de responder a choques.</p><ol class="numbered"><li>Como cada mercado organiza oferta, demanda e preços?</li><li>Onde estão as vulnerabilidades brasileiras?</li><li>Como a transição modifica investimentos e riscos?</li></ol>',
    source: 'Relatório, seções 2, 7 e 8 · pp. 3–4 e 23–26', notes: 'Tempo: 1 min. Usar estas três perguntas como fio condutor. Diferenciar disponibilidade geológica de oferta comercial efetiva.'
  },
  {
    id: 'panorama', chapter: '01 / Contexto', title: 'Uma matriz mais renovável.<br>Uma economia ainda exposta.',
    html: '<div class="split equal"><div class="stat"><span class="value">≈86%</span><span class="label">da oferta energética mundial</span><span class="detail">Participação dos combustíveis fósseis · 2025</span></div><div class="stat"><span class="value">48,5%</span><span class="label">da oferta interna brasileira</span><span class="detail">Petróleo, gás natural e carvão mineral/coque · 2025</span></div></div><p class="callout">O Brasil tem maior diversificação energética, mas preserva vulnerabilidades no refino, na infraestrutura de gás e na siderurgia.</p><p class="small muted">Os agregados mundial e brasileiro seguem metodologias distintas. A comparação é contextual.</p>',
    source: 'Relatório, pp. 3 e 24 · Energy Institute (EI, 2026); Empresa de Pesquisa Energética (EPE), Balanço Energético Nacional (BEN) 2026', notes: 'Tempo: 1,5 min. Não confundir matriz energética com matriz elétrica. Ressalvar as diferenças de metodologia na comparação mundial/Brasil.'
  },
  {
    id: 'metodo', chapter: '02 / Método', title: 'Comparar sem apagar<br>as diferenças dos dados.',
    html: '<div class="split"><div><h2>Recorte da pesquisa</h2><ul><li>Pesquisa bibliográfica e documental, quantitativa e qualitativa.</li><li>Brasil e mundo, com foco no ano-base de 2025.</li><li>Séries históricas e cenários usados quando disponíveis.</li></ul></div><div><h2>Regras de leitura</h2><ul><li>Manter unidade, abrangência e definição de cada fonte.</li><li>Distinguir preços nominais de preços reais.</li><li>Separar observações históricas de projeções condicionais.</li></ul></div></div><p class="small muted">Fontes centrais: EI, BEN/EPE, Agência Nacional do Petróleo, Gás Natural e Biocombustíveis (ANP), Organização dos Países Exportadores de Petróleo (OPEP), Agência Internacional de Energia (AIE) e Pinto Júnior.</p>',
    source: 'Relatório, seção 5 · pp. 8–9', notes: 'Tempo: 1,5 min. Explicar que dados ausentes não foram interpolados. A pesquisa descreve relações econômicas, mas não estima elasticidades causais a partir de correlações anuais.'
  },
  {
    id: 'matriz-brasileira', chapter: '02 / Leitura dos dados', className: 'chart-slide', title: 'Onde os fósseis entram na matriz brasileira',
    html: '<p class="chart-intro">Selecione as fontes para comparar sua participação na oferta interna de energia em 2025.</p><div data-energy-chart="comparacao"></div>',
    source: 'Relatório, tabela 6, p. 24 · EPE, BEN 2026 · carvão mineral e coque',
    notes: 'Tempo: 1,5 min. Demonstrar a seleção das séries. O gráfico contém apenas os três fósseis: não representa 100% da matriz. Usar os percentuais para situar o peso relativo; não comparar os combustíveis em unidades físicas diferentes.'
  },
  {
    id: 'petroleo-cadeia', chapter: '03 / Petróleo', title: 'Uma cadeia global,<br>com ativos de longa duração.',
    html: '<div class="chain" aria-label="Cadeia do petróleo"><span>Exploração</span><b aria-hidden="true">→</b><span>Produção</span><b aria-hidden="true">→</b><span>Refino</span><b aria-hidden="true">→</b><span>Distribuição</span></div><div class="split"><div><h2>Oferta pouco flexível no curto prazo</h2><p>Capital elevado, ativos específicos e longos prazos de implantação limitam a resposta imediata da produção.</p></div><div><h2>Demanda ligada ao transporte</h2><p>A frota e a infraestrutura limitam a substituição imediata; eficiência e eletrificação ampliam alternativas no longo prazo.</p></div></div><p class="callout">Extração, refino e consumo são elos diferentes: ampliar um deles não resolve automaticamente os demais.</p>',
    source: 'Relatório, seção 6.1 · pp. 10 e 12–13 · Pinto Júnior (2007)', notes: 'Tempo: 1,5 min. Definir custos afundados e baixa elasticidade sem excesso de jargão. Evitar inferir causalidade de simples variação de preço e quantidade.'
  },
  {
    id: 'petroleo-brasil', chapter: '03 / Petróleo no Brasil', title: 'Exportar cru não elimina<br>a importação de derivados.',
    html: '<div class="split"><div><div class="stat"><span class="value">US$ 44,5 bi</span><span class="label">em exportações de petróleo · 2025</span></div><div class="stat"><span class="value">R$ 98,9 bi</span><span class="label">em royalties e participação especial</span></div></div><div><h2>O contraste brasileiro</h2><ul><li>O pré-sal responde por cerca de 80% da produção.</li><li>O país mantém déficit físico no comércio de derivados.</li><li>O diesel concentra parte relevante dessa vulnerabilidade.</li></ul><p class="small muted">Configuração das refinarias e perfil da demanda condicionam o abastecimento.</p></div></div>',
    source: 'Relatório, pp. 11–12 e 24 · ANP (2026)', notes: 'Tempo: 1,5 min. Explicar que as exportações agregadas não garantem derivados baratos. Não usar consumo agregado de petróleo como denominador para dependência de diesel.'
  },
  {
    id: 'petroleo-precos', chapter: '03 / Formação de preços', title: 'O preço global chega ao Brasil<br>por vários caminhos.',
    html: '<div class="split"><div><h2>Referências internacionais</h2><p>Brent e WTI refletem mercados internacionais, condições de oferta e demanda e choques geopolíticos.</p><p class="small muted">OPEP: coordenação da oferta em um mercado com reservas concentradas.</p></div><div><h2>Transmissão doméstica</h2><p>Câmbio, frete, tributos, margens e mistura de biocombustíveis condicionam os preços finais.</p></div></div><p class="callout">Brent em 2025: <strong>US$ 69,10 por barril</strong>, média anual nominal. O valor não incorpora inflação.</p>',
    source: 'Relatório, seção 6.1.4 · pp. 12–13 · EI (2026); OPEP (2026); Pinto Júnior (2007)', notes: 'Tempo: 1,5 min. Distinguir cotação do barril e preço na bomba. Não comparar diretamente preços por barril, tonelada e MMBtu sem conversão e ajuste de qualidade.'
  },
  {
    id: 'gas-cadeia', chapter: '04 / Gás natural', title: 'O recurso existe.<br>A infraestrutura determina o mercado.',
    html: '<div class="chain" aria-label="Cadeia do gás natural"><span>Produção</span><b aria-hidden="true">→</b><span>Processamento</span><b aria-hidden="true">→</b><span>Gasodutos / GNL</span><b aria-hidden="true">→</b><span>Consumo</span></div><div class="split"><div><h2>Redes e custos afundados</h2><p>Gasodutos, liquefação e regaseificação exigem investimentos específicos e condicionam a integração regional.</p></div><div><h2>Mercados conectados pelo GNL</h2><p>O comércio marítimo amplia a flexibilidade, mas mantém a dependência de terminais e contratos.</p></div></div><p class="small muted">O transporte apresenta características de monopólio natural; acesso e regulação são centrais.</p>',
    source: 'Relatório, seções 6.2.1 e 6.2.3–4 · pp. 14 e 16–18', notes: 'Tempo: 1,5 min. Definir GNL e explicar por que o gás possui mercados historicamente mais regionais que o petróleo.'
  },
  {
    id: 'gas-aproveitamento', chapter: '04 / Gás natural no Brasil', title: 'Para onde foi o gás produzido em 2025?',
    html: '<div class="split equal"><div class="stat"><span class="value">54,4%</span><span class="label">da produção bruta voltou aos reservatórios</span><span class="detail">Reinjeção de gás natural · Brasil · ANP</span></div><div><h2>Outros destinos</h2><p>O aproveitamento foi de <strong>42,8%</strong> da produção bruta. A queima e as perdas somaram <strong>2,8%</strong>.</p><p class="small muted">Grande parte do gás é extraída junto com o petróleo. A capacidade de escoamento limita o volume que chega ao mercado.</p></div></div><p class="callout">Para comparar séries, confira se o volume informado inclui a reinjeção e a queima.</p>',
    source: 'Relatório, seção 6.2.2 · p. 15 · ANP (2026); EI (2026); EPE (2026)', notes: 'Tempo: 1,5 min. Não apresentar reinjeção como desperdício integral: ela tem funções operacionais. A conclusão econômica é que aumento da produção bruta não equivale a igual aumento da oferta comercial.'
  },
  {
    id: 'carvao-cadeia', chapter: '05 / Carvão mineral', title: 'Dois usos, duas dinâmicas<br>de abastecimento.',
    html: '<div class="split equal"><div><h2>Carvão energético</h2><p>Geração elétrica e calor industrial.</p><p class="small muted">No Sul do Brasil, o carvão nacional abastece principalmente usinas próximas às minas. Qualidade e frete condicionam o custo.</p></div><div><h2>Carvão metalúrgico</h2><p>Transformação em coque para a siderurgia.</p><p class="small muted">Sem produção nacional no recorte do BEN, seu abastecimento depende de importações.</p></div></div><p class="callout">Carvão mineral e carvão vegetal são fontes distintas. No BEN, o vegetal é classificado entre as renováveis.</p>',
    source: 'Relatório, seções 6.3.1–3 · pp. 19–21 · AIE (2025); EPE, BEN 2026', notes: 'Tempo: 1,5 min. Explicar coque e sua função na siderurgia. O carvão metalúrgico não pode ser tratado como simples substituto do energético.'
  },
  {
    id: 'carvao-brasil', chapter: '05 / Carvão no Brasil e no mundo', title: 'Pequeno na matriz brasileira.<br>Estratégico para a indústria.',
    html: '<div class="split"><div><div class="stat"><span class="value">1,4%</span><span class="label">da geração elétrica brasileira · 2025</span><span class="detail">11,2 TWh de geração a carvão · BEN 2026</span></div></div><div><h2>Importância além da eletricidade</h2><ul><li>Carvão metalúrgico importado abastece a siderurgia.</li><li>Mineração e termelétricas têm relevância regional no Sul.</li><li>China responde por 55,6% do consumo mundial em base energética.</li></ul></div></div><p class="small muted">Frete, qualidade, câmbio e preços regionais condicionam os custos. Não há cartel mundial equivalente à OPEP.</p>',
    source: 'Relatório, seções 6.3.2–4 · pp. 20–22 · EPE (2026); EI (2026); AIE (2025)', notes: 'Tempo: 1,5 min. Diferenciar a pequena participação elétrica nacional da importância mundial e siderúrgica. Não usar recursos geológicos como sinônimo de reservas economicamente recuperáveis.'
  },
  {
    id: 'dependencia', chapter: '06 / Segurança energética', className: 'chart-slide', title: 'Autossuficiência agregada, dependências específicas',
    html: '<p class="chart-intro">Percorra os anos observados e compare a dependência externa por fonte. Valores negativos indicam exportação líquida.</p><div data-energy-chart="temporal"></div>',
    source: 'Relatório, tabela 7, p. 25 · BEN 2026 · somente 2016, 2021 e 2025; sem interpolação',
    notes: 'Tempo: 2 min. Demonstrar reproduzir, pausar e seleção de ano. Os pontos são apenas os anos da tabela 7; não sugerir dados anuais completos. O carvão desta tabela é 65% em 2025; os 78,8% da análise setorial incluem outro escopo e cálculo, não são diretamente comparáveis. Superávit agregado não elimina vulnerabilidade em diesel.'
  },
  {
    id: 'comparacao', chapter: '06 / Comparação econômica', title: 'A mesma política não resolve<br>três mercados diferentes.',
    html: '<table><caption class="small muted" style="text-align:left;margin-bottom:14px">Síntese das estruturas e dos principais gargalos</caption><thead><tr><th>Dimensão</th><th>Petróleo</th><th>Gás natural</th><th>Carvão mineral</th></tr></thead><tbody><tr><td>Organização</td><td>Oligopólio e coordenação da OPEP</td><td>Redes com monopólio natural</td><td>Sem cartel; forte peso da China</td></tr><tr><td>Infraestrutura</td><td>Refinarias, oleodutos e navios</td><td>Gasodutos, UPGNs e GNL</td><td>Minas, ferrovias e terminais</td></tr><tr><td>Desafio brasileiro</td><td>Derivados e exposição à renda petrolífera</td><td>Escoamento e aproveitamento comercial</td><td>Importação metalúrgica e transição regional</td></tr></tbody></table>',
    source: 'Relatório, tabela 6 e discussão comparativa · pp. 24–26', notes: 'Tempo: 1,5 min. Retomar os conceitos econômicos de estrutura de mercado, economias de escala e custos específicos. Não ler a tabela inteira; destacar uma diferença de cada combustível.'
  },
  {
    id: 'transicao', chapter: '07 / Perspectivas', title: 'A transição muda a demanda.<br>E o risco de investir hoje.',
    html: '<div class="split"><div><h2>Riscos comuns</h2><ul><li>Externalidades ambientais e custos sociais.</li><li>Infraestrutura de longa vida e risco de ativos ociosos.</li><li>Exposição a preços internacionais e choques de abastecimento.</li></ul></div><div><h2>Respostas específicas</h2><ul><li>Petróleo: diversificação e incerteza sobre a demanda futura.</li><li>Gás: infraestrutura e controle das emissões de metano.</li><li>Carvão: substituição gradual com transição socioeconômica regional.</li></ul></div></div>',
    source: 'Relatório, seções 6.1.5, 6.3.5 e 7.4 · pp. 13–14, 23 e 25–26', notes: 'Tempo: 1,5 min. Explicar ativos ociosos como investimentos que podem deixar de se remunerar. A substituição planejada precisa considerar trabalhadores e comunidades.'
  },
  {
    id: 'cenarios', chapter: '07 / Cenários, não previsões', title: 'O horizonte depende<br>das hipóteses adotadas.',
    html: '<div class="split equal"><div><h2>AIE · WEO 2025 / STEPS</h2><p>No cenário de políticas declaradas, a demanda mundial de petróleo se estabiliza por volta de 2030; o gás segue crescendo na década de 2030.</p></div><div><h2>Brasil · PDE 2036</h2><p>A produção petrolífera poderá alcançar 4,9 milhões de barris por dia em 2036, enquanto a participação do petróleo na oferta interna poderá cair.</p></div></div><p class="callout">Menor participação no consumo doméstico pode coexistir com maior exposição das exportações à transição mundial.</p><p class="small muted">PDE 2036: versão para consulta pública. Projeções não são continuação direta das séries históricas.</p>',
    source: 'Relatório, seções 6.1.5 e 7.4 · pp. 13–14 e 26 · AIE (2025); Ministério de Minas e Energia (MME)/EPE (2026)', notes: 'Tempo: 1,5 min. Explicitar que as trajetórias dependem de políticas, demanda, investimentos e execução de projetos. Não apresentar valores projetados como resultados observados.'
  },
  {
    id: 'conclusao', chapter: '08 / Conclusão', title: 'Segurança energética<br>vai além da extração.',
    html: '<p class="lead">Recursos naturais só se convertem em segurança de abastecimento quando encontram infraestrutura, capacidade de processamento e acesso aos mercados.</p><ol class="numbered"><li>Petróleo: renda e exportações convivem com dependência de derivados.</li><li>Gás: produzir mais exige condições de aproveitamento comercial.</li><li>Carvão: a transição deve considerar indústria e economias regionais.</li></ol>',
    source: 'Relatório, conclusão · p. 26', notes: 'Tempo: 1,5 min. Voltar à pergunta inicial: ter recursos é necessário, mas não suficiente. Abrir espaço para discussão. Evitar recomendar uma política única para todos os combustíveis.'
  },
  {
    id: 'referencias', chapter: 'Fontes e materiais', title: 'Referências para continuar a discussão',
    html: '<div class="reference-list"><div><a href="https://www.energyinst.org/statistical-review/resources-and-data-downloads" target="_blank" rel="noopener">Energy Institute · Statistical Review</a><span>Edição 2026 · dados mundiais e séries históricas</span></div><div><a href="https://epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/balanco-energetico-nacional-2026" target="_blank" rel="noopener">EPE · Balanço Energético Nacional</a><span>BEN 2026 · ano-base 2025</span></div><div><a href="https://www.gov.br/anp/pt-br/centrais-de-conteudo/publicacoes/anuario-estatistico" target="_blank" rel="noopener">ANP · Anuário Estatístico</a><span>Edição 2026 · petróleo e gás no Brasil</span></div><div><a href="https://publications.opec.org/asb" target="_blank" rel="noopener">OPEP · Annual Statistical Bulletin</a><span>Edição 2026 · reservas e comércio de petróleo</span></div><div><a href="https://www.iea.org/reports/world-energy-outlook-2025" target="_blank" rel="noopener">AIE · WEO 2025 e Coal 2025</a><span>Cenários energéticos e perspectivas setoriais</span></div><div><a href="https://epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/plano-decenal-de-expansao-de-energia-2036" target="_blank" rel="noopener">MME/EPE · PDE 2036</a><span>Relatório síntese em consulta pública</span></div><div><span>Pinto Júnior (org.), Economia da Energia, 2007.<br>Fundamentos econômicos e organização industrial.</span></div></div><div class="links-row"><a href="https://www.overleaf.com/project/6af8b6f2e99d9136ba422eeb/share#c5ef527f53bf21e2605ec48fbc48131520d46d52940df7c9" target="_blank" rel="noopener">Artigo no Overleaf</a><a href="https://github.com/guxvr/economia-de-energia" target="_blank" rel="noopener">Repositório e referências</a></div>',
    source: 'Artigo final · referências completas nas pp. 27–28 · links externos exigem internet', notes: 'Tempo: 1 min. As páginas indicadas ao longo dos slides são as páginas impressas do artigo, não a posição no arquivo PDF.'
  }
];
