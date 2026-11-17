/* ==========================================================================
   ENGINEAR — interacciones
   IIFE clásico (sin módulos ES). Cada init va envuelto en safe(): si uno
   falla, el resto sigue funcionando. El contenido está siempre en el HTML;
   este archivo solo agrega movimiento y comportamiento.
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var hasGsap = typeof window.gsap !== "undefined";
  var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";
  var finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lenis = null;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[enginear:" + name + "]", e); }
  }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  if (hasGsap) {
    var plugins = [];
    if (window.ScrollTrigger) plugins.push(ScrollTrigger);
    if (window.SplitText) plugins.push(SplitText);
    if (window.DrawSVGPlugin) plugins.push(DrawSVGPlugin);
    gsap.registerPlugin.apply(gsap, plugins);
    gsap.defaults({ ease: "power3.out" });
  }

  /* ---------- Scroll suave (Lenis) — solo mouse/trackpad, nunca táctil ---------- */
  function initLenis() {
    if (!window.Lenis || !finePointer || reduced) return;
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, smoothWheel: true });
    window.lenis = lenis;
    if (hasST) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }

  /* ---------- Anclas internas ---------- */
  function initAnchors() {
    doc.addEventListener("click", function (e) {
      var a = e.target.closest('a[href*="#"]');
      if (!a) return;
      var url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
      var el = doc.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      var offset = parseInt(getComputedStyle(root).scrollPaddingTop, 10) || 100;
      if (lenis) lenis.scrollTo(el, { offset: -offset, duration: 1.2 });
      else window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - offset, behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", url.hash);
    });
  }

  /* ---------- Header (se oculta al bajar) + cinta de progreso ---------- */
  function initHeader() {
    var header = doc.querySelector("[data-header]");
    var fill = doc.querySelector(".tape__fill");
    var wa = doc.querySelector(".wa-float");
    var hero = doc.querySelector("[data-hero]");
    var last = scrollY, ticking = false;
    function update() {
      var y = scrollY;
      var max = doc.documentElement.scrollHeight - innerHeight;
      if (fill) fill.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      if (wa) wa.classList.toggle("is-visible", y > (hero ? hero.offsetHeight * 0.7 : 160));
      if (header) {
        header.classList.toggle("is-scrolled", y > 40);
        var hide = y > 320 && y > last + 4 && !doc.body.classList.contains("menu-open");
        var show = y < last - 4 || y < 320;
        if (hide) { header.classList.add("is-hidden"); doc.body.classList.add("header-hidden"); }
        else if (show) { header.classList.remove("is-hidden"); doc.body.classList.remove("header-hidden"); }
      }
      last = y; ticking = false;
    }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Menú móvil ---------- */
  function initMenu() {
    var btn = doc.querySelector("[data-menu-toggle]");
    var menu = doc.querySelector("[data-mobile-menu]");
    if (!btn || !menu) return;
    function setOpen(open) {
      btn.setAttribute("aria-expanded", String(open));
      btn.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
      doc.body.classList.toggle("menu-open", open);
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(function () { menu.classList.add("is-open"); });
        if (lenis) lenis.stop();
      } else {
        menu.classList.remove("is-open");
        setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 600);
        if (lenis) lenis.start();
      }
    }
    btn.addEventListener("click", function () { setOpen(btn.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setOpen(false); btn.focus(); }
    });
    matchMedia("(min-width: 960px)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });
  }

  /* ---------- Revelados con IntersectionObserver (+ red de seguridad 6s) ---------- */
  function initReveal() {
    var items = $$(".reveal:not([data-split]), .reveal-img");
    if (!("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("is-visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var sibs = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
        var idx = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 70, 420) + "ms";
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    // Fotos de servicios: se disparan apenas antes de entrar en pantalla
    var ioFast = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        ioFast.unobserve(en.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px 12% 0px" });
    items.forEach(function (el) { (el.closest(".svc") && el.classList.contains("reveal-img") ? ioFast : io).observe(el); });
    // y se descargan con anticipación para que no aparezcan vacías
    $$(".svc .reveal-img img[loading='lazy']").forEach(function (im, i) { if (i < 3) im.loading = "eager"; });
    setTimeout(function () { items.forEach(function (el) { el.classList.add("is-visible"); }); }, 6000);
  }

  /* ---------- Títulos: división en líneas/palabras (GSAP SplitText) ---------- */
  function initSplit() {
    var els = $$("[data-split]");
    if (!hasST || !window.SplitText) { els.forEach(function (el) { el.classList.add("split-ready"); }); return; }
    els.forEach(function (el) {
      el.classList.remove("reveal");
      var inHero = !!el.closest(".hero, .page-hero");
      SplitText.create(el, {
        type: "lines,words",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit: function (self) {
          el.classList.add("split-ready");
          var heroIndex = inHero ? $$("[data-split]", el.closest(".hero, .page-hero")).indexOf(el) : 0;
          return gsap.from(self.words, {
            yPercent: 110,
            duration: 1.05,
            ease: "expo.out",
            stagger: 0.035,
            delay: inHero ? 0.15 + heroIndex * 0.12 : 0,
            scrollTrigger: inHero ? null : { trigger: el, start: "top 88%", once: true },
          });
        },
      });
    });
  }

  /* ---------- Frase que se "lee" con el scroll (palabra por palabra) ---------- */
  function initWords() {
    $$("[data-words]").forEach(function (el) {
      if (!hasST || !window.SplitText || reduced) return;
      var split = SplitText.create(el, { type: "words", wordsClass: "w" });
      gsap.fromTo(split.words, { opacity: 0.16 }, {
        opacity: 1, ease: "none", stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.6 },
      });
    });
  }

  /* ---------- Etiquetas técnicas que se "desencriptan" ---------- */
  function initScramble() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·#";
    var els = $$("[data-scramble]");
    if (!("IntersectionObserver" in window)) return;
    function run(el) {
      var nodes = [];
      var walker = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        var n = walker.currentNode;
        if (n.parentElement && n.parentElement.closest("span") && n.parentElement !== el && n.parentElement.tagName === "SPAN") continue;
        if (n.nodeValue.trim()) nodes.push({ node: n, text: n.nodeValue });
      }
      var start = performance.now(), dur = 750;
      (function frame(now) {
        var p = Math.min(1, (now - start) / dur);
        nodes.forEach(function (o) {
          var reveal = Math.floor(o.text.length * p);
          var out = "";
          for (var i = 0; i < o.text.length; i++) {
            var c = o.text[i];
            out += i < reveal || c === " " ? c : chars[(Math.random() * chars.length) | 0];
          }
          o.node.nodeValue = out;
        });
        if (p < 1) requestAnimationFrame(frame);
      })(start);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contadores ---------- */
  function initCount() {
    var els = $$("[data-count]");
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, to = parseInt(el.getAttribute("data-count"), 10) || 0, t0 = performance.now(), dur = 1600;
        (function frame(now) {
          var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(to * e);
          if (p < 1) requestAnimationFrame(frame);
        })(t0);
        io.unobserve(el);
      });
    }, { threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Cinta de texto: velocidad y sentido según el scroll ---------- */
  function initMarquee() {
    $$("[data-marquee]").forEach(function (m) {
      var track = m.querySelector(".marquee__track");
      if (!track) return;
      if (!hasGsap) { m.classList.add("marquee--css"); return; }
      var x = 0, dir = -1, base = 0.045, boost = 0;
      var visible = true;
      if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(m);
      if (hasST) {
        ScrollTrigger.create({
          trigger: m, start: "top bottom", end: "bottom top",
          onUpdate: function (self) {
            var v = self.getVelocity();
            dir = v >= 0 ? -1 : 1;
            boost = Math.min(Math.abs(v) / 900, 3.2);
          },
        });
      }
      gsap.ticker.add(function (time, delta) {
        if (!visible) return;
        boost *= 0.94;
        x += dir * (base + boost * 0.12) * (delta / 16.67);
        if (x <= -50) x += 50;
        if (x > 0) x -= 50;
        track.style.transform = "translate3d(" + x + "%,0,0)";
      });
    });
  }

  /* ---------- Lupa de inspección del hero ---------- */
  function initLens() {
    var hero = doc.querySelector("[data-hero]");
    var lens = hero && hero.querySelector("[data-lens]");
    var img = hero && hero.querySelector(".hero__img");
    if (!lens || !img || !matchMedia("(min-width: 960px)").matches) return;
    var read = lens.querySelector("[data-lens-read]");
    var Z = 2.2, size = 180, rect, cover;
    function measure() {
      rect = hero.getBoundingClientRect();
      size = innerWidth < 640 ? 120 : innerWidth < 1100 ? 160 : 190;
      lens.style.setProperty("--size", size + "px");
      var iw = img.naturalWidth || 2560, ih = img.naturalHeight || 1440;
      var s = Math.max(rect.width / iw, rect.height / ih);
      var rw = iw * s, rh = ih * s;
      cover = { s: s, rw: rw, rh: rh, ox: (rect.width - rw) * 0.62, oy: (rect.height - rh) * 0.5, iw: iw, ih: ih };
      lens.style.setProperty("--bs", rw * Z + "px " + rh * Z + "px");
    }
    function place(x, y) {
      if (!cover) return;
      lens.style.setProperty("--lx", x + "px");
      lens.style.setProperty("--ly", y + "px");
      var px = x - cover.ox, py = y - cover.oy;
      lens.style.setProperty("--bx", -(px * Z - size / 2) + "px");
      lens.style.setProperty("--by", -(py * Z - size / 2) + "px");
      if (read) {
        var ix = Math.round((px / cover.rw) * cover.iw), iy = Math.round((py / cover.rh) * cover.ih);
        read.textContent = "X " + String(Math.max(0, ix)).padStart(4, "0") + " · Y " + String(Math.max(0, iy)).padStart(4, "0") + " · " + Z + "×";
      }
    }
    // Punto de reposo: sobre la cinta métrica, a la derecha del título
    function restPoint(t) {
      var cx = Math.max(cover.ox + cover.rw * 0.74, rect.width * 0.72), cy = cover.oy + cover.rh * 0.3;
      cx = Math.min(Math.max(cx, size * 0.6), rect.width - size * 0.6);
      cy = Math.min(Math.max(cy, size * 0.6 + 70), rect.height * 0.5);
      return { x: cx + Math.cos(t * 0.6) * size * 0.35, y: cy + Math.sin(t * 0.9) * size * 0.22 };
    }
    var following = false, t = 0, cur = null, target = null;
    function ready() {
      measure();
      cur = restPoint(0); target = cur;
      place(cur.x, cur.y);
      lens.classList.add("is-on");
      (function loop() {
        if (!following) { t += reduced ? 0 : 0.016; target = restPoint(t); }
        cur.x += (target.x - cur.x) * 0.14;
        cur.y += (target.y - cur.y) * 0.14;
        if (rect.bottom > 0) place(cur.x, cur.y);
        requestAnimationFrame(loop);
      })();
    }
    if (finePointer) {
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        following = true;
        target = { x: e.clientX - r.left, y: e.clientY - r.top };
      });
      hero.addEventListener("pointerleave", function () { following = false; });
    }
    addEventListener("resize", function () { measure(); }, { passive: true });
    addEventListener("scroll", function () { rect = hero.getBoundingClientRect(); }, { passive: true });
    if (img.complete) ready(); else img.addEventListener("load", ready, { once: true });
  }

  /* ---------- Hero: parallax suave ---------- */
  function initHeroParallax() {
    if (!hasST || reduced) return;
    var hero = doc.querySelector("[data-hero]");
    if (hero) {
      gsap.to(hero.querySelector(".hero__img"), { yPercent: 12, scale: 1.06, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(hero.querySelector(".hero__content"), { yPercent: -10, opacity: 0.2, ease: "none", scrollTrigger: { trigger: hero, start: "40% top", end: "bottom top", scrub: true } });
    }
    var ruler = doc.querySelector(".ruler");
    if (ruler) gsap.fromTo(ruler, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ruler, start: "top 95%", end: "top 55%", scrub: 0.5 } });
    $$(".svc--wide .svc__media img").forEach(function (im) {
      gsap.fromTo(im, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: im.closest(".svc"), start: "top bottom", end: "bottom top", scrub: true } });
    });
  }

  /* ---------- Fisuras que se dibujan ---------- */
  function initCracks() {
    if (!hasST || !window.DrawSVGPlugin) return;
    $$(".crack").forEach(function (c) {
      var paths = c.querySelectorAll("path");
      var main = c.querySelector(".crack__main"), branches = c.querySelectorAll(".crack__branch");
      gsap.set(paths, { drawSVG: "0%" });
      var tl = gsap.timeline({ scrollTrigger: { trigger: c, start: "top 92%", end: "bottom 40%", scrub: 0.8 } });
      tl.to(main, { drawSVG: "100%", ease: "none", duration: 1 }).to(branches, { drawSVG: "100%", ease: "none", duration: 0.35, stagger: 0.1 }, 0.45);
      if (c.closest(".page-hero, .notfound")) { tl.scrollTrigger.kill(); tl.duration(1.8).play(0.0001); }
    });
  }

  /* ---------- Índice de servicios: vista previa que sigue al cursor ---------- */
  function initServicePreview() {
    var list = doc.querySelector("[data-sidx]");
    var pv = doc.querySelector("[data-sidx-preview]");
    if (!list || !pv || !finePointer || !hasGsap) return;
    var im = pv.querySelector("img");
    var xTo = gsap.quickTo(pv, "x", { duration: 0.55, ease: "power3" });
    var yTo = gsap.quickTo(pv, "y", { duration: 0.55, ease: "power3" });
    list.addEventListener("pointermove", function (e) { xTo(e.clientX + 28); yTo(e.clientY - 110); });
    list.addEventListener("pointerover", function (e) {
      var a = e.target.closest("[data-preview]");
      if (!a) return;
      var src = a.getAttribute("data-preview");
      if (im.getAttribute("src") !== src) im.setAttribute("src", src);
      pv.classList.add("is-on");
    });
    list.addEventListener("pointerleave", function () { pv.classList.remove("is-on"); });
    // precarga discreta
    setTimeout(function () { $$("[data-preview]", list).forEach(function (a) { var i = new Image(); i.src = a.getAttribute("data-preview"); }); }, 2500);
  }

  /* ---------- Botones magnéticos ---------- */
  function initMagnet() {
    if (!finePointer || !hasGsap) return;
    $$("[data-magnet]").forEach(function (b) {
      var xTo = gsap.quickTo(b, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      var yTo = gsap.quickTo(b, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.22);
        yTo((e.clientY - r.top - r.height / 2) * 0.3);
      });
      b.addEventListener("pointerleave", function () { xTo(0); yTo(0); });
    });
  }

  /* ---------- Trabajo de campo: scroll horizontal fijado (escritorio) ---------- */
  function initHScroll() {
    var sec = doc.querySelector("[data-hscroll]");
    if (!sec || !hasST || reduced) return;
    var track = sec.querySelector("[data-hscroll-track]");
    var mm = gsap.matchMedia();
    mm.add("(min-width: 960px)", function () {
      sec.classList.add("is-pinned");
      var dist = function () { return Math.max(0, track.scrollWidth - innerWidth); };
      gsap.to(track, {
        x: function () { return -dist(); },
        ease: "none",
        scrollTrigger: { trigger: sec, start: "top top", end: function () { return "+=" + dist(); }, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      return function () { sec.classList.remove("is-pinned"); };
    });
  }

  /* ---------- Servicios: índice fijo con sección activa ---------- */
  function initJump() {
    var links = $$(".jump__list a");
    if (!links.length || !hasST) return;
    var list = doc.querySelector(".jump__list");
    links.forEach(function (a) {
      var target = doc.querySelector(a.getAttribute("href"));
      if (!target) return;
      ScrollTrigger.create({
        trigger: target, start: "top 50%", end: "bottom 50%",
        onToggle: function (self) {
          if (!self.isActive) return;
          links.forEach(function (l) { l.classList.toggle("is-active", l === a); });
          list.scrollTo({ left: a.offsetLeft - 24, behavior: "smooth" });
        },
      });
    });
  }

  /* ---------- Galería: filtros + lightbox ---------- */
  function initGallery() {
    var grid = doc.querySelector("[data-gallery]");
    if (!grid) return;
    var items = $$(".gallery__item", grid);
    var filters = $$("[data-filter]");
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        var cat = f.getAttribute("data-filter");
        filters.forEach(function (o) { o.setAttribute("aria-pressed", String(o === f)); });
        items.forEach(function (it) { it.classList.toggle("is-hidden", cat !== "todo" && it.getAttribute("data-cat") !== cat); });
        if (hasGsap) gsap.fromTo(items.filter(function (i) { return !i.classList.contains("is-hidden"); }), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, clearProps: "transform" });
        if (hasST) ScrollTrigger.refresh();
      });
    });

    var dlg = doc.querySelector("[data-lightbox-dialog]");
    if (!dlg || typeof dlg.showModal !== "function") return;
    var lbImg = dlg.querySelector("[data-lightbox-img]");
    var lbCap = dlg.querySelector("[data-lightbox-cap]");
    var lbCount = dlg.querySelector("[data-lightbox-count]");
    var current = 0, visible = [], opener = null;
    function show(i) {
      visible = items.filter(function (it) { return !it.classList.contains("is-hidden"); }).map(function (it) { return it.querySelector("[data-lightbox]"); });
      current = (i + visible.length) % visible.length;
      var b = visible[current];
      lbImg.src = b.getAttribute("data-lightbox");
      lbImg.alt = b.getAttribute("data-caption");
      lbCap.textContent = b.getAttribute("data-caption");
      lbCount.textContent = String(current + 1).padStart(2, "0") + " / " + String(visible.length).padStart(2, "0");
    }
    grid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-lightbox]");
      if (!b) return;
      opener = b;
      var vis = items.filter(function (it) { return !it.classList.contains("is-hidden"); }).map(function (it) { return it.querySelector("[data-lightbox]"); });
      show(vis.indexOf(b));
      dlg.showModal();
      if (lenis) lenis.stop();
    });
    dlg.querySelector("[data-lightbox-close]").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector("[data-lightbox-prev]").addEventListener("click", function () { show(current - 1); });
    dlg.querySelector("[data-lightbox-next]").addEventListener("click", function () { show(current + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") show(current + 1);
      if (e.key === "ArrowLeft") show(current - 1);
    });
    dlg.addEventListener("close", function () { if (lenis) lenis.start(); if (opener) opener.focus(); });
    var sx = null;
    dlg.addEventListener("pointerdown", function (e) { sx = e.clientX; });
    dlg.addEventListener("pointerup", function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- Formulario de contacto ---------- */
  function initForm() {
    var form = doc.querySelector("[data-contact-form]");
    if (!form) return;
    var status = form.querySelector("[data-form-status]");
    var submit = form.querySelector('button[type="submit"]');
    var timeField = form.querySelector("[data-form-time]");
    if (timeField) timeField.value = String(Date.now());

    var params = new URLSearchParams(location.search);
    var svc = params.get("servicio");
    var select = form.querySelector("[data-service-select]");
    if (svc && select && select.querySelector('option[value="' + CSS.escape(svc) + '"]')) select.value = svc;
    var estado = params.get("estado");
    if (estado === "enviado") setStatus(true, "Gracias por tu mensaje. Ha sido enviado: te responderemos a la brevedad.");
    if (estado === "error") setStatus(false, "Hubo un error al intentar enviar su mensaje. Por favor, intentá nuevamente o escribinos por WhatsApp.");

    var messages = {
      nombre: "Ingresá tu nombre.",
      email: "Ingresá un email válido.",
      mensaje: "Contanos un poco más sobre tu consulta (mínimo 10 caracteres).",
      acepto: "Necesitamos tu consentimiento para responderte.",
    };
    function setError(name, msg) {
      var input = form.elements[name];
      if (!input) return;
      var field = input.closest(".field");
      var err = doc.getElementById("e-" + name);
      if (field) field.classList.toggle("is-invalid", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg || "";
    }
    function validate() {
      var ok = true, first = null;
      ["nombre", "email", "mensaje", "acepto"].forEach(function (n) {
        var el = form.elements[n];
        var valid = el.type === "checkbox" ? el.checked : el.checkValidity() && el.value.trim().length >= (n === "mensaje" ? 10 : n === "nombre" ? 2 : 1);
        setError(n, valid ? "" : messages[n]);
        if (!valid) { ok = false; first = first || el; }
      });
      if (first) first.focus();
      return ok;
    }
    function setStatus(ok, msg) {
      status.className = "form__status " + (ok ? "is-ok" : "is-error");
      status.textContent = msg;
    }
    ["nombre", "email", "mensaje", "acepto"].forEach(function (n) {
      var el = form.elements[n];
      el.addEventListener(el.type === "checkbox" ? "change" : "blur", function () {
        if (el.closest(".field").classList.contains("is-invalid")) validate();
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;
      submit.disabled = true; submit.classList.add("is-loading");
      submit.querySelector(".btn__label").textContent = "Enviando";
      status.className = "form__status"; status.textContent = "";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) { return r.json().catch(function () { return { ok: false, message: "" }; }); })
        .then(function (res) {
          if (res.ok) {
            setStatus(true, res.message || "Gracias por tu mensaje. Ha sido enviado.");
            form.reset();
            if (timeField) timeField.value = String(Date.now());
          } else {
            Object.keys(res.errors || {}).forEach(function (k) { setError(k, res.errors[k]); });
            setStatus(false, res.message || "Hubo un error al intentar enviar su mensaje. Por favor, intentá nuevamente.");
          }
        })
        .catch(function () {
          setStatus(false, "No pudimos conectar con el servidor. Probá de nuevo o escribinos por WhatsApp.");
        })
        .finally(function () {
          submit.disabled = false; submit.classList.remove("is-loading");
          submit.querySelector(".btn__label").textContent = "Enviar consulta";
          status.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
        });
    });

    // Enviar por WhatsApp con lo que haya escrito
    var waBtn = form.querySelector("[data-form-whatsapp]");
    if (waBtn) waBtn.addEventListener("click", function () {
      var f = form.elements;
      var sel = f.servicio.options[f.servicio.selectedIndex];
      var lines = ["Hola Enginear, quisiera hacer una consulta."];
      if (f.nombre.value.trim()) lines.push("Nombre: " + f.nombre.value.trim());
      if (f.perfil.value) lines.push("Consulto como: " + f.perfil.value);
      if (f.servicio.value) lines.push("Servicio: " + sel.text);
      if (f.mensaje.value.trim()) lines.push("", f.mensaje.value.trim());
      window.open("https://wa.me/5493516233053?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    });
  }

  /* ---------- Arranque ---------- */
  function boot() {
    safe(initLenis, "lenis");
    safe(initAnchors, "anchors");
    safe(initHeader, "header");
    safe(initMenu, "menu");
    safe(initSplit, "split");
    safe(initWords, "words");
    safe(initReveal, "reveal");
    safe(initScramble, "scramble");
    safe(initCount, "count");
    safe(initMarquee, "marquee");
    safe(initLens, "lens");
    safe(initHeroParallax, "parallax");
    safe(initCracks, "cracks");
    safe(initServicePreview, "service-preview");
    safe(initMagnet, "magnet");
    safe(initHScroll, "hscroll");
    safe(initJump, "jump");
    safe(initGallery, "gallery");
    safe(initForm, "form");
    if (hasST) {
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { ScrollTrigger.refresh(); });
      addEventListener("load", function () { ScrollTrigger.refresh(); });
    }
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
