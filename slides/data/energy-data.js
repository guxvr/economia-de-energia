/* Transcrição do relatório de 17/11/2026. Atualizar após revisão do grupo. */
window.ENERGY_DATA = {
  temporal: {
    title: 'Dependência externa por fonte', unit: '%', geography: 'Brasil',
    years: [2016, 2021, 2025], domain: [-100, 100],
    source: 'Relatório, Tabela 7, p. 25 (PDF p. 26). Fonte original: EPE, BEN 2026, tabela de dependência externa de energia.',
    note: 'Negativos = exportação líquida. Apenas anos observados, sem interpolação. Carvão: indicador da Tabela 7 (65% em 2025); não equivale aos 78,8% em base energética citados no texto. Confirmar definições na revisão.',
    series: [
      { id: 'oil', label: 'Petróleo e derivados', color: '#D78C45', values: [-22, -43, -74] },
      { id: 'gas', label: 'Gás natural', color: '#4EA9C7', values: [33, 41, 19] },
      { id: 'coal', label: 'Carvão mineral', color: '#B09BCB', values: [77, 76, 65] },
      { id: 'total', label: 'Energia total', color: '#6AAF8C', values: [2, -4, -18] }
    ]
  },
  comparacao: {
    title: 'Participação dos fósseis na oferta interna de energia', unit: '% da OIE', geography: 'Brasil', year: 2025,
    source: 'Relatório, seção 4.3 e Figura 2, p. 7 (PDF p. 8). Fonte original: EPE, BEN 2026, Tabela 1.3.b.',
    note: 'Os três grupos somam 48,5% da oferta interna. As demais fontes representam 51,5%; este gráfico não representa a matriz completa.',
    series: [
      { id: 'oil', label: 'Petróleo e derivados', color: '#D78C45', value: 33.7 },
      { id: 'gas', label: 'Gás natural', color: '#4EA9C7', value: 10.3 },
      { id: 'coal', label: 'Carvão mineral e coque', color: '#B09BCB', value: 4.5 }
    ]
  }
};
