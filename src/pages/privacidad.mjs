import { site } from "../partials/helpers.mjs";
import { pageHero, breadcrumbSchema } from "../partials/blocks.mjs";

// PENDIENTE: validar este texto con el asesor legal de Enginear.
export default function () {
  const pathname = "/privacidad/";
  return {
    key: "privacidad",
    pathname,
    priority: 0.2,
    title: "Política de privacidad | Enginear",
    description: "Cómo trata Enginear los datos personales enviados a través del formulario de contacto del sitio.",
    schema: [breadcrumbSchema("Privacidad", pathname)],
    body:
      pageHero({ num: "—", label: "Legal", crumbs: "Privacidad", title: "Política de <em>privacidad.</em>" }) +
      `<section class="section prose-wrap"><div class="container prose">
  <h2>Datos que recibimos</h2>
  <p>Cuando completás el formulario de contacto, recibimos tu nombre, email, teléfono (opcional) y el mensaje que escribas. No usamos cookies de seguimiento ni herramientas publicitarias en este sitio.</p>
  <h2>Para qué los usamos</h2>
  <p>Usamos esos datos únicamente para responder tu consulta. No los vendemos, cedemos ni compartimos con terceros con fines comerciales.</p>
  <h2>Tus derechos</h2>
  <p>Podés solicitar el acceso, la rectificación o la eliminación de tus datos escribiendo a <a href="mailto:${site.email}">${site.email}</a>, conforme a la Ley 25.326 de Protección de los Datos Personales de la República Argentina. La Agencia de Acceso a la Información Pública es el órgano de control de esta ley.</p>
</div></section>`,
  };
}
