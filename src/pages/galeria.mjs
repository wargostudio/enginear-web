import { img, imgUrl, icon, imgSize } from "../partials/helpers.mjs";
import { gallery, galleryCats } from "../data/site.mjs";
import { pageHero, ctaBand, breadcrumbSchema } from "../partials/blocks.mjs";

export default function () {
  const pathname = "/galeria/";

  const filters = `<div class="container"><div class="filters" role="toolbar" aria-label="Filtrar fotos" data-filters>${galleryCats
    .map(
      (c, i) =>
        `<button type="button" class="filters__btn" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}<span class="mono">${
          c.id === "todo" ? gallery.length : gallery.filter((g) => g.cat === c.id).length
        }</span></button>`
    )
    .join("")}</div></div>`;

  const grid = `<section class="gallery section" aria-label="Fotos de Enginear">
  <div class="container">
    <ul class="gallery__grid" data-gallery>
      ${gallery
        .map((g, i) => {
          const m = imgSize(g.img);
          const shape = m.h > m.w * 1.2 ? "tall" : m.w > m.h * 1.3 ? "wide" : "square";
          return `<li class="gallery__item gallery__item--${shape}" data-cat="${g.cat}">
        <button type="button" class="gallery__btn" data-lightbox="${imgUrl(g.img, 2000)}" data-caption="${g.alt}" aria-label="Ampliar: ${g.alt}">
          ${img(g.img, g.alt, { sizes: "(min-width: 1100px) 30vw, (min-width: 640px) 46vw, 100vw" })}
          <span class="gallery__zoom" aria-hidden="true">${icon("expand")}</span>
          <span class="gallery__cap mono" aria-hidden="true">${String(i + 1).padStart(2, "0")} — ${g.alt}</span>
        </button>
      </li>`;
        })
        .join("")}
    </ul>
  </div>
</section>
<dialog class="lightbox" data-lightbox-dialog aria-label="Foto ampliada" data-lenis-prevent>
  <figure class="lightbox__fig"><img alt="" data-lightbox-img><figcaption class="mono" data-lightbox-cap></figcaption></figure>
  <button type="button" class="lightbox__btn lightbox__close" data-lightbox-close aria-label="Cerrar">${icon("close")}</button>
  <button type="button" class="lightbox__btn lightbox__prev" data-lightbox-prev aria-label="Foto anterior">${icon("chev-left")}</button>
  <button type="button" class="lightbox__btn lightbox__next" data-lightbox-next aria-label="Foto siguiente">${icon("chev-right")}</button>
  <p class="lightbox__count mono" data-lightbox-count></p>
</dialog>`;

  return {
    key: "galeria",
    pathname,
    priority: 0.6,
    title: "Galería: relevamientos y trabajo de campo | Enginear Córdoba",
    description:
      "Fotos de Enginear en obra y en gabinete: medición de fisuras, relevamientos con láser, cálculo estructural y el equipo de ingenieros en Córdoba.",
    schema: [breadcrumbSchema("Galería", pathname)],
    body:
      pageHero({
        num: "04",
        label: "Galería",
        crumbs: "Galería",
        title: `En obra y <em>en gabinete.</em>`,
        lead: "Relevamientos, mediciones y análisis: el trabajo de Enginear, documentado.",
      }) +
      filters +
      grid +
      ctaBand(),
  };
}
