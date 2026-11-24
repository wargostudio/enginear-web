import { icon } from "../partials/helpers.mjs";
import { crack } from "../partials/blocks.mjs";

export default function () {
  return {
    key: "error",
    pathname: "/404.html",
    file: "404.html",
    noindex: true,
    title: "Página no encontrada | Enginear",
    description: "La página que buscás no existe o cambió de dirección. Volvé al inicio de Enginear, ingeniería civil forense en Córdoba.",
    body: `<section class="notfound">
  ${crack(19, "notfound__crack")}
  <div class="container notfound__inner">
    <p class="mono label">Error 404</p>
    <h1 class="notfound__title">Esta página tiene <em>una falla.</em></h1>
    <p>La dirección que buscás no existe o cambió. Volvé al inicio o escribinos.</p>
    <div class="notfound__actions">
      <a class="btn btn--yellow btn--lg" href="/">Ir al inicio ${icon("arrow")}</a>
      <a class="btn btn--ghost btn--lg" href="/contacto/">Contacto</a>
    </div>
  </div>
</section>`,
  };
}
