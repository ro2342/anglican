"""Gera os icones do PWA (cruz grega simples sobre fundo rubrica).
Roda uma vez, offline, sem depender de nenhum servico externo de imagem.

Uso: python tools/gerar-icones.py
"""

from PIL import Image, ImageDraw
import os

RUBRICA = (140, 47, 28, 255)
PAPEL = (250, 246, 237, 255)
OURO = (156, 122, 43, 255)

SAIDA = os.path.join(os.path.dirname(__file__), "..", "assets", "icons")
os.makedirs(SAIDA, exist_ok=True)


def desenhar_cruz(tamanho, raio_cantos, prop_braco, anel=False):
    img = Image.new("RGBA", (tamanho, tamanho), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, tamanho - 1, tamanho - 1], radius=raio_cantos, fill=RUBRICA)

    if anel:
        margem = int(tamanho * 0.055)
        d.rounded_rectangle(
            [margem, margem, tamanho - margem, tamanho - margem],
            radius=raio_cantos - margem // 2,
            outline=OURO,
            width=max(2, int(tamanho * 0.012)),
        )

    c = tamanho / 2
    meia_espessura = tamanho * prop_braco / 2
    meio_comprimento = tamanho * 0.30

    d.rounded_rectangle(
        [c - meia_espessura, c - meio_comprimento, c + meia_espessura, c + meio_comprimento],
        radius=meia_espessura * 0.4,
        fill=PAPEL,
    )
    d.rounded_rectangle(
        [c - meio_comprimento, c - meia_espessura, c + meio_comprimento, c + meia_espessura],
        radius=meia_espessura * 0.4,
        fill=PAPEL,
    )
    return img


for tam in (192, 512):
    desenhar_cruz(tam, raio_cantos=int(tam * 0.18), prop_braco=0.14, anel=True).save(
        f"{SAIDA}/icon-{tam}.png"
    )

for tam in (192, 512):
    # maskable: conteudo tem que caber dentro do circulo central de 80% —
    # entao braco mais curto/fino e sem cantos arredondados (o SO recorta a forma).
    img = desenhar_cruz(tam, raio_cantos=0, prop_braco=0.11, anel=False)
    img.save(f"{SAIDA}/maskable-{tam}.png")

desenhar_cruz(180, raio_cantos=int(180 * 0.22), prop_braco=0.14, anel=True).save(
    f"{SAIDA}/apple-touch-icon.png"
)

desenhar_cruz(32, raio_cantos=6, prop_braco=0.16, anel=False).save(f"{SAIDA}/favicon-32.png")

print("icones gerados em", os.path.abspath(SAIDA))
