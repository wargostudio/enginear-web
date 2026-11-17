import { img, imgUrl, srcsetOf, icon, whatsappUrl, site } from "../partials/helpers.mjs";
import { about, areas, audiences, services, team, gallery } from "../data/site.mjs";
import { sectionHead, ctaBand, marquee, crack } from "../partials/blocks.mjs";

export default function () {
  const daniel = team[0];

  const hero = `
<section class="hero" data-hero aria-labelledby="hero-title">
  <div class="hero__media">
    <picture>
      <source media="(max-width: 767px)" srcset="${srcsetOf("fisura-cinta")}" sizes="100vw" width="731" height="1300">
      ${img("fisura-medicion", "Ingeniero de Enginear midiendo una fisura en una pared con cinta métrica", { cls: "hero__img", eager: true, sizes: "100vw" })}
    </picture>
    <div class="hero__lens" data-lens aria-hidden="true" style="--lens-img:url('${imgUrl("fisura-medicion", 2560)}')">
      <span class="hero__lens-cross"></span>
      <span class="hero__lens-read mono" data-lens-read>INSPECCIÓN</span>
    </div>
  </div>
  <div class="hero__rule" aria-hidden="true"></div>
  <div class="container hero__content">
    <p class="kicker mono" data-scramble>${icon("crack")} Ingeniería forense · ${site.city}</p>
    <h1 class="hero__title" id="hero-title">
      <span class="hero__line" data-split>Ingeniería</span>
      <span class="hero__line hero__line--hl" data-split>forense</span>
      <span class="hero__line hero__line--sub" data-split>y patología de la construcción</span>
    </h1>
    <p class="hero__lead reveal">Identificamos patologías de la construcción y brindamos soluciones con fundamento científico y técnico.</p>
    <div class="hero__actions reveal">
      <a class="btn btn--yellow btn--lg" href="/contacto/" data-magnet>Solicitar evaluación ${icon("arrow")}</a>
      <a class="btn btn--ghost btn--lg" href="${whatsappUrl()}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
    </div>
  </div>
  <dl class="hero__facts container">
    <div><dt class="mono">Trayectoria</dt><dd><span data-count="${site.years}">${site.years}</span>+ años</dd></div>
    <div><dt class="mono">Equipo</dt><dd>Ingenieros civiles</dd></div>
    <div><dt class="mono">Peritajes</dt><dd>Perito judicial en Ingeniería Civil</dd></div>
  </dl>
  <a class="hero__scroll mono" href="#quienes-somos"><span>Scroll</span><i aria-hidden="true"></i></a>
</section>`;

  const intro = `
<section class="intro section" id="quienes-somos" aria-labelledby="intro-title">
  <div class="container intro__grid">
    <div class="intro__text">
      <p class="sec-head__label mono" data-scramble><span>01</span> Quiénes somos</p>
      <h2 class="intro__statement" id="intro-title" data-words>Somos una empresa dedicada a la <em>Ingeniería Forense.</em></h2>
      <p class="intro__body reveal">Nuestra función es identificar <strong>Patologías de la Construcción</strong> y brindar distintas soluciones, con fundamento científico, técnico y una trayectoria de más de treinta y cinco años en el rubro.</p>
      <a class="link-arrow reveal" href="/nosotros/">Conocé a Enginear ${icon("arrow")}</a>
    </div>
    <figure class="intro__media frame reveal-img">
      ${img("analisis-notebook", "Daniel Abud analizando información técnica en la oficina de Enginear", { sizes: "(min-width: 960px) 44vw, 100vw" })}
      <figcaption class="frame__tag mono">FIG. 01 — Análisis en gabinete</figcaption>
    </figure>
  </div>
  <div class="container intro__years" aria-label="Más de ${site.years} años de trayectoria">
    <div class="years">
      <span class="years__num" data-count="${site.years}">${site.years}</span><span class="years__plus">+</span>
    </div>
    <p class="years__label">años de trayectoria en el rubro de la construcción y la ingeniería forense, con una visión global y especializada.</p>
    <div class="ruler" aria-hidden="true"></div>
  </div>
</section>`;

  const marq = marquee(areas, "marquee--yellow");

  const servicesIdx = `
<section class="services-index section section--dark" aria-labelledby="servicios-title">
  <div class="container">
    ${sectionHead({ num: "02", label: "Servicios", title: `Siete frentes técnicos.<br>Una misma <em>precisión.</em>`, lead: about.servicios })}
    <ol class="sidx" data-sidx>
      ${services
        .map(
          (s, i) => `<li class="sidx__item reveal">
        <a class="sidx__link" href="/servicios/#${s.slug}" data-preview="${imgUrl(s.img, 768)}">
          <span class="sidx__num mono">${String(i + 1).padStart(2, "0")}</span>
          <span class="sidx__title">${s.title}</span>
          <span class="sidx__text">${s.text}</span>
          <span class="sidx__go" aria-hidden="true">${icon("arrow-up-right")}</span>
          <span class="sidx__thumb" aria-hidden="true">${img(s.img, "", { sizes: "120px" })}</span>
        </a>
      </li>`
        )
        .join("")}
    </ol>
    <div class="sidx__preview" data-sidx-preview aria-hidden="true"><img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" width="768" height="432"></div>
    <a class="btn btn--yellow" href="/servicios/" data-magnet>Ver todos los servicios ${icon("arrow")}</a>
  </div>
</section>`;

  const approach = `
<section class="approach section" aria-labelledby="enfoque-title">
  <div class="container approach__grid">
    <figure class="approach__media frame reveal-img">
      ${img("medidor-laser", "Distanciómetro láser en uso durante un relevamiento", { sizes: "(min-width: 960px) 34vw, 100vw" })}
      <figcaption class="frame__tag mono">FIG. 02 — Relevamiento</figcaption>
    </figure>
    <div class="approach__body">
      ${sectionHead({ num: "03", label: "Enfoque", title: `De la patología a la <em>solución definitiva.</em>` })}
      <ol class="steps">
        <li class="step reveal">
          <span class="step__icon">${icon("search")}</span>
          <div><h3>Identificar</h3><p>Detectamos y analizamos las patologías de la construcción: fallas estructurales, deterioros, vicios constructivos y fallas en instalaciones.</p></div>
        </li>
        <li class="step reveal">
          <span class="step__icon">${icon("layers")}</span>
          <div><h3>Fundamentar</h3><p>Cada diagnóstico se apoya en fundamento científico y técnico, y en más de treinta y cinco años de trayectoria en el rubro.</p></div>
        </li>
        <li class="step reveal">
          <span class="step__icon">${icon("shield")}</span>
          <div><h3>Resolver</h3><p>Proponemos soluciones definitivas: cálculo de estructuras, sistemas de fundaciones, submuración y reestabilización.</p></div>
        </li>
      </ol>
      ${crack(3, "steps__crack")}
    </div>
  </div>
</section>`;

  const forWhom = `
<section class="audiences section section--concrete" aria-labelledby="para-quien-title">
  <div class="container">
    ${sectionHead({ num: "04", label: "Para quién trabajamos", title: `Asesoramiento técnico en todas las áreas de la <em>Ingeniería Civil.</em>` })}
    <ul class="aud">
      ${audiences
        .map(
          (a, i) => `<li class="aud__item reveal"><span class="aud__icon">${icon(a.icon)}</span><span class="aud__title">${a.title}</span><span class="aud__num mono">0${i + 1}</span></li>`
        )
        .join("")}
    </ul>
    <ul class="chips reveal" aria-label="Áreas de especialidad">
      ${areas.map((a) => `<li>${a}</li>`).join("")}
    </ul>
  </div>
</section>`;

  const teamBlock = `
<section class="team-teaser section section--dark" aria-labelledby="equipo-title">
  <div class="container team-teaser__grid">
    <figure class="team-teaser__media reveal-img">
      ${img(daniel.img, "Daniel Abud, ingeniero civil de Enginear", { sizes: "(min-width: 960px) 40vw, 100vw" })}
    </figure>
    <div class="team-teaser__body">
      <p class="sec-head__label mono" data-scramble><span>05</span> Equipo</p>
      <h2 class="team-teaser__title" id="equipo-title" data-split>Ingenieros civiles con una vasta trayectoria.</h2>
      <div class="person reveal">
        <p class="person__name">${daniel.name}</p>
        <p class="person__role">${daniel.role}</p>
        <p class="person__detail">${daniel.detail}</p>
      </div>
      <div class="team-teaser__links reveal">
        <a class="link-arrow link-arrow--light" href="/nosotros/#equipo">Conocé al equipo ${icon("arrow")}</a>
        <a class="link-arrow link-arrow--light" href="${daniel.linkedin}" target="_blank" rel="noopener">${icon("linkedin")} LinkedIn</a>
      </div>
    </div>
  </div>
</section>`;

  const strip = gallery.filter((g) => g.cat !== "equipo").slice(0, 8);
  const field = `
<section class="field section" aria-labelledby="campo-title" data-hscroll>
  <div class="container field__head">
    ${sectionHead({ num: "06", label: "Trabajo de campo", title: `Medir, registrar, <em>entender.</em>` })}
    <a class="link-arrow" href="/galeria/">Ver galería completa ${icon("arrow")}</a>
  </div>
  <div class="field__viewport" data-hscroll-viewport>
    <ul class="field__track" data-hscroll-track>
      ${strip
        .map(
          (g, i) => `<li class="field__item"><figure>${img(g.img, g.alt, { sizes: "(min-width: 960px) 30vw, 78vw" })}<figcaption class="mono">${String(i + 1).padStart(2, "0")} — ${g.alt}</figcaption></figure></li>`
        )
        .join("")}
      <li class="field__item field__item--end"><a href="/galeria/" class="field__more"><span class="mono">Galería</span><strong>Ver todas las fotos</strong>${icon("arrow")}</a></li>
    </ul>
  </div>
</section>`;

  return {
    key: "inicio",
    pathname: "/",
    priority: 1.0,
    title: "Enginear | Ingeniería forense y patología de la construcción en Córdoba",
    description:
      "Ingeniería forense en Córdoba: fallas estructurales, peritajes, tasaciones, cálculo de estructuras y fundaciones. Más de 35 años de trayectoria. Consultanos.",
    preload: `<link rel="preload" as="image" type="image/webp" media="(max-width: 767px)" imagesrcset="${srcsetOf("fisura-cinta")}" imagesizes="100vw" fetchpriority="high">
  <link rel="preload" as="image" type="image/webp" media="(min-width: 768px)" imagesrcset="${srcsetOf("fisura-medicion")}" imagesizes="100vw" fetchpriority="high">`,
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.name,
        url: `${site.url}/`,
        inLanguage: "es-AR",
        publisher: { "@id": `${site.url}/#organizacion` },
      },
    ],
    body: hero + intro + marq + servicesIdx + approach + forWhom + teamBlock + field + ctaBand(),
  };
}
