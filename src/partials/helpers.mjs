// Helpers compartidos por el build y las páginas.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, whatsappUrl } from "../data/site.mjs";
import { icon } from "./icons.mjs";

const SRC = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(fs.readFileSync(path.join(SRC, "assets/img/manifest.json"), "utf8"));

export const VERSION = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // ?v=YYYYMMDD

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** <img> responsive (WebP + srcset + width/height para evitar CLS). */
export function img(slug, alt, { sizes = "100vw", cls = "", eager = false, attrs = "" } = {}) {
  const m = manifest[slug];
  if (!m) throw new Error(`Imagen inexistente: ${slug}`);
  const largest = m.widths[m.widths.length - 1];
  const h = Math.round((m.h * largest) / m.w);
  return `<img src="/assets/img/${slug}-${largest}.webp" srcset="${srcsetOf(slug)}" sizes="${sizes}" width="${largest}" height="${h}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ""} ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"${attrs ? " " + attrs : ""}>`;
}

export const srcsetOf = (slug) => manifest[slug].widths.map((w) => `/assets/img/${slug}-${w}.webp ${w}w`).join(", ");

export const imgUrl = (slug, w) => {
  const m = manifest[slug];
  if (!m) throw new Error(`Imagen inexistente: ${slug}`);
  const width = w ? m.widths.find((x) => x >= w) || m.widths.at(-1) : m.widths.at(-1);
  return `/assets/img/${slug}-${width}.webp`;
};

export const imgSize = (slug) => manifest[slug];

export { icon, whatsappUrl, site };
