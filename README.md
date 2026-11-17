# Enginear: sitio web

Sitio oficial de **Enginear**, ingeniería forense y patología de la construcción en Córdoba.
Es un sitio estático multipágina (HTML, CSS y JS vanilla) con un formulario PHP. Está pensado para Hostinger o cualquier hosting Apache con PHP.

## Estructura

```
src/
  data/site.mjs        ← TODO el contenido (textos, servicios, equipo, contacto, redes)
  pages/*.mjs          ← una página por archivo (inicio, nosotros, servicios, galería, contacto, privacidad, 404)
  partials/            ← íconos, bloques reutilizables y helpers (img responsive, etc.)
  assets/css|js|fonts|lib|img
  static/              ← .htaccess, favicon, manifest, contacto/enviar.php
tools/
  build.mjs            ← genera dist/ (Node puro, sin dependencias)
  check.mjs            ← control de calidad: enlaces, H1, alt, SEO, JSON-LD
  images.py            ← originales → WebP responsive + manifest (requiere Pillow)
  router.php           ← router del servidor local (php -S)
  preview-sync.sh      ← build + copia a la vista previa (ruta en .preview-dir, local)
originals/             ← fotos y logos del sitio anterior que usa images.py (no se publican en dist)
dist/                  ← SITIO LISTO PARA SUBIR
```

## Uso

```bash
node tools/build.mjs     # compila dist/
node tools/check.mjs     # verifica el build
php -S 127.0.0.1:8801 -t dist tools/router.php   # vista previa local con formulario
```

En local, el formulario no envía mails: los guarda en el log temporal de PHP (`enginear-contacto.log`).

Para cambiar textos, editá `src/data/site.mjs` y volvé a compilar. Para sumar fotos, agregalas en `originals/`, registralas en `tools/images.py` y corré `python3 tools/images.py` (necesita Pillow).

## Publicar en Hostinger

1. Compilar (`node tools/build.mjs`).
2. Subir **el contenido** de `dist/` a `public_html/`, incluido el `.htaccess` oculto.
3. Crear la casilla `no-reply@enginearcba.com.ar`, que el formulario usa como remitente.
4. Probar el formulario en producción y enviar el sitemap a Google Search Console.

El `.htaccess` redirige las URLs del WordPress anterior, fuerza HTTPS, sirve la página 404, maneja la caché y agrega cabeceras de seguridad (incluida una CSP estricta).

## Stack y decisiones

- **Tipografías**: Archivo (variable, con eje de ancho) y JetBrains Mono, autoalojadas.
- **Animación**: GSAP 3.15 (ScrollTrigger, SplitText y DrawSVG) y Lenis 1.3 para el scroll suave (solo con mouse, nunca en pantallas táctiles). Las versiones vienen de los repos clonados en `../libs/`.
- **Efectos**: inspirados en React Bits y portados a vanilla (SplitText, ScrollReveal, DecryptedText, CountUp, ScrollVelocity y Magnet), más una lupa de inspección en el hero y fisuras SVG que se dibujan con el scroll.
- **Robustez**: todo el contenido está en el HTML y el JS solo lo enriquece. Cada módulo va en `safe()`, los revelados tienen redes de seguridad y no hay módulos ES.
- **Rendimiento**: imágenes WebP con `srcset`, `width`/`height` y lazy loading, preload de la imagen LCP con dirección de arte (vertical en mobile) y fuentes con `font-display: swap` y preload.
- **SEO**: títulos y descripciones por página, canonical, Open Graph y Twitter, Schema.org (ProfessionalService, Service, Person, BreadcrumbList, WebSite y ContactPage), sitemap y robots.

Diseño y desarrollo: Wargo Studio.
