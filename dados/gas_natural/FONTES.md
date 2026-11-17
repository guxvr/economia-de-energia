# Rastreabilidade dos dados — T04 (gás natural)

Todos os valores vêm dos arquivos em `Trabalho/Trabalho/`. Nada foi digitado de fonte externa.
"PDF p." é a página **do arquivo PDF**; a numeração impressa no rodapé do EI é a do PDF menos 1.
Data de extração: 16/11/2026. Período-base do protocolo (seção 04): 2015–2025.

## Arquivos

| Arquivo | Conteúdo | Fonte | Local na fonte | Unidade | Abrangência | Como foi gerado |
|---|---|---|---|---|---|---|
| `producao_gn.csv` | Produção de gás natural, 2015–2025 | EI, *Statistical Review of World Energy 2026* | PDF p.48 | bcm/ano | Mundo, 7 regiões, Brasil, EUA, Rússia, China, Catar, Irã, Austrália | `extrair_dados.py` (pdftotext) |
| `consumo_gn.csv` | Consumo de gás natural, 2015–2025 | EI | PDF p.50 | bcm/ano | idem | `extrair_dados.py` |
| `comercio_gn.csv` | Importação/exportação por gasoduto e GNL (p.53) e totais de GNL (p.54) | EI | PDF p.53–54 | bcm/ano | Brasil, Europa, EUA, Rússia, China, Japão; GNL: mundo, Catar, Austrália etc. | `extrair_dados.py` |
| `precos_gn.csv` | Preços de GNL e de hubs, 2015–2025 | EI (fonte primária: S&P Global Energy) | PDF p.52 | US$/MMBtu nominais | Japão, Coreia, JKM, China, Índia, NWE, Zeebrugge, NBP, TTF, Henry Hub | `extrair_dados.py` |
| `brasil_ben_gn.csv` | Produção de energia primária, oferta interna e consumo final energético de gás natural, 2016–2025 | BEN 2026 (EPE) | PDF p.17, p.18, p.21 (Tabelas 1.2.a, 1.3.a, 1.4.a) | mil tep | Brasil | `extrair_dados.py` |
| `indicadores_pontuais.csv` | Valores únicos de 2025/2026/projeção: reservas, Brasil (ANP e BEN), EPE, IEA | ANP Anuário 2026, BEN 2026, EPE Caderno ago/2026, IEA GGSR 2026, EI | coluna `localizacao` | coluna `unidade` | Brasil e mundo | **transcrição manual** conferida contra cada fonte; linhas "cálculo próprio" são variações e participações calculadas a partir de valores da fonte |

`extrair_dados.py` valida a estrutura das linhas (11 valores por linha) e foi conferido contra o PDF nos pontos:
produção mundial 2025 = 4196,5 bcm; consumo mundial 2025 = 4186,0 bcm; produção do Brasil 2015/2025 = 23,8/26,6;
consumo do Brasil 2015/2025 = 42,9/33,2; importação do Brasil 2015/2025 = 18,0/7,0; Henry Hub 2025 = 3,53;
TTF 2022 = 37,09.

## Figuras (geradas por `gerar_figuras.py` a partir dos CSVs)

| Figura | Arquivo | Dados |
|---|---|---|
| 1 | `figuras/gas_producao_consumo.pdf` | `producao_gn.csv`, `consumo_gn.csv`, `comercio_gn.csv` |
| 2 | `figuras/gas_comercio.pdf` | `comercio_gn.csv` (Europa por gasoduto/GNL; exportações de GNL de EUA, Catar e Austrália) |
| 3 | `figuras/gas_brasil_ben.pdf` | `brasil_ben_gn.csv` (índice 2016 = 100) |
| 4 | `figuras/gas_destino_br.pdf` | `indicadores_pontuais.csv` (aproveitamento, reinjeção, queima, oferta interna) |
| 5 | `figuras/gas_precos.pdf` | `precos_gn.csv`; 2026 = média mar–out da IEA (marcador vazado) |

Paleta categórica com slots 1–4 validada com `validate_palette.js` (CVD ΔE ≥ 9,1; aqua e amarelo abaixo de 3:1 de contraste, compensados com rótulos diretos e marcadores/estilos de linha distintos).

## Edições e datas reais dos documentos

- **ANP**: os arquivos se chamam `secao-N_2025.docx`, mas o texto identifica o *Anuário Estatístico Brasileiro do Petróleo, Gás Natural e Biocombustíveis **2026***, ano-base 2025. Citar como 2026.
- **EI**: *Statistical Review of World Energy 2026*, dados até 2025.
- **BEN 2026**: ano-base 2025.
- **EPE Caderno CD-EPE-DPG-SPG-2026-01**: agosto/2026; estudos até maio/2026. Contém **projeções**.
- **IEA Global Gas Security Review 2026**: inclui o *Gas Market Report* Q4-2026. Dados de 2026 são **parciais** (março–outubro) ou **previsões**.

## Divergências entre fontes (registrar como limitação, não "corrigir")

1. **Produção do Brasil: 26,6 bcm (EI) × 65,4 bi m³ (ANP/BEN).** O EI exclui gás queimado e reinjetado (nota da p.48); a ANP e o BEN
   (179,2 milhões m³/dia ≈ 65,4 bi m³/ano) contam a produção bruta. Em 2025, 54,4% foi reinjetado e 2,8% queimado ou perdido;
   o aproveitamento foi 42,8% (ANP §2.1.4). Séries do EI e da ANP **não** podem ser misturadas.
2. **Importação do Brasil, divisão GNL × gasoduto**: EI = 2,7 (GNL) + 4,3 (gasoduto) = 7,0 bcm; ANP = 2,5 (GNL) + 4,5 (Bolívia) = 7,0 bi m³. Total igual; divisão difere.
3. **Participação do gás na matriz (BEN)**: 10,4% no texto (p.16) e 10,3% na Tabela 1.3.b (p.19). Usar 10,3% (tabela) e citar a divergência, ou citar "cerca de 10%".
4. **Consumo do Brasil 2025**: ANP informa alta de 5,8% (33,2 bi m³); a tabela do EI (p.50) traz 6,1%. Usar os valores em volume (33,2 bcm), não a taxa.
5. **GNL mundial 2025**: o texto do EI (p.47) fala em 495 bcm de comércio de GNL (+6,5%), enquanto a tabela da p.54 totaliza 578,5 bcm (+6,4%).
   Provável diferença de definição (comércio inter-regional × total); **não verificada**. Usar uma só fonte por afirmação e não somar as duas.
6. **Reservas do Brasil**: ANP (nacional) = 573,3 bi m³ provadas; o ranking mundial (29ª posição, 2024) vem de EI/Eni. Não calcular participação cruzando as duas.
7. **ANP seção 1, Europa**: o texto diz "3,6 milhões de m³" de reservas; pela participação (1,7% de 208,8 trilhões) é 3,6 **trilhões**. Erro de grafia da fonte.
8. **ANP seção 2, gás associado**: o texto diz que o gás associado foi "65,4 bilhões de m³ (90,8%)"; 65,4 é a produção total. Usar só o percentual (90,8%).

9. **Importações da Europa 2025**: o texto do EI (p.47) diz 267 bcm; a tabela da p.53 traz 265,6 bcm (e 267,7 em 2015). As participações de GNL (19,7% e 63,7%) usam os totais da tabela. O texto do artigo cita apenas valores da tabela para a Europa.

## Tipo de dado (rotular no texto e nas figuras)

| Tipo | Itens |
|---|---|
| Histórico | séries do EI 2015–2025; ANP, BEN 2025 |
| Observado parcial | preços médios mar–out/2026 e demanda jan–set/2026 (IEA) |
| Previsão/projeção | demanda 2026 (−1,5%), oferta de GNL 2026 (−3%), estoques UE (simulação) e perdas de GNL 2026–2030 (IEA); preços do citygate até 2036 e premissas de Brent/Henry Hub (EPE) |

## O que as fontes locais NÃO trazem (declarar como limitação)

- Valores numéricos da curva de projeção do citygate (o gráfico das p.15–16 do Caderno EPE não tem rótulos em texto; só "≈ US$ 11/MMBtu" ao final e "pico em 2026").
- Participação percentual da Petrobras na comercialização (só gráfico, p.10); só a tendência de queda gradual é afirmada.
- Emissões de **metano** (fugitivas): o EI traz apenas CO₂ da queima (flaring), p.28.
- Custos de capital de gasodutos, terminais de GNL ou UPGNs.
- Elasticidade-preço da demanda de gás.
- Série histórica do preço do gás no Brasil comparável em US$/MMBtu (a ANP dá US$/mil m³ de importação e R$/m³ de GNV).
