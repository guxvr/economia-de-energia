#!/usr/bin/env python3
"""Gera as figuras da seção de gás natural a partir dos CSVs de dados/gas_natural/.

Uso (raiz do repositório):  python3 -I dados/gas_natural/gerar_figuras.py
Saída: figuras/gas_producao_consumo.pdf, gas_precos.pdf, gas_brasil_ben.pdf, gas_comercio.pdf e gas_destino_br.pdf (PDF vetorial, 1 coluna IEEE ≈ 3,5 pol).

Paleta categórica: slots 1–3 (azul, laranja, aqua), validados com validate_palette.js
(ΔE CVD ≥ 9,2; contraste do aqua < 3:1, compensado com rótulos diretos e marcadores distintos).
"""
import csv
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

AQUI = Path(__file__).resolve().parent
FIGURAS = AQUI.parents[1] / "figuras"
AZUL, LARANJA, AQUA, AMARELO = "#2a78d6", "#eb6834", "#1baf7a", "#eda100"
TEXTO, GRADE = "#222222", "#d9d9d6"

plt.rcParams.update({
    "font.family": "serif", "font.size": 7, "axes.labelsize": 7, "axes.titlesize": 7.5,
    "xtick.labelsize": 6.5, "ytick.labelsize": 6.5, "axes.edgecolor": "#888888",
    "axes.linewidth": 0.6, "axes.spines.top": False, "axes.spines.right": False,
    "axes.grid": True, "grid.color": GRADE, "grid.linewidth": 0.5, "axes.axisbelow": True,
    "text.color": TEXTO, "axes.labelcolor": TEXTO, "xtick.color": TEXTO, "ytick.color": TEXTO,
    "pdf.fonttype": 42,
})


def serie(arquivo, indicador, entidade):
    """Devolve ({ano: valor}) de um CSV em formato longo; células vazias são ignoradas."""
    with open(AQUI / arquivo, encoding="utf-8") as f:
        return {int(r["ano"]): float(r["valor"]) for r in csv.DictReader(f)
                if r["indicador"] == indicador and r["entidade"] == entidade and r["valor"] != ""}


def rotulo_direto(ax, x, y, texto, cor, dy=0, ha="left", dx=0.15):
    ax.text(x + dx, y + dy, texto, color=cor, fontsize=6.5, va="center", ha=ha)


def figura_producao_consumo():
    anos = list(range(2015, 2026))
    mundo_p = serie("producao_gn.csv", "producao", "Total World")
    mundo_c = serie("consumo_gn.csv", "consumo", "Total World")
    br_p = serie("producao_gn.csv", "producao", "Brazil")
    br_c = serie("consumo_gn.csv", "consumo", "Brazil")
    br_i = serie("comercio_gn.csv", "comercio_total_importacao", "Brazil")

    fig, (a, b) = plt.subplots(1, 2, figsize=(3.5, 2.15), constrained_layout=True)
    # (a) Mundo — escala própria (bcm; milhares)
    a.plot(anos, [mundo_p[x] for x in anos], color=AZUL, lw=1.4, marker="o", ms=2.5)
    a.plot(anos, [mundo_c[x] for x in anos], color=LARANJA, lw=1.4, marker="s", ms=2.5, ls="--")
    a.set_title("(a) Mundo", loc="left")
    a.set_ylabel("bcm/ano")
    a.set_ylim(3300, 4400)
    a.text(2015.2, 4020, "Produção", color=AZUL, fontsize=6.5, rotation=0)
    a.text(2015.2, 3570, "Consumo", color=LARANJA, fontsize=6.5)
    # (b) Brasil — escala própria
    b.plot(anos, [br_c[x] for x in anos], color=LARANJA, lw=1.4, marker="s", ms=2.5, ls="--")
    b.plot(anos, [br_p[x] for x in anos], color=AZUL, lw=1.4, marker="o", ms=2.5)
    b.plot(anos, [br_i[x] for x in anos], color=AQUA, lw=1.4, marker="^", ms=2.8, ls=":")
    b.set_title("(b) Brasil (série EI)", loc="left")
    b.set_ylim(0, 48)
    b.text(2015.2, 44.5, "Consumo", color=LARANJA, fontsize=6.5)
    b.text(2018.2, 28.3, "Produção", color=AZUL, fontsize=6.5)
    b.text(2016.3, 14.6, "Importação", color=AQUA, fontsize=6.5)
    for ax in (a, b):
        ax.set_xticks([2015, 2020, 2025])
        ax.set_xlim(2014.6, 2025.4)
    fig.savefig(FIGURAS / "gas_producao_consumo.pdf")
    plt.close(fig)


def figura_precos():
    anos = list(range(2015, 2026))
    hh = serie("precos_gn.csv", "preco", "Henry Hub (EUA)")
    ttf = serie("precos_gn.csv", "preco", "TTF (Holanda)")
    jkm = serie("precos_gn.csv", "preco", "GNL JKM (Platts)")

    fig, ax = plt.subplots(figsize=(3.5, 2.3), constrained_layout=True)
    ax.plot(anos, [jkm[x] for x in anos], color=AQUA, lw=1.4, marker="^", ms=2.8, ls=":")
    ax.plot(anos, [ttf[x] for x in anos], color=LARANJA, lw=1.4, marker="s", ms=2.5, ls="--")
    ax.plot(anos, [hh[x] for x in anos], color=AZUL, lw=1.4, marker="o", ms=2.5)
    # 2026 parcial (IEA, média mar–out): marcadores vazados, fora das séries anuais do EI
    ax.plot([2026], [20.0], color=LARANJA, marker="s", ms=4.5, mfc="white", mew=1.1, ls="none")
    ax.plot([2026], [21.5], color=AQUA, marker="^", ms=4.8, mfc="white", mew=1.1, ls="none")
    ax.annotate("2026: média mar–out\n(IEA, parcial)", xy=(2026, 21.5), xytext=(2022.55, 28.5),
                fontsize=6, color=TEXTO, ha="left",
                arrowprops=dict(arrowstyle="-", lw=0.5, color="#666666"))
    ax.text(2022.25, 40.2, "TTF", color=LARANJA, fontsize=6.5)
    ax.text(2023.1, 16.8, "JKM (GNL, Ásia)", color=AQUA, fontsize=6.5)
    ax.text(2023.1, 5.4, "Henry Hub", color=AZUL, fontsize=6.5)
    ax.set_ylabel("US$/MMBtu (nominais)")
    ax.set_xticks([2015, 2018, 2021, 2024, 2026])
    ax.set_xticklabels(["2015", "2018", "2021", "2024", "2026*"])
    ax.set_xlim(2014.6, 2026.6)
    ax.set_ylim(0, 42)
    fig.savefig(FIGURAS / "gas_precos.pdf")
    plt.close(fig)


def serie_ben(indicador):
    with open(AQUI / "brasil_ben_gn.csv", encoding="utf-8") as f:
        return {int(r["ano"]): float(r["valor"]) for r in csv.DictReader(f) if r["indicador"] == indicador}


def pontual(indicador):
    with open(AQUI / "indicadores_pontuais.csv", encoding="utf-8") as f:
        return [float(r["valor"]) for r in csv.DictReader(f) if r["indicador"] == indicador][0]


def figura_brasil_ben():
    """Índice 2016 = 100 (BEN, mil tep): produção, oferta interna e consumo final de gás natural."""
    anos = list(range(2016, 2026))
    prod = serie_ben("producao_energia_primaria")
    oferta = serie_ben("oferta_interna")
    cons = serie_ben("consumo_final_energetico")
    idx = lambda d: [100 * d[a] / d[2016] for a in anos]
    fig, ax = plt.subplots(figsize=(3.5, 2.1), constrained_layout=True)
    ax.plot(anos, idx(prod), color=AZUL, lw=1.4, marker="o", ms=2.5)
    ax.plot(anos, idx(oferta), color=LARANJA, lw=1.4, marker="s", ms=2.5, ls="--")
    ax.plot(anos, idx(cons), color=AQUA, lw=1.4, marker="^", ms=2.8, ls=":")
    ax.axhline(100, color="#888888", lw=0.6)
    ax.text(2016.1, 168, "Produção de energia primária", color=AZUL, fontsize=6.5)
    ax.text(2020.1, 108, "Oferta interna", color=LARANJA, fontsize=6.5)
    ax.text(2016.1, 78, "Consumo final energético", color=AQUA, fontsize=6.5)
    for d, cor, dy in ((prod, AZUL, 0), (oferta, LARANJA, 0), (cons, AQUA, 0)):
        ax.text(2025.15, 100 * d[2025] / d[2016] + dy, f"{100 * d[2025] / d[2016]:.0f}", color=cor,
                fontsize=6.5, va="center")
    ax.set_ylabel("Índice (2016 = 100)")
    ax.set_xticks([2016, 2018, 2020, 2022, 2025])
    ax.set_xlim(2015.6, 2026.1)
    ax.set_ylim(60, 185)
    fig.savefig(FIGURAS / "gas_brasil_ben.pdf")
    plt.close(fig)


def figura_comercio():
    """(a) Europa: importações por gasoduto × GNL; (b) exportações de GNL: EUA, Catar, Austrália."""
    anos = list(range(2015, 2026))
    gas = serie("comercio_gn.csv", "comercio_gasoduto_importacao", "Europe")
    gnl = serie("comercio_gn.csv", "comercio_gnl_importacao", "Europe")
    us = serie("comercio_gn.csv", "gnl_exportacao", "US")
    qa = serie("comercio_gn.csv", "gnl_exportacao", "Qatar")
    au = serie("comercio_gn.csv", "gnl_exportacao", "Australia")
    fig, (a, b) = plt.subplots(1, 2, figsize=(3.5, 2.15), constrained_layout=True)
    a.plot(anos, [gas[x] for x in anos], color=AZUL, lw=1.4, marker="o", ms=2.5)
    a.plot(anos, [gnl[x] for x in anos], color=LARANJA, lw=1.4, marker="s", ms=2.5, ls="--")
    a.set_title("(a) Europa: importações", loc="left")
    a.set_ylabel("bcm/ano")
    a.set_ylim(0, 260)
    a.text(2021.7, 62, "Gasoduto", color=AZUL, fontsize=6.5)
    a.text(2015.3, 72, "GNL", color=LARANJA, fontsize=6.5)
    b.plot(anos, [us[x] for x in anos], color=AZUL, lw=1.4, marker="o", ms=2.5)
    b.plot(anos, [qa[x] for x in anos], color=LARANJA, lw=1.4, marker="s", ms=2.5, ls="--")
    b.plot(anos, [au[x] for x in anos], color=AQUA, lw=1.4, marker="^", ms=2.8, ls=":")
    b.set_title("(b) Exportações de GNL", loc="left")
    b.set_ylim(0, 165)
    b.text(2015.2, 143, "EUA", color=AZUL, fontsize=6.5)
    b.text(2018.4, 121, "Catar", color=LARANJA, fontsize=6.5)
    b.text(2016.5, 38, "Austrália", color=AQUA, fontsize=6.5)
    for ax in (a, b):
        ax.set_xticks([2015, 2020, 2025])
        ax.set_xlim(2014.6, 2025.4)
    fig.savefig(FIGURAS / "gas_comercio.pdf")
    plt.close(fig)


def figura_destino_br():
    """Barras 100%: destino da produção bruta e composição da oferta interna (Brasil, 2025, ANP)."""
    prod = [("Aproveitado", pontual("aproveitamento"), AZUL),
            ("Reinjetado", pontual("producao_reinjetada_participacao"), LARANJA),
            ("Queima/perda", pontual("producao_queimada_perdida_participacao"), AMARELO)]
    ofer = [("Vendas", pontual("oferta_interna_participacao_vendas"), AZUL),
            ("Consumo próprio", pontual("oferta_interna_participacao_consumo_proprio"), LARANJA),
            ("Importadores", pontual("oferta_interna_participacao_importadores"), AQUA),
            ("LGN", pontual("oferta_interna_participacao_lgn"), AMARELO)]
    fig, ax = plt.subplots(figsize=(3.5, 1.6), constrained_layout=True)
    for y, grupo in ((1, prod), (0, ofer)):
        esq = 0.0
        for nome, v, cor in grupo:
            ax.barh(y, v, left=esq, height=0.5, color=cor, edgecolor="white", linewidth=1.2)
            num = f"{v:.1f}".replace(".", ",") + "%"
            if v >= 12:
                ax.text(esq + v / 2, y, f"{nome}\n{num}", ha="center", va="center",
                        fontsize=6, color="white" if cor in (AZUL, LARANJA) else "#111111")
            elif y == 1:
                ax.text(100, y + 0.36, f"{nome} {num}", ha="right", va="bottom", fontsize=6, color="#222222")
            else:
                ax.text(100 if nome != "Importadores" else esq + v, y - (0.34 if nome == "Importadores" else 0.60),
                        f"{nome} {num}", ha="right", va="top", fontsize=6, color="#222222")
            esq += v
    ax.set_yticks([1, 0])
    ax.set_yticklabels(["Produção\nbruta", "Oferta\ninterna"])
    ax.set_xlim(0, 100)
    ax.set_ylim(-1.0, 1.85)
    ax.set_xlabel("% do total")
    ax.grid(False)
    ax.spines["left"].set_visible(False)
    ax.tick_params(axis="y", length=0)
    fig.savefig(FIGURAS / "gas_destino_br.pdf")
    plt.close(fig)


if __name__ == "__main__":
    FIGURAS.mkdir(exist_ok=True)
    figura_producao_consumo()
    figura_precos()
    figura_brasil_ben()
    figura_comercio()
    figura_destino_br()
    print("figuras geradas em", FIGURAS)
