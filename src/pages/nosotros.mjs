import { img, icon, site } from "../partials/helpers.mjs";
import { about, areas, audiences, team } from "../data/site.mjs";
import { pageHero, ctaBand, breadcrumbSchema, sectionHead, marquee } from "../partials/blocks.mjs";

export default function () {
  const pathname = "/nosotros/";

  const media = `<figure class="page-hero__media reveal-img">${img("daniel-abud-oficina", "Daniel Abud en la oficina de Enginear", {
    sizes: "(min-width: 960px) 34vw, 80vw",
    eager: true,
  })}<figcaption class="frame__tag mono">Oficina · ${site.city}</figcaption></figure>`;

  const who = `
<section class="who section" aria-labelledby="who-title">
  <div class="container who__grid">
    <div>
      <p class="sec-head__label mono" data-scramble><span>01</span> Quiénes somos</p>
      <h2 class="intro__statement" id="who-title" data-words>Identificamos <em>Patologías de la Construcción</em> y brindamos soluciones.</h2>
    </div>
    <div class="who__text">
      <p class="reveal">${about.quienes}</p>
      <p class="reveal">${about.servicios}</p>
    </div>
  </div>
</section>`;

  const pillars = [
    { icon: "search", t: "Fundamento científico", d: "Cada análisis se apoya en una base científica." },
    { icon: "ruler", t: "Fundamento técnico", d: "Relevamos, medimos y calculamos con criterio técnico." },
    { icon: "layers", t: "Visión global y especializada", d: "Para atender mejor a las distintas patologías que pudieran presentarse." },
    { icon: "shield", t: `Más de ${site.years} años`, d: "De trayectoria en el rubro de la construcción y la ingeniería forense." },
  ];
  const pillarsBlock = `
<section class="pillars section section--dark" aria-labelledby="pilares-title">
  <div class="container">
    ${sectionHead({ num: "02", label: "Identidad", title: `Lo que sostiene <em>cada diagnóstico.</em>` })}
    <ul class="pillars__grid">
      ${pillars
        .map(
          (p, i) => `<li class="pillar reveal"><span class="pillar__num mono">0${i + 1}</span>${icon(p.icon, "pillar__icon")}<h3>${p.t}</h3><p>${p.d}</p></li>`
        )
        .join("")}
    </ul>
  </div>
</section>`;

  const [daniel] = team;
  const teamBlock = `
<section class="team section" id="equipo" aria-labelledby="team-title">
  <div class="container">
    ${sectionHead({ num: "03", label: "Equipo", title: `Ingenieros civiles <em>profesionales.</em>` })}
    <p class="team__intro reveal">${about.equipo}</p>
    <div class="team__grid">
      <article class="member member--lead reveal">
        <figure class="member__media">${img(daniel.img, `${daniel.name}, ingeniero civil de Enginear`, { sizes: "(min-width: 960px) 30vw, 100vw" })}</figure>
        <div class="member__body">
          <h3 class="member__name">${daniel.name}</h3>
          <p class="member__role">${daniel.role}</p>
          <p class="member__detail">${daniel.detail}</p>
          <a class="link-arrow" href="${daniel.linkedin}" target="_blank" rel="noopener">${icon("linkedin")} Perfil en LinkedIn</a>
        </div>
      </article>
      <figure class="team__office reveal-img frame">
        ${img("analisis-notebook", "Daniel Abud analizando información técnica en la oficina", { sizes: "(min-width: 960px) 56vw, 100vw" })}
        <figcaption class="frame__tag mono">Análisis en gabinete</figcaption>
      </figure>
    </div>
  </div>
</section>`;

  const forWhom = `
<section class="audiences section section--concrete" aria-labelledby="clientes-title">
  <div class="container">
    ${sectionHead({ num: "04", label: "Clientes", title: `Trabajamos <em>para</em>` })}
    <ul class="aud">
      ${audiences.map((a, i) => `<li class="aud__item reveal"><span class="aud__icon">${icon(a.icon)}</span><span class="aud__title">${a.title}</span><span class="aud__num mono">0${i + 1}</span></li>`).join("")}
    </ul>
  </div>
</section>`;

  return {
    key: "nosotros",
    pathname,
    priority: 0.8,
    title: "Nosotros: ingenieros civiles e ingeniería forense | Enginear Córdoba",
    description:
      "Enginear es una empresa de Ingeniería Forense de Córdoba. Ingenieros civiles con más de 35 años de trayectoria en patología de la construcción, peritajes y tasaciones.",
    schema: [
      breadcrumbSchema("Nosotros", pathname),
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: daniel.name,
        jobTitle: "Ingeniero Civil",
        description: `${daniel.role} ${daniel.detail}`,
        worksFor: { "@id": `${site.url}/#organizacion` },
        sameAs: [daniel.linkedin],
      },
    ],
    body:
      pageHero({
        num: "01",
        label: "Nosotros",
        crumbs: "Nosotros",
        title: `Ingeniería <em>a su alcance.</em>`,
        lead: "Una empresa dedicada a la Ingeniería Forense, con una trayectoria de más de treinta y cinco años en el rubro.",
        media,
      }) +
      who +
      marquee(areas, "marquee--dark") +
      pillarsBlock +
      teamBlock +
      forWhom +
      ctaBand(),
  };
}
