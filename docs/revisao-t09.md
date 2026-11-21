# Revisão independente da apresentação inicial

Em 18/11/2026, o revisor GPT-6.2 Astra verificou a apresentação integrada na worktree `t09/revisao`. A referência de conteúdo foi o PDF do relatório de 17/11/2026 fornecido por Gustavo.

## Conferência dos dados

| Indicador da Tabela 7 (%) | 2016 | 2021 | 2025 |
| --- | ---: | ---: | ---: |
| Petróleo e derivados | −22 | −43 | −74 |
| Gás natural | 33 | 41 | 19 |
| Carvão mineral | 77 | 76 | 65 |
| Energia total | 2 | −4 | −18 |

Os 12 valores coincidem com a página 25 impressa do relatório (página 26 do PDF). Os valores negativos indicam exportação líquida. Os 78,8% da análise setorial relacionam as importações líquidas de carvão e coque à oferta interna em base energética. O gráfico preserva a definição e os 65% da Tabela 7.

O gráfico da matriz brasileira também confere com a Figura 2, página 7 impressa. Em 2025, petróleo e derivados representaram 33,7% da oferta interna, gás natural 10,3% e carvão mineral e coque 4,5%. As três parcelas somam 48,5%.

## Verificação da versão integrada

- A apresentação abriu diretamente do disco em um perfil isolado do Chrome. Os 18 slides carregaram sem erros de JavaScript nem requisições HTTP externas.
- No gráfico temporal, a seleção de 2025 exibiu as 12 observações. Ocultar uma série reduziu o desenho a nove pontos. A versão estática manteve os 12. Reiniciar retornou a 2016, a reprodução avançou para 2021 e a troca de slide interrompeu a reprodução. A tabela expandida ficou acima do rodapé.
- A revisão identificou a sobreposição do texto sobre gás natural com o rodapé na tela e o corte da nota e da fonte no PDF. O slide 10 foi reorganizado. Após a correção, a conferência a 1280 × 720 percorreu todos os slides sem encontrar texto invadindo o rodapé.
- No PDF original, os valores −22 e 2 do gráfico se sobrepunham. Os rótulos agora ficam ao lado de seus pontos. O PDF regenerado tem 18 páginas com os respectivos rodapés e os 12 valores do gráfico temporal têm caixas de texto separadas.

## Continuidade

A apresentação continua em revisão pelo grupo. Druck poderá incorporar o feedback da professora e conferir a projeção e as notas na sala. A publicação no GitHub Pages e a validação do endereço público dependem da integração e configuração do repositório remoto.
