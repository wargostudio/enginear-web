// Bloques reutilizables entre páginas.
import { site, whatsappUrl } from "../data/site.mjs";
import { icon } from "./icons.mjs";

/** Fisura SVG determinística (misma forma en cada build). */
export function crackPath(seed = 1, { w = 1200, h = 120, steps = 26, amp = 0.32 } = {}) {
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * w + (rnd() - 0.5) * (w / steps) * 0.6;
    const y = h / 2 + (rnd() - 0.5) * h * amp * (i % 3 === 0 ? 2 : 1);
    pts.push([Math.max(0, Math.min(w, x)), y]);
  }
  pts[0][0] = 0;
  pts[pts.length - 1][0] = w;
  const main = "M" + pts.map((p) => p.map((n) => n.toFixed(1)).join(" ")).join(" L");
  // dos ramificaciones cortas
  const branches = [Math.floor(steps * 0.35), Math.floor(steps * 0.72)].map((i, k) => {
    const [x, y] = pts[i];
    const dir = k ? -1 : 1;
    return `M${x.toFixed(1)} ${y.toFixed(1)} L${(x + 30).toFixed(1)} ${(y + dir * 16).toFixed(1)} L${(x + 58).toFixed(1)} ${(y + dir * 22).toFixed(1)} L${(x + 90).toFixed(1)} ${(y + dir * 38).toFixed(1)}`;
  });
  return { main, branches, w, h };
}

export function crack(seed, cls = "") {
  const c = crackPath(seed);
  return `<div class="crack ${cls}" aria-hidden="true"><svg viewBox="0 0 ${c.w} ${c.h}" preserveAspectRatio="none"><path class="crack__main" d="${c.main}"/>${c.branches
    .map((b) => `<path class="crack__branch" d="${b}"/>`)
    .join("")}</svg></div>`;
}

/** Encabezado de sección con número de "expediente". */
export function sectionHead({ num, label, title, lead = "", tag = "h2", cls = "" }) {
  return `<header class="sec-head ${cls}">
    <p class="sec-head__label mono" data-scramble><span>${num}</span> ${label}</p>
    <${tag} class="sec-head__title" data-split>${title}</${tag}>
    ${lead ? `<p class="sec-head__lead reveal">${lead}</p>` : ""}
  </header>`;
}

/** Hero de páginas internas. */
export function pageHero({ num, label, title, lead, media = "", crumbs }) {
  return `<section class="page-hero">
    <div class="page-hero__grid" aria-hidden="true"></div>
    <div class="container page-hero__inner">
      <nav class="crumbs mono" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li aria-current="page">${crumbs}</li></ol></nav>
      <p class="sec-head__label mono" data-scramble><span>${num}</span> ${label}</p>
      <h1 class="page-hero__title" data-split>${title}</h1>
      ${lead ? `<p class="page-hero__lead reveal">${lead}</p>` : ""}
    </div>
    ${media}
    ${crack(7, "page-hero__crack")}
  </section>`;
}

export function breadcrumbSchema(name, pathname) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${pathname}` },
    ],
  };
}

/** Banda de llamada a la acción final (amarilla). */
export function ctaBand({ title = "¿Detectó fisuras, fallas o daños en su construcción?", text = "Contanos el caso. Te respondemos a la brevedad." } = {}) {
  return `<section class="cta-band" aria-labelledby="cta-title">
    ${crack(11, "cta-band__crack")}
    <div class="container cta-band__inner">
      <div>
        <p class="mono label">Consulta técnica</p>
        <h2 id="cta-title" class="cta-band__title" data-split>${title}</h2>
        <p class="cta-band__text">${text}</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--ink btn--lg" href="/contacto/" data-magnet>Enviar consulta ${icon("arrow")}</a>
        <a class="btn btn--outline-ink btn--lg" href="${whatsappUrl()}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
        <a class="cta-band__phone" href="tel:${site.phoneE164}">${icon("phone")} ${site.phoneDisplay}</a>
      </div>
    </div>
  </section>`;
}

/** Cinta de texto en movimiento (velocidad según scroll). */
export function marquee(items, cls = "") {
  const row = items.map((t) => `<span>${t}</span><svg class="marquee__dot" aria-hidden="true"><use href="#i-crack"/></svg>`).join("");
  return `<div class="marquee ${cls}" data-marquee aria-label="${items.join(", ")}" role="note">
    <div class="marquee__track" aria-hidden="true"><div class="marquee__row">${row}</div><div class="marquee__row">${row}</div></div>
  </div>`;
}
