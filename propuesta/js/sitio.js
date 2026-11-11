(() => {
  'use strict';

  /* ---------- 1. Ayudantes, banderas y tokens ---------- */
  const d = document;
  const html = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const safe = (fn) => { try { return fn(); } catch (e) { console.warn('[sitio]', e); } };
  const SVGNS = 'http://www.w3.org/2000/svg';
  const WA = '50664781319'; // WhatsApp del centro (+506 6478 1319)

  // Movimiento de la marca: cálido y de juego
  const M = { ease: 'power2.out', easeIO: 'power2.inOut', pop: 'back.out(1.4)', dur: 1, stagger: 0.09, dist: 26, lerp: 0.1 };

  /* ---------- 2. Lo que funciona siempre (con o sin animación) ---------- */

  // Enlaces de WhatsApp con su mensaje según el lugar
  safe(() => {
    $$('[data-wa]').forEach((a) => { a.href = `https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.wa)}`; });
  });

  safe(() => { const a = $('[data-anio]'); if (a) a.textContent = String(new Date().getFullYear()); });

  // Costuras: puntadas redondas dibujadas en SVG sobre cada retazo
  let uid = 0;
  const costuras = new Map();
  const crearCostura = (el, inset, radio) => {
    const id = `cm${uid++}`;
    const svg = d.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'costura');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.innerHTML = `<defs><mask id="${id}" maskUnits="userSpaceOnUse"><rect fill="none" pathLength="1" stroke-dashoffset="0"/></mask></defs><rect mask="url(#${id})"/>`;
    el.appendChild(svg);
    el.classList.add('cosido');
    const [mask, rect] = $$('rect', svg);
    const medir = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      [mask, rect].forEach((r) => {
        r.setAttribute('x', inset); r.setAttribute('y', inset);
        r.setAttribute('width', Math.max(0, w - inset * 2)); r.setAttribute('height', Math.max(0, h - inset * 2));
        r.setAttribute('rx', radio); r.setAttribute('ry', radio);
      });
    };
    medir();
    costuras.set(el, { mask, medir });
  };
  safe(() => {
    const inset = innerWidth >= 1024 ? 9 : 7;
    $$('[data-retazo]').forEach((el) => crearCostura(el, inset, 3));
    $$('[data-cta]').forEach((el) => crearCostura(el, 6, 10));
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver((entries) => entries.forEach((e) => { const c = costuras.get(e.target); c && c.medir(); }));
      costuras.forEach((_, el) => ro.observe(el));
    }
  });

  // Hilo que une los tres pasos de inscripción (se calcula con las posiciones reales)
  const trazarHiloPasos = () => {
    const caja = $('.r-pasos');
    const nums = $$('.paso__num');
    if (!caja || nums.length < 2) return null;
    let svg = $('.hilo-pasos', caja);
    if (!svg) {
      svg = d.createElementNS(SVGNS, 'svg');
      svg.setAttribute('class', 'hilo-pasos');
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = '<path/>';
      caja.prepend(svg);
    }
    const r = caja.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
    const pts = nums.map((n) => { const b = n.getBoundingClientRect(); return [b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top]; });
    let dPath = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1]; const [x1, y1] = pts[i];
      const horizontal = Math.abs(x1 - x0) > Math.abs(y1 - y0);
      dPath += horizontal
        ? ` C${x0 + (x1 - x0) * 0.3},${y0 - 64} ${x0 + (x1 - x0) * 0.7},${y1 - 64} ${x1},${y1}`
        : ` C${x0 - 60},${y0 + (y1 - y0) * 0.35} ${x1 - 60},${y0 + (y1 - y0) * 0.65} ${x1},${y1}`;
    }
    const p = $('path', svg);
    p.setAttribute('d', dPath);
    return p;
  };
  safe(trazarHiloPasos);
  let anchoPrevio = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth === anchoPrevio) return;
    anchoPrevio = innerWidth;
    clearTimeout(trazarHiloPasos.t);
    trazarHiloPasos.t = setTimeout(() => safe(trazarHiloPasos), 200);
  });

  // Lenis (se crea más abajo si hay GSAP)
  let lenis = null;

  // Menú del celular
  safe(() => {
    const menu = $('[data-menu]');
    const abrir = $('[data-abrir-menu]');
    const cerrar = $('[data-cerrar-menu]');
    if (!menu || !abrir) return;
    let ultimoFoco = null;
    const setAbierto = (abierto) => {
      if (abierto) {
        ultimoFoco = d.activeElement;
        menu.setAttribute('data-abierto', '');
        abrir.setAttribute('aria-expanded', 'true');
        d.body.style.overflow = 'hidden';
        lenis && lenis.stop();
        costuras.forEach((c, el) => { if (menu.contains(el)) c.medir(); });
        if (hasGSAP && !RM) gsap.fromTo($('[data-retazo]', menu), { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: M.pop, stagger: 0.04 });
        (cerrar || menu).focus();
      } else {
        menu.removeAttribute('data-abierto');
        abrir.setAttribute('aria-expanded', 'false');
        d.body.style.overflow = '';
        lenis && lenis.start();
        ultimoFoco && ultimoFoco.focus && ultimoFoco.focus();
      }
    };
    abrir.addEventListener('click', () => setAbierto(true));
    cerrar && cerrar.addEventListener('click', () => setAbierto(false));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setAbierto(false); });
    d.addEventListener('keydown', (e) => {
      if (!menu.hasAttribute('data-abierto')) return;
      if (e.key === 'Escape') setAbierto(false);
      if (e.key === 'Tab') { // el foco no se sale del menú
        const f = $$('a,button', menu); const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  });

  // Barra superior: se esconde al bajar y vuelve al subir. Barra fija del celular: aparece tras la portada
  // y se esconde al llegar a Visítanos o al pie, para no repetir el botón.
  safe(() => {
    const barra = $('[data-barra]');
    const fija = $('[data-barra-fija]');
    const portada = $('[data-portada]');
    let y0 = scrollY;
    let pasoPortada = false;
    let enContacto = false;
    const actualizarFija = () => { if (fija) fija.toggleAttribute('data-visible', pasoPortada && !enContacto); };
    addEventListener('scroll', () => {
      const y = scrollY;
      const menuAbierto = $('[data-menu]')?.hasAttribute('data-abierto');
      if (barra && !menuAbierto && portada) {
        const bajoPortada = portada.getBoundingClientRect().bottom < 0;
        barra.classList.toggle('barra--oculta', bajoPortada && y > y0 + 4);
        if (y < y0 - 4 || !bajoPortada) barra.classList.remove('barra--oculta');
      }
      y0 = y;
    }, { passive: true });
    const medirPortada = () => { if (portada) { pasoPortada = portada.getBoundingClientRect().bottom < 0; actualizarFija(); } };
    addEventListener('scroll', medirPortada, { passive: true });
    medirPortada();
    if ('IntersectionObserver' in window) {
      const zonas = [$('[data-contacto]'), $('.pie')].filter(Boolean);
      const visibles = new Set();
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => (e.isIntersecting ? visibles.add(e.target) : visibles.delete(e.target)));
        enContacto = visibles.size > 0; actualizarFija();
      }, { rootMargin: '0px 0px -20% 0px' });
      zonas.forEach((z) => io.observe(z));
    }
  });

  // Visor de fotos de las instalaciones
  safe(() => {
    const visor = $('[data-visor]');
    if (!visor || typeof visor.showModal !== 'function') return;
    const img = $('[data-visor-img]', visor);
    const pie = $('[data-visor-pie]', visor);
    let origen = null;
    $$('[data-ampliar]').forEach((b) => b.addEventListener('click', () => {
      origen = b;
      img.src = b.dataset.ampliar;
      img.alt = $('img', b)?.alt || '';
      pie.textContent = b.dataset.pie || '';
      visor.showModal();
      lenis && lenis.stop();
    }));
    $('[data-visor-cerrar]', visor)?.addEventListener('click', () => visor.close());
    visor.addEventListener('click', (e) => { if (e.target === visor) visor.close(); });
    visor.addEventListener('close', () => { lenis && lenis.start(); origen && origen.focus(); });
  });

  // Formulario: arma el mensaje y abre WhatsApp
  safe(() => {
    const form = $('[data-form]');
    if (!form) return;
    const err = $('[data-form-error]', form);
    const f = form.elements;
    const limpiar = (el) => el.removeAttribute('aria-invalid');
    [f.nombre, f.edad].forEach((el) => el.addEventListener('input', () => limpiar(el)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const faltan = [];
      if (!f.nombre.value.trim()) faltan.push(f.nombre);
      if (!f.edad.value) faltan.push(f.edad);
      if (faltan.length) {
        faltan.forEach((el) => el.setAttribute('aria-invalid', 'true'));
        err.textContent = faltan.length === 2
          ? 'Escribe tu nombre y elige la edad de tu hijo para continuar.'
          : (faltan[0] === f.nombre ? 'Escribe tu nombre para continuar.' : 'Elige la edad de tu hijo para continuar.');
        err.setAttribute('data-visible', '');
        faltan[0].focus();
        return;
      }
      err.removeAttribute('data-visible');
      const lineas = ['Hola, quisiera agendar una visita al Centro Infantil Dejando Huella.', ''];
      const add = (k, v) => { if (v) lineas.push(`${k}: ${v}`); };
      add('Nombre', f.nombre.value.trim());
      add('Edad de mi hijo o hija', f.edad.value);
      add('Horario preferido para la visita', f.horario.value);
      add('Comentario', f.mensaje.value.trim());
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(lineas.join('\n'))}`, '_blank', 'noopener');
    });
  });

  // Comparador antes y después (portada de la propuesta)
  safe(() => {
    const marco = $('[data-comparador]');
    if (!marco) return;
    const rango = $('input[type="range"]', marco);
    const set = () => marco.style.setProperty('--pos', `${rango.value}%`);
    rango.addEventListener('input', set);
    set();
  });

  // Notas de la propuesta (qué mejora cada parte)
  safe(() => {
    const b = $('[data-notas]');
    const t = $('[data-notas-texto]');
    if (!b) return;
    b.addEventListener('click', () => {
      const on = !html.classList.contains('ver-notas');
      html.classList.toggle('ver-notas', on);
      b.setAttribute('aria-pressed', String(on));
      if (t) t.textContent = on ? 'Ocultar notas' : 'Ver notas';
      costuras.forEach((c) => c.medir());
      if (hasGSAP) ScrollTrigger.refresh();
    });
  });

  /* ---------- 3. Sin GSAP: todo completo y quieto ---------- */
  if (!hasGSAP) { html.classList.remove('js'); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Lenis y enlaces internos suaves
  safe(() => {
    if (!RM && window.Lenis && M.lerp) {
      lenis = new Lenis({ lerp: M.lerp, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    d.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      const el = hash.length > 1 && d.getElementById(hash.slice(1));
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: hash === '#inicio' ? 0 : -96, duration: 1.4 });
      else el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
      history.replaceState(null, '', hash);
    });
  });

  // Huella al tocar: rima de la firma. Nunca bloquea el toque ni aparece sobre controles.
  const COLORES = ['#0D1A3C', '#C96F62', '#B9862E', '#6C86AF', '#7D8E7D'];
  let ci = 0, vivas = 0;
  const dejarHuella = (x, y) => {
    if (RM || vivas > 10) return;
    vivas++;
    const s = d.createElementNS(SVGNS, 'svg');
    s.setAttribute('viewBox', '0 0 100 104');
    s.setAttribute('class', 'huella-toque');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = `<use href="#huella" fill="${COLORES[ci++ % COLORES.length]}"/>`;
    s.style.left = `${x}px`; s.style.top = `${y}px`;
    d.body.appendChild(s);
    gsap.timeline({ onComplete: () => { s.remove(); vivas--; } })
      .fromTo(s, { scale: 1.35, rotation: gsap.utils.random(-28, 28), autoAlpha: 0 }, { scale: 1, autoAlpha: 0.92, duration: 0.28, ease: 'back.out(2)' })
      .to(s, { autoAlpha: 0, scale: 0.94, duration: 1.1, ease: 'power1.in' }, '+=0.5');
  };
  safe(() => {
    $('.sitio')?.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a,button,input,select,textarea,summary,label,iframe,[data-menu]')) return;
      dejarHuella(e.clientX, e.clientY);
    });
  });

  /* ---------- 4. Menos movimiento: todo visible, sin animaciones ---------- */
  if (RM) return;

  /* ---------- 5. La firma: los retazos caen y se acomodan, el titular sube,
                   la puntada los cose y rodea el botón; la huella se estampa ---------- */
  const firmaPortada = () => {
    const portada = $('[data-portada]');
    const piezas = $$('[data-barra] [data-pieza], [data-portada] [data-pieza]').filter((el) => el.offsetParent !== null);
    const titular = $('[data-titular]', portada);
    const cta = $('[data-cta]', portada);
    const sello = $('[data-sello]', portada);
    const mascaras = piezas.map((p) => costuras.get(p)).filter(Boolean).map((c) => c.mask);
    const mascaraCta = cta && costuras.get(cta) ? costuras.get(cta).mask : null;
    let lineas = [];
    if (titular && window.SplitText) lineas = SplitText.create(titular, { type: 'lines', mask: 'lines' }).lines;

    const tl = gsap.timeline({ paused: true, defaults: { ease: M.ease } });
    tl.fromTo(piezas, { y: -M.dist * 1.6, rotation: () => gsap.utils.random(-5, 5), autoAlpha: 0 },
        { y: 0, rotation: 0, autoAlpha: 1, duration: M.dur * 0.8, ease: M.pop, stagger: 0.07, clearProps: 'transform' }, 0)
      .fromTo(mascaras, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.95, ease: 'power1.inOut', stagger: 0.05 }, 0.55);
    if (lineas.length) tl.fromTo(lineas, { yPercent: 105 }, { yPercent: 0, duration: M.dur, stagger: M.stagger }, 0.45);
    if (cta) {
      tl.fromTo(cta, { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: M.pop, clearProps: 'transform' }, 1.2);
      if (mascaraCta) tl.fromTo(mascaraCta, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power1.inOut' }, 1.35);
    }
    if (sello) tl.fromTo(sello, { scale: 1.6, rotation: -22, autoAlpha: 0 }, { scale: 1, rotation: -8, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.4)' }, 1.75);
    tl.progress(0);

    const saltar = () => { if (tl.progress() > 0 && tl.progress() < 1) tl.progress(1); };
    portada.addEventListener('pointerdown', saltar, { passive: true });
    // Corre cuando la portada aparece (la página abre con la portada de la propuesta)
    ScrollTrigger.create({ trigger: portada, start: 'top 80%', once: true, onEnter: () => {
      tl.play();
      setTimeout(() => { if (tl.progress() < 1) tl.progress(1); }, 4500);
    } });
    return tl;
  };

  // Arranque: espera las fuentes (con tope) para medir bien las líneas
  Promise.race([d.fonts ? d.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
    .then(() => {
      safe(firmaPortada);
      safe(efectosDeScroll);
      ScrollTrigger.refresh();
    });

  /* ---------- 6. Un gesto por sección ---------- */
  function efectosDeScroll() {
    const yaAnimados = new Set($$('[data-barra] [data-retazo], [data-portada] [data-retazo], [data-menu] [data-retazo]'));

    // Cada retazo se cose al aparecer
    costuras.forEach((c, el) => {
      if (yaAnimados.has(el) || el.matches('[data-cta]')) return;
      gsap.fromTo(c.mask, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });

    // Títulos de sección: suben por líneas desde la costura
    if (window.SplitText) {
      $$('.colcha-seccion .titular, [data-cita]').forEach((h) => {
        const st = SplitText.create(h, { type: 'lines', mask: 'lines' });
        gsap.fromTo(st.lines, { yPercent: 105 }, { yPercent: 0, duration: M.dur, ease: M.ease, stagger: M.stagger, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
      });
    }

    // Revelados discretos
    $$('[data-reveal]').forEach((el) => {
      gsap.fromTo(el, { y: M.dist, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: M.dur, ease: M.ease, clearProps: 'transform', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    // Tranquilidad: los retazos caen y se acomodan, como una colcha que se arma
    const garantias = $$('[data-pop]');
    if (garantias.length) {
      gsap.fromTo(garantias, { y: -M.dist * 1.4, rotation: () => gsap.utils.random(-4, 4), autoAlpha: 0 },
        { y: 0, rotation: 0, autoAlpha: 1, duration: M.dur * 0.8, ease: M.pop, stagger: 0.08, clearProps: 'transform', scrollTrigger: { trigger: garantias[0], start: 'top 88%', once: true } });
    }

    // Un día: las horas avanzan de izquierda a derecha y el hilo mostaza se cose con el scroll
    const horas = $$('[data-hora]');
    if (horas.length) {
      gsap.fromTo(horas, { x: -M.dist, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: M.dur * 0.8, ease: M.ease, stagger: 0.08, clearProps: 'transform', scrollTrigger: { trigger: horas[0], start: 'top 88%', once: true } });
    }
    const hilo = $('[data-hilo] path');
    if (hilo && getComputedStyle(hilo.ownerSVGElement).display !== 'none') {
      const id = `cm${uid++}`;
      const defs = d.createElementNS(SVGNS, 'defs');
      defs.innerHTML = `<mask id="${id}" maskUnits="userSpaceOnUse"><path d="${hilo.getAttribute('d')}" fill="none" stroke="#fff" stroke-width="14" pathLength="1" stroke-dasharray="1 1"/></mask>`;
      hilo.ownerSVGElement.prepend(defs);
      hilo.setAttribute('mask', `url(#${id})`);
      gsap.fromTo($('path', defs), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: hilo.ownerSVGElement, start: 'top 85%', end: 'top 35%', scrub: true } });
    }

    // Salas: la foto se abre de arriba hacia abajo, como una tela que se despliega
    $$('.sala__foto .foto').forEach((f) => {
      gsap.fromTo(f, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: M.dur * 1.1, ease: M.easeIO, scrollTrigger: { trigger: f, start: 'top 86%', once: true } });
    });

    // Inscripción: el hilo une los tres pasos conforme bajas
    const hp = trazarHiloPasos();
    if (hp) {
      const L = hp.getTotalLength();
      const id = `cm${uid++}`;
      const svg = hp.ownerSVGElement;
      const defs = d.createElementNS(SVGNS, 'defs');
      defs.innerHTML = `<mask id="${id}" maskUnits="userSpaceOnUse"><path fill="none" stroke="#fff" stroke-width="14" pathLength="1" stroke-dasharray="1 1"/></mask>`;
      svg.prepend(defs);
      const mp = $('path', defs);
      const sync = () => mp.setAttribute('d', hp.getAttribute('d'));
      sync();
      hp.setAttribute('mask', `url(#${id})`);
      if (L) gsap.fromTo(mp, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '[data-pasos]', start: 'top 80%', end: 'bottom 55%', scrub: true, onRefresh: sync } });
      gsap.fromTo('[data-paso]', { y: M.dist, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: M.dur * 0.8, ease: M.pop, stagger: 0.14, clearProps: 'transform', scrollTrigger: { trigger: '[data-pasos]', start: 'top 85%', once: true } });
    }

    // Pie: las huellitas se estampan una por una
    const hs = $$('[data-huellitas] svg');
    if (hs.length) {
      gsap.fromTo(hs, { scale: 1.6, rotation: -20, autoAlpha: 0 }, { scale: 1, rotation: (i) => [-10, 6, -4, 10, -6][i % 5], autoAlpha: 1, duration: 0.45, ease: 'back.out(2.4)', stagger: 0.12, scrollTrigger: { trigger: hs[0], start: 'top 95%', once: true } });
    }

    // Cinta: avanza despacio
    const pista = $('[data-cinta]');
    if (pista) gsap.to(pista, { xPercent: -50, duration: 46, ease: 'none', repeat: -1 });
  }

  addEventListener('load', () => { safe(trazarHiloPasos); ScrollTrigger.refresh(); });
})();
