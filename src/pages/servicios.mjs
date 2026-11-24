import { img, icon, whatsappUrl, site } from "../partials/helpers.mjs";
import { about, areas, services } from "../data/site.mjs";
import { pageHero, ctaBand, breadcrumbSchema, sectionHead } from "../partials/blocks.mjs";

export default function () {
  const pathname = "/servicios/";
  const layouts = ["split", "split split--rev", "wide", "split", "split split--rev", "wide", "split"];

  const jump = `<nav class="jump" aria-label="Servicios"><div class="container"><ol class="jump__list">${services
    .map((s, i) => `<li><a href="#${s.slug}"><span class="mono">${String(i + 1).padStart(2, "0")}</span>${s.short}</a></li>`)
    .join("")}</ol></div></nav>`;

  const blocks = services
    .map((s, i) => {
      const n = String(i + 1).padStart(2, "0");
      const wa = whatsappUrl(`Hola Enginear, quisiera consultar por: ${s.title}.`);
      const isWide = layouts[i] === "wide";
      return `<article class="svc svc--${layouts[i].replace(/ /g, " svc--")}" id="${s.slug}" aria-labelledby="${s.slug}-t">
  <div class="container svc__grid">
    <figure class="svc__media ${isWide ? "" : "frame"} reveal-img">
      ${img(s.img, s.alt, { sizes: isWide ? "100vw" : "(min-width: 960px) 52vw, 100vw" })}
      ${isWide ? "" : `<figcaption class="frame__tag mono">FIG. ${n}</figcaption>`}
    </figure>
    <div class="svc__body">
      <span class="svc__num" aria-hidden="true">${n}</span>
      <p class="mono label">Servicio ${n} / 07</p>
      <h2 class="svc__title" id="${s.slug}-t" data-split>${s.title}</h2>
      <p class="svc__text reveal">${s.text}</p>
      <div class="svc__actions reveal">
        <a class="btn btn--yellow" href="/contacto/?servicio=${s.slug}#formulario" data-magnet>Consultar por este servicio ${icon("arrow")}</a>
        <a class="btn btn--ghost-dark" href="${wa}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
      </div>
    </div>
  </div>
</article>`;
    })
    .join("");

  const areasBlock = `
<section class="areas section section--dark" aria-labelledby="areas-title">
  <div class="container areas__grid">
    ${sectionHead({ num: "08", label: "Especialidades", title: `Asesoramiento técnico <em>especializado.</em>`, lead: "Especialmente en las áreas de:" })}
    <ol class="areas__list">
      ${areas.map((a, i) => `<li class="reveal"><span class="mono">${String(i + 1).padStart(2, "0")}</span>${a}</li>`).join("")}
    </ol>
  </div>
</section>`;

  const schema = [
    breadcrumbSchema("Servicios", pathname),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Servicios de Enginear",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.title,
          description: s.text,
          url: `${site.url}${pathname}#${s.slug}`,
          provider: { "@id": `${site.url}/#organizacion` },
          areaServed: "Provincia de Córdoba",
        },
      })),
    },
  ];

  return {
    key: "servicios",
    pathname,
    priority: 0.9,
    title: "Ingeniería civil forense, peritajes y tasaciones | Enginear Córdoba",
    description:
      "Fallas estructurales, rutas y puentes, instalaciones eléctricas, vida útil del inmueble, tasaciones, cálculo de estructuras y fundaciones. Enginear, Córdoba.",
    schema,
    body:
      pageHero({
        num: "02",
        label: "Servicios",
        crumbs: "Servicios",
        title: `Diagnóstico y solución para cada <em>patología.</em>`,
        lead: about.servicios,
      }) +
      jump +
      `<div class="svc-list">${blocks}</div>` +
      areasBlock +
      ctaBand({ title: "¿No sabés qué servicio necesitás?", text: "Describinos el problema y te orientamos sobre el análisis adecuado." }),
  };
}
