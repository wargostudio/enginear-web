import { icon, whatsappUrl, site, img } from "../partials/helpers.mjs";
import { audiences, services } from "../data/site.mjs";
import { pageHero, breadcrumbSchema } from "../partials/blocks.mjs";

export default function () {
  const pathname = "/contacto/";

  const channels = `
<aside class="channels" aria-label="Canales de contacto">
  <a class="channel channel--wa" href="${whatsappUrl()}" target="_blank" rel="noopener">
    <span class="channel__icon">${icon("whatsapp")}</span>
    <span><span class="mono label">WhatsApp</span><strong>${site.phoneDisplay}</strong><small>Respuesta directa con el equipo</small></span>
    ${icon("arrow-up-right", "channel__go")}
  </a>
  <a class="channel" href="tel:${site.phoneE164}">
    <span class="channel__icon">${icon("phone")}</span>
    <span><span class="mono label">Teléfono</span><strong>${site.phoneDisplay}</strong></span>
    ${icon("arrow-up-right", "channel__go")}
  </a>
  <a class="channel" href="mailto:${site.email}">
    <span class="channel__icon">${icon("mail")}</span>
    <span><span class="mono label">Email</span><strong>${site.email}</strong></span>
    ${icon("arrow-up-right", "channel__go")}
  </a>
  <div class="channel channel--static">
    <span class="channel__icon">${icon("pin")}</span>
    <span><span class="mono label">Ubicación</span><strong>${site.city}, Argentina</strong></span>
  </div>
  <ul class="channels__social">
    ${site.social.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label} de Enginear">${icon(s.id)}<span>${s.handle}</span></a></li>`).join("")}
  </ul>
  <figure class="channels__media frame">
    ${img("informe-tecnico", "Elaboración de un informe técnico con planos", { sizes: "(min-width: 960px) 34vw, 100vw" })}
  </figure>
</aside>`;

  const form = `
<form class="form" id="formulario" action="/contacto/enviar.php" method="post" novalidate data-contact-form>
  <div class="form__head">
    <p class="mono label">Formulario</p>
    <h2 class="form__title">Envianos tu consulta</h2>
    <p class="form__sub">Te responderemos a la brevedad. Los campos con <span aria-hidden="true">*</span><span class="sr-only">asterisco</span> son obligatorios.</p>
  </div>

  <div class="field-row">
    <div class="field">
      <label for="f-nombre">Nombre y apellido <span aria-hidden="true">*</span></label>
      <input id="f-nombre" name="nombre" type="text" autocomplete="name" required maxlength="120" aria-describedby="e-nombre">
      <p class="field__error" id="e-nombre" aria-live="polite"></p>
    </div>
    <div class="field">
      <label for="f-telefono">Teléfono</label>
      <input id="f-telefono" name="telefono" type="tel" autocomplete="tel" inputmode="tel" maxlength="40" placeholder="351 000-0000">
    </div>
  </div>
  <div class="field">
    <label for="f-email">Email <span aria-hidden="true">*</span></label>
    <input id="f-email" name="email" type="email" autocomplete="email" required maxlength="160" aria-describedby="e-email">
    <p class="field__error" id="e-email" aria-live="polite"></p>
  </div>
  <div class="field-row">
    <div class="field">
      <label for="f-perfil">Consulto como</label>
      <div class="select"><select id="f-perfil" name="perfil">
        <option value="">Seleccionar…</option>
        ${audiences.map((a) => `<option>${a.title}</option>`).join("")}
      </select></div>
    </div>
    <div class="field">
      <label for="f-servicio">Servicio</label>
      <div class="select"><select id="f-servicio" name="servicio" data-service-select>
        <option value="">Seleccionar…</option>
        ${services.map((s) => `<option value="${s.slug}">${s.title}</option>`).join("")}
        <option value="otra">Otra consulta</option>
      </select></div>
    </div>
  </div>
  <div class="field">
    <label for="f-mensaje">Contanos el caso <span aria-hidden="true">*</span></label>
    <textarea id="f-mensaje" name="mensaje" rows="5" required minlength="10" maxlength="4000" aria-describedby="e-mensaje" placeholder="Tipo de construcción, ubicación, qué observaste…"></textarea>
    <p class="field__error" id="e-mensaje" aria-live="polite"></p>
  </div>
  <div class="field field--check">
    <input id="f-acepto" name="acepto" type="checkbox" value="si" required aria-describedby="e-acepto">
    <label for="f-acepto">Acepto que Enginear use estos datos para responder mi consulta (<a href="/privacidad/">política de privacidad</a>).</label>
    <p class="field__error" id="e-acepto" aria-live="polite"></p>
  </div>
  <div class="hp" aria-hidden="true">
    <label for="f-web">No completar</label>
    <input id="f-web" name="sitio_web" type="text" tabindex="-1" autocomplete="off">
  </div>
  <input type="hidden" name="t" value="" data-form-time>

  <div class="form__actions">
    <button class="btn btn--yellow btn--lg" type="submit" data-magnet><span class="btn__label">Enviar consulta</span>${icon("arrow")}</button>
    <button class="btn btn--ghost-dark btn--lg" type="button" data-form-whatsapp>${icon("whatsapp")} Enviar por WhatsApp</button>
  </div>
  <div class="form__status" role="status" aria-live="polite" data-form-status></div>
</form>`;

  return {
    key: "contacto",
    pathname,
    priority: 0.9,
    title: "Contacto: consultas técnicas y peritajes | Enginear Córdoba",
    description: `Consultá a Enginear por fallas estructurales, peritajes, tasaciones o cálculo de estructuras. WhatsApp ${site.phoneDisplay} · ${site.email} · Córdoba.`,
    schema: [
      breadcrumbSchema("Contacto", pathname),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contacto — Enginear",
        url: `${site.url}${pathname}`,
        about: { "@id": `${site.url}/#organizacion` },
      },
    ],
    body:
      pageHero({
        num: "05",
        label: "Contacto",
        crumbs: "Contacto",
        title: `Contanos <em>el caso.</em>`,
        lead: "Envía tus preguntas: te responderemos a la brevedad. Atendemos a Administraciones de Consorcios, Empresas, Profesionales y Particulares.",
      }) +
      `<section class="contact section" aria-label="Contacto"><div class="container contact__grid">${form}${channels}</div></section>`,
  };
}
