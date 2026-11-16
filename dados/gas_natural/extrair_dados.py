#!/usr/bin/env python3
"""Extrai séries de gás natural do Statistical Review of World Energy 2026 (EI).

Lê as tabelas diretamente do PDF em Trabalho/Trabalho/ (via pdftotext -layout)
e grava CSVs em formato longo em dados/gas_natural/. Nada é digitado à mão:
cada valor vem da linha correspondente da tabela do PDF.

Uso (a partir da raiz do repositório):
    python3 -I dados/gas_natural/extrair_dados.py

Páginas citadas são páginas do ARQUIVO PDF; a numeração impressa no rodapé do
documento é a do PDF menos 1.
"""
import csv
import re
import subprocess
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
PDF_EI = RAIZ / "Trabalho" / "Trabalho" / "Statistical Review of World Energy.pdf"
SAIDA = Path(__file__).resolve().parent
ANOS = list(range(2015, 2026))  # 2015–2025 (período-base do protocolo, seção 04)
FONTE = "Energy Institute, Statistical Review of World Energy 2026"
NUM = re.compile(r"^-?\d+(?:\.\d+)?$")
ROTULOS_COMERCIO = {
    "Pipeline imports": "comercio_gasoduto_importacao",
    "LNG imports": "comercio_gnl_importacao",
    "Total imports": "comercio_total_importacao",
    "Pipeline exports": "comercio_gasoduto_exportacao",
    "LNG exports": "comercio_gnl_exportacao",
    "Total exports": "comercio_total_exportacao",
}


def texto_pagina(pagina: int) -> list[str]:
    """Devolve as linhas de uma página do PDF, preservando o layout."""
    saida = subprocess.run(
        ["pdftotext", "-layout", "-f", str(pagina), "-l", str(pagina), str(PDF_EI), "-"],
        check=True, capture_output=True, text=True,
    ).stdout
    return saida.splitlines()


def separar_linha(linha: str):
    """Separa rótulo e os 11 primeiros valores (2015–2025). None se não for linha de dados."""
    partes = re.split(r"\s{2,}", linha.strip())
    if len(partes) < 12:
        return None
    rotulo, valores = partes[0], partes[1:12]
    if not all(NUM.match(v) or v in {"–", "^", "†", "-"} for v in valores):
        return None
    return rotulo, valores


def para_float(v: str):
    """Converte valor da tabela; '–' = zero reportado, '^' = menor que 0,05 (vazio no CSV)."""
    if NUM.match(v):
        return float(v)
    return 0.0 if v in {"–", "-"} else ""


def tabela_simples(pagina, entidades, indicador, unidade, obs=""):
    """Tabelas 'uma linha por entidade' (produção, consumo, GNL exportado)."""
    linhas = []
    for linha in texto_pagina(pagina):
        res = separar_linha(linha)
        if res and res[0] in entidades:
            rotulo, valores = res
            for ano, v in zip(ANOS, valores):
                linhas.append([indicador, rotulo, ano, para_float(v), unidade, FONTE, pagina, obs])
    return linhas


def tabela_comercio(pagina, entidades_alvo):
    """Página 53: blocos por entidade com linhas 'Pipeline imports', 'LNG imports' etc."""
    linhas, atual = [], None
    for linha in texto_pagina(pagina):
        limpa = linha.strip()
        if limpa and limpa.split()[0] not in {"Pipeline", "LNG", "Total", "Billion", "Natural", "Back", "Source", "*", "Notes", "^"} \
                and not re.search(r"\d", limpa) and len(limpa) < 40:
            atual = limpa
            continue
        res = separar_linha(linha)
        if res and atual in entidades_alvo:
            rotulo, valores = res
            indicador = ROTULOS_COMERCIO.get(rotulo.rstrip("*"))
            if indicador is None:
                continue
            for ano, v in zip(ANOS, valores):
                linhas.append([indicador, atual, ano, para_float(v), "bcm", FONTE, pagina,
                               "'^' = menor que 0,05 bcm (célula vazia)" if "^" in valores else ""])
    return linhas


def gnl_pagina_54():
    """Página 54: duas tabelas — 1ª = importações de GNL, 2ª = exportações de GNL.
    As tabelas são separadas pelo cabeçalho 'Billion cubic metres' (aparece duas vezes)."""
    linhas, bloco = [], 0
    for linha in texto_pagina(54):
        if linha.strip().startswith("Billion cubic metres"):
            bloco += 1
            continue
        res = separar_linha(linha)
        if not res or bloco not in (1, 2):
            continue
        rotulo, valores = res
        if rotulo not in {"US", "Brazil", "Qatar", "Australia", "Total Europe", "Total World",
                          "Total LNG exports", "China", "Japan"}:
            continue
        ind, ent = (("gnl_importacao", "Mundo" if rotulo == "Total World" else rotulo) if bloco == 1
                    else ("gnl_exportacao", "Mundo" if rotulo == "Total LNG exports" else rotulo))
        for ano, v in zip(ANOS, valores):
            linhas.append([ind, ent, ano, para_float(v), "bcm", FONTE, 54, "Tabela de GNL, p.54"])
    return linhas


PDF_BEN = RAIZ / "Trabalho" / "Trabalho" / "BEN2026.pdf"
ANOS_BEN = list(range(2016, 2026))  # o BEN traz 2016–2025 (10 anos)


def ben_gas(pagina: int, indicador: str, tabela: str):
    """Linha 'GÁS NATURAL' das tabelas do BEN com milhares em ponto (ex.: 37.610 = 37610 mil tep).
    Ignora a linha de participação percentual (valores < 100) que aparece na p.18."""
    saida = subprocess.run(
        ["pdftotext", "-layout", "-f", str(pagina), "-l", str(pagina), str(PDF_BEN), "-"],
        check=True, capture_output=True, text=True).stdout
    for linha in saida.splitlines():
        if linha.strip().startswith("GÁS NATURAL"):
            nums = re.findall(r"\d{1,3}(?:\.\d{3})+|\d+", linha)
            if len(nums) == 10:
                vals = [int(n.replace(".", "")) for n in nums]
                if min(vals) >= 1000:
                    return [[indicador, "Brasil", a, v, "mil tep", "BEN 2026", pagina, tabela]
                            for a, v in zip(ANOS_BEN, vals)]
    raise RuntimeError(f"linha de gás natural não encontrada no BEN p.{pagina}")


def serie_ben():
    return (ben_gas(17, "producao_energia_primaria", "Tabela 1.2.a")
            + ben_gas(18, "oferta_interna", "Tabela 1.3.a")
            + ben_gas(21, "consumo_final_energetico", "Tabela 1.4.a"))


def escrever(nome, linhas):
    with open(SAIDA / nome, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["indicador", "entidade", "ano", "valor", "unidade", "fonte", "pagina_pdf", "observacao"])
        w.writerows(linhas)
    print(f"{nome}: {len(linhas)} linhas")


def precos():
    """Página 52: preços anuais. 14 colunas após o ano (ordem do cabeçalho do PDF)."""
    colunas = [
        ("GNL Japão (CIF)", "US$/MMBtu"), ("GNL Coreia do Sul", "US$/MMBtu"),
        ("GNL JKM (Platts)", "US$/MMBtu"), ("GNL China (continental)", "US$/MMBtu"),
        ("GNL Índia Oeste (WIM)", "US$/MMBtu"), ("GNL Noroeste Europeu (NWE)", "US$/MMBtu"),
        ("Zeebrugge", "US$/MMBtu"), ("NBP (Reino Unido)", "US$/MMBtu"),
        ("TTF (Holanda)", "US$/MMBtu"), ("Henry Hub (EUA)", "US$/MMBtu"),
        ("Amônia EUA Golfo", "US$/t"), ("Amônia Noroeste Europeu", "US$/t"),
        ("Amônia Oriente Médio", "US$/t"), ("Amônia Extremo Oriente", "US$/t"),
    ]
    linhas = []
    for linha in texto_pagina(52):
        partes = re.split(r"\s{2,}", linha.strip())
        if len(partes) == 15 and re.fullmatch(r"20(1[5-9]|2[0-5])", partes[0]):
            ano = int(partes[0])
            for (nome, unidade), v in zip(colunas, partes[1:]):
                if nome.startswith("Amônia"):
                    continue  # fora do escopo da seção; mantido apenas o gás
                linhas.append(["preco", nome, ano, float(v), unidade, FONTE, 52,
                               "Preço nominal anual (sem deflator); fonte primária S&P Global Energy"])
    return linhas


def main():
    assert PDF_EI.exists(), f"PDF não encontrado: {PDF_EI}"
    regioes = {"Total North America", "Total S. & Cent. America", "Total Europe", "Total CIS",
               "Total Middle East", "Total Africa", "Total Asia Pacific", "Total World"}
    paises = {"Brazil", "US", "Russian Federation", "China", "Qatar", "Iran", "Australia"}
    alvo = regioes | paises

    escrever("producao_gn.csv", tabela_simples(
        48, alvo, "producao", "bcm",
        "Exclui gás queimado ou reinjetado (nota da tabela, p.48)"))
    escrever("consumo_gn.csv", tabela_simples(
        50, alvo, "consumo", "bcm", "Consumo de gás natural (nota da tabela, p.50)"))
    comercio = tabela_comercio(53, {"Brazil", "Europe", "US", "Russian Federation", "China", "Japan"})
    comercio += gnl_pagina_54()
    escrever("comercio_gn.csv", comercio)
    escrever("precos_gn.csv", precos())
    escrever("brasil_ben_gn.csv", serie_ben())


if __name__ == "__main__":
    main()
