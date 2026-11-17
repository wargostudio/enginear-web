// ---------------------------------------------------------------------------
// Build del sitio de Enginear — Node puro, sin dependencias.
//   node tools/build.mjs        → genera /dist listo para subir al hosting
// ---------------------------------------------------------------------------
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, nav, whatsappUrl } from "../src/data/site.mjs";
import { icon, sprite } from "../src/partials/icons.mjs";
import { esc, VERSION } from "../src/partials/helpers.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");

const today = new Date();

// ---------- Schema.org ----------
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organizacion`,
  name: site.name,
  slogan: site.slogan,
  description:
    "Empresa de Ingeniería Forense en Córdoba: identificación de patologías de la construcción, peritajes, tasaciones, cálculo de estructuras y fundaciones, con más de 35 años de trayectoria.",
  url: `${site.url}/`,
  logo: `${site.url}/assets/img/icon-512.png`,
  image: `${site.url}/assets/img/og-enginear.jpg`,
  telephone: site.phoneE164,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: site.country },
  areaServed: { "@type": "AdministrativeArea", name: "Provincia de Córdoba" },
  sameAs: site.social.map((s) => s.url),
  knowsAbout: ["Ingeniería Forense", "Patología de la Construcción", "Peritajes", "Tasaciones", "Vicios Constructivos", "Cálculo de estructuras"],
};

// ---------- layout ----------
function head({ title, description, pathname, ogImage, schema = [], noindex = false, preload = "" }) {
  const canonical = `${site.url}${pathname}`;
  const og = `${site.url}${ogImage || "/assets/img/og-enginear.jpg"}`;
  const ld = [orgSchema, ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n  ");
  return `<!doctype html>
<html lang="es-AR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
  <meta name="theme-color" content="#0e0f0f">
  <meta name="format-detection" content="telephone=no">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="${site.locale}">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Enginear — Ingeniería forense en Córdoba">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${og}">

  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/assets/img/icon-192.png" sizes="192x192" type="image/png">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <link rel="preload" href="/assets/fonts/archivo-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/jetbrains-mono-var.woff2" as="font" type="font/woff2" crossorigin>
  ${preload}
  <script src="/assets/js/boot.js?v=${VERSION}"></script>
  <link rel="stylesheet" href="/assets/css/styles.css?v=${VERSION}">

  <script defer src="/assets/lib/gsap.min.js?v=${VERSION}"></script>
  <script defer src="/assets/lib/ScrollTrigger.min.js?v=${VERSION}"></script>
  <script defer src="/assets/lib/SplitText.min.js?v=${VERSION}"></script>
  <script defer src="/assets/lib/DrawSVGPlugin.min.js?v=${VERSION}"></script>
  <script defer src="/assets/lib/lenis.min.js?v=${VERSION}"></script>
  <script defer src="/assets/js/main.js?v=${VERSION}"></script>
  ${ld}
</head>`;
}

function header(active) {
  const links = nav
    .map((n) => `<li><a href="${n.href}"${n.key === active ? ' aria-current="page"' : ""}>${n.label}</a></li>`)
    .join("");
  const mobileLinks = nav
    .map(
      (n, i) =>
        `<li><a href="${n.href}"${n.key === active ? ' aria-current="page"' : ""}><span class="mono">0${i + 1}</span>${n.label}</a></li>`
    )
    .join("");
  return `
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<div class="tape" aria-hidden="true"><div class="tape__fill"></div></div>
<header class="site-header" data-header>
  <div class="site-header__inner">
    <a class="brand" href="/" aria-label="Enginear — Inicio">
      <img src="/assets/img/logo-enginear.png" width="163" height="42" alt="Enginear">
    </a>
    <nav class="main-nav" aria-label="Principal">
      <ul>${links}</ul>
    </nav>
    <div class="site-header__cta">
      <a class="btn btn--sm btn--yellow" href="/contacto/" data-magnet>Consultar</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-movil" data-menu-toggle>
        <span class="sr-only">Abrir menú</span><span class="menu-toggle__bars" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="menu-movil" data-mobile-menu hidden>
  <nav aria-label="Menú móvil"><ul>${mobileLinks}</ul></nav>
  <div class="mobile-menu__foot">
    <a class="btn btn--yellow btn--block" href="${whatsappUrl()}" target="_blank" rel="noopener">${icon("whatsapp")}Escribir por WhatsApp</a>
    <a class="mobile-menu__line" href="tel:${site.phoneE164}">${icon("phone")}${site.phoneDisplay}</a>
    <a class="mobile-menu__line" href="mailto:${site.email}">${icon("mail")}${site.email}</a>
  </div>
</div>`;
}

function footer() {
  const year = today.getFullYear();
  return `
<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      <img src="/assets/img/logo-enginear.png" width="326" height="84" alt="Enginear" loading="lazy">
      <p class="mono site-footer__slogan">${site.slogan}</p>
      <p>Ingeniería forense y patología de la construcción en ${site.city}. Más de ${site.years} años de trayectoria.</p>
    </div>
    <nav class="site-footer__col" aria-label="Secciones">
      <p class="mono label">Secciones</p>
      <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}<li><a href="/privacidad/">Privacidad</a></li></ul>
    </nav>
    <div class="site-footer__col">
      <p class="mono label">Contacto</p>
      <ul>
        <li><a href="${whatsappUrl()}" target="_blank" rel="noopener">${icon("whatsapp")}WhatsApp</a></li>
        <li><a href="tel:${site.phoneE164}">${icon("phone")}${site.phoneDisplay}</a></li>
        <li><a href="mailto:${site.email}">${icon("mail")}${site.email}</a></li>
        <li><span>${icon("pin")}${site.city}, Argentina</span></li>
      </ul>
    </div>
    <div class="site-footer__col">
      <p class="mono label">Redes</p>
      <ul>${site.social
        .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${icon(s.id)}${s.label}</a></li>`)
        .join("")}</ul>
    </div>
  </div>
  <div class="container site-footer__bottom">
    <p>© ${year} ${site.name}. Todos los derechos reservados.</p>
    <p>Diseño y desarrollo: <a href="https://wargostudio.com" target="_blank" rel="noopener noreferrer">Wargo Studio</a></p>
  </div>
</footer>
<a class="wa-float" href="${whatsappUrl()}" target="_blank" rel="noopener" aria-label="Escribir a Enginear por WhatsApp">${icon("whatsapp")}</a>`;
}

function render(page) {
  return `${head(page)}
<body class="page-${page.key}">
${sprite}
${header(page.key)}
<main id="contenido">
${page.body}
</main>
${footer()}
</body>
</html>
`;
}

// ---------- build ----------
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    if (e.name === ".DS_Store" || e.name === "manifest.json") continue;
    const a = path.join(from, e.name), b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}

async function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  copyDir(path.join(SRC, "assets"), path.join(DIST, "assets"));
  copyDir(path.join(SRC, "static"), DIST);

  const pageFiles = fs.readdirSync(path.join(SRC, "pages")).filter((f) => f.endsWith(".mjs"));
  const urls = [];
  for (const f of pageFiles) {
    const mod = await import(path.join(SRC, "pages", f));
    const page = mod.default();
    const out = page.pathname === "/" ? "index.html" : page.file || path.join(page.pathname, "index.html");
    fs.mkdirSync(path.dirname(path.join(DIST, out)), { recursive: true });
    fs.writeFileSync(path.join(DIST, out), render(page));
    if (!page.noindex) urls.push({ loc: page.pathname, priority: page.priority ?? 0.7 });
    console.log(`  ✓ ${out}`);
  }

  // sitemap.xml
  const lastmod = today.toISOString().slice(0, 10);
  urls.sort((a, b) => b.priority - a.priority);
  fs.writeFileSync(
    path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u.loc}</loc><lastmod>${lastmod}</lastmod><priority>${u.priority.toFixed(1)}</priority></url>`).join("\n")}
</urlset>
`
  );
  // robots.txt
  fs.writeFileSync(
    path.join(DIST, "robots.txt"),
    `User-agent: *
Allow: /
Disallow: /contacto/enviar.php

Sitemap: ${site.url}/sitemap.xml
`
  );
  console.log(`OK — ${pageFiles.length} páginas · v=${VERSION} → dist/`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
