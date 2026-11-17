"""
Pipeline de imágenes de Enginear.

Toma las fotos originales (descargadas de enginearcba.com.ar) en /originals,
las recorta si hace falta y genera versiones WebP responsive en
/src/assets/img + un manifest.json que usa el build para escribir
<img srcset width height> correctos.

Uso (requiere Pillow):
    python3 tools/images.py
"""
import json
import os
import sys

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "originals")
DST = os.path.join(ROOT, "src", "assets", "img")

# slug: (archivo original, recorte relativo (x0,y0,x1,y1) o None, anchos)
IMAGES = {
    # Relevamiento en obra (fotos propias)
    "fisura-medicion":     ("IMG_20210309_104315-scaled.jpg", None, [768, 1280, 1920, 2560]),
    "fisura-cinta":        ("IMG_20210309_104324-rotated.jpg", None, [480, 731]),
    "fisura-cinta-detalle": ("IMG_20210309_104253-rotated.jpg", None, [480, 731]),
    "medidor-laser-pared": ("IMG_20210309_104523-rotated.jpg", None, [480, 731]),
    "medidor-laser":       ("IMG_20210309_104537-rotated.jpg", None, [480, 731]),
    # Equipo (fotos propias)
    "daniel-abud":         ("Daniel-abud-.jpg", None, [480, 730]),
    "daniel-abud-oficina": ("Daniel-abud-1.jpg", None, [768, 1300]),
    "analisis-notebook":   ("IMG_20210309_100928-1-1.jpg", None, [768, 1280]),
    # Gabinete / análisis (fotos propias)
    "calculo-estructural-cad": ("engi-ultima.jpg", None, [480, 852]),
    "cad-detalle":         ("Enginear-7.jpg", None, [569]),
    "modelo-3d":           ("Enginear-5.jpeg", None, [480, 719]),
    "via-puente-obra":     ("enginear-2-1.jpeg", None, [768, 1280]),
    "via-puente-obra-sq":  ("Enginear-2.jpeg", None, [480, 853]),
    "instalacion-electrica": ("enginear-3-1.jpeg", None, [768, 1280]),
    "instalacion-electrica-sq": ("Enginear-3.jpeg", None, [480, 853]),
    "informe-tecnico":     ("enginear-4-1.jpeg", None, [768, 1280]),
    "informe-tecnico-sq":  ("Enginear-4.jpeg", None, [480, 854]),
    "tasacion-planos":     ("enginear-1-1.jpeg", None, [768, 1280]),
    "tasacion-planos-sq":  ("Enginear-1.jpeg", None, [480, 854]),
    "tablero-inspeccion":  ("enginear-6-1.jpeg", None, [768, 1280]),
    "tablero-inspeccion-sq": ("Enginear-6.jpeg", None, [480, 853]),
    # Fotos de archivo usadas en el sitio actual (complementarias)
    "obra-hormigon":       ("building-new-concrete-houses.jpg", None, [768, 1300]),
    "estructura-pizarra":  ("thisisengineering-raeng-kHOTDd7Cw3s-unsplash-1.jpg", None, [768, 1300]),
}

QUALITY = 78


def process(slug, filename, crop, widths):
    path = os.path.join(SRC, filename)
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if crop:
        w, h = im.size
        im = im.crop((int(crop[0] * w), int(crop[1] * h), int(crop[2] * w), int(crop[3] * h)))
    W, H = im.size
    out = []
    for target in sorted(set(min(t, W) for t in widths)):
        r = im if target == W else im.resize((target, round(H * target / W)), Image.LANCZOS)
        r.save(os.path.join(DST, f"{slug}-{target}.webp"), "WEBP", quality=QUALITY, method=6)
        out.append(target)
    return {"w": W, "h": H, "widths": out}


def og_image():
    """Imagen 1200x630 para Open Graph (JPG: mejor compatibilidad en redes)."""
    base = ImageOps.exif_transpose(Image.open(os.path.join(SRC, "IMG_20210309_104315-scaled.jpg"))).convert("RGB")
    base = ImageOps.fit(base, (1200, 630), Image.LANCZOS, centering=(0.55, 0.5))
    shade = Image.new("RGB", base.size, (14, 15, 15))
    base = Image.blend(base, shade, 0.35)
    logo = Image.open(os.path.join(SRC, "LOGO_color-02-2-1-1.png")).convert("RGBA")
    logo = logo.resize((logo.width * 1, logo.height * 1), Image.LANCZOS)
    plate = Image.new("RGBA", (logo.width + 64, logo.height + 40), (14, 15, 15, 235))
    base.paste(plate, (56, 56), plate)
    base.paste(logo, (88, 76), logo)
    base.save(os.path.join(DST, "og-enginear.jpg"), "JPEG", quality=84, optimize=True)


def icons():
    logo = Image.open(os.path.join(SRC, "LOGO_color-02-2-1-1.png")).convert("RGBA")
    for size, name in ((180, "apple-touch-icon.png"), (512, "icon-512.png"), (192, "icon-192.png")):
        canvas = Image.new("RGBA", (size, size), (14, 15, 15, 255))
        lw = int(size * 0.84)
        l = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
        canvas.paste(l, ((size - l.width) // 2, (size - l.height) // 2), l)
        canvas.convert("RGB").save(os.path.join(DST, name), "PNG", optimize=True)
    # Logos para la web
    for src, name in (("LOGO_color-02-2-1-1.png", "logo-enginear.png"),
                      ):
        Image.open(os.path.join(SRC, src)).convert("RGBA").save(os.path.join(DST, name), "PNG", optimize=True)


def main():
    os.makedirs(DST, exist_ok=True)
    manifest = {}
    for slug, (fn, crop, widths) in IMAGES.items():
        manifest[slug] = process(slug, fn, crop, widths)
        print(f"  {slug:28s} {manifest[slug]['w']}x{manifest[slug]['h']}  {manifest[slug]['widths']}")
    og_image()
    icons()
    with open(os.path.join(DST, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1)
    print(f"OK — {len(manifest)} imágenes → {DST}")


if __name__ == "__main__":
    sys.exit(main())
