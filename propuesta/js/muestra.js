(() => {
  'use strict';

  // 1. Ayudantes, banderas y tokens de movimiento (cálido y de juego)
  const d = document;
  const html = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const safe = (fn) => { try { return fn(); } catch (e) { console.warn('[muestra]', e); } };
  const SVGNS = 'http://www.w3.org/2000/svg';

  const M = { ease: 'power2.out', easeIO: 'power2.inOut', pop: 'back.out(1.4)', dur: 1, stagger: 0.09, dist: 26, lerp: 0.1 };

  // 2. Costuras: puntadas redondas dibujadas en SVG sobre cada retazo.
  //    Siempre se crean (con o sin GSAP). El rectángulo de la máscara permite "coser" la puntada.
  let uid = 0;
  const costuras = new Map(); // elemento -> { svg, rect, mask }
  const crearCostura = (el, inset, radio) => {
    const id = `cm${uid++}`;
    const svg = d.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'costura');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.innerHTML = `<defs><mask id="${id}" maskUnits="userSpaceOnUse"><rect fill="none" stroke="#fff" stroke-width="8" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="0"/></mask></defs><rect mask="url(#${id})"/>`;
    el.appendChild(svg);
    el.classList.add('cosido');
    const [maskRect, rect] = $$('rect', svg);
    const medir = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      [maskRect, rect].forEach((r) => {
        r.setAttribute('x', inset); r.setAttribute('y', inset);
        r.setAttribute('width', Math.max(0, w - inset * 2)); r.setAttribute('height', Math.max(0, h - inset * 2));
        r.setAttribute('rx', radio); r.setAttribute('ry', radio);
      });
    };
    medir();
    costuras.set(el, { svg, rect, mask: maskRect, medir });
    return maskRect;
  };

  safe(() => {
    const insetBase = () => (innerWidth >= 1024 ? 9 : 7);
    $$('[data-retazo]').forEach((el) => crearCostura(el, insetBase(), 3));
    $$('[data-cta]').forEach((el) => crearCostura(el, 6, 10));
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver((entries) => entries.forEach((e) => { const c = costuras.get(e.target); c && c.medir(); }));
      costuras.forEach((_, el) => ro.observe(el));
    }
  });

  // Sin GSAP: todo completo y quieto
  if (!hasGSAP) {
    html.classList.remove('js');
    const b = $('[data-ver-de-nuevo]'); if (b) b.hidden = true;
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Lenis (inercia suave con rueda o trackpad)
  let lenis = null;
  safe(() => {
    if (!RM && window.Lenis && M.lerp) {
      lenis = new Lenis({ lerp: M.lerp, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  });

  // 3. Huella al tocar (rima de la firma). Nunca bloquea el toque.
  const COLORES = ['#0D1A3C', '#C96F62', '#B9862E', '#6C86AF', '#7D8E7D'];
  let ci = 0;
  let vivas = 0;
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
    const portada = $('[data-portada]');
    portada && portada.addEventListener('pointerdown', (e) => dejarHuella(e.clientX, e.clientY));
  });

  // 4. Menos movimiento: nada corre solo; "Ver de nuevo" solo hace fundidos
  if (RM) {
    safe(() => {
      const aviso = $('[data-aviso-rm]'); if (aviso) aviso.hidden = false;
      const b = $('[data-ver-de-nuevo]');
      b && b.addEventListener('click', () => gsap.fromTo('[data-portada] [data-pieza]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, stagger: 0.1, ease: 'none' }));
      $$('[data-demo]').forEach((btn) => (btn.hidden = true));
    });
    return;
  }

  // 5. La firma: los retazos caen y se acomodan, el titular sube, la puntada coral los cose
  //    y termina rodeando el botón de WhatsApp; al final la huella se estampa.
  const firmaPortada = () => {
    const portada = $('[data-portada]');
    const piezas = $$('[data-pieza]', portada).filter((el) => el.offsetParent !== null);
    const titular = $('[data-titular]', portada);
    const cta = $('[data-cta]', portada);
    const sello = $('[data-sello]', portada);
    const mascaras = piezas.map((p) => costuras.get(p)).filter(Boolean).map((c) => c.mask);
    const mascaraCta = cta && costuras.get(cta) ? costuras.get(cta).mask : null;

    let lineas = [];
    if (titular && window.SplitText) {
      const st = SplitText.create(titular, { type: 'lines', mask: 'lines', linesClass: 'linea' });
      lineas = st.lines;
    }

    const tl = gsap.timeline({ defaults: { ease: M.ease } });
    tl.fromTo(piezas,
        { y: -M.dist * 1.6, rotation: () => gsap.utils.random(-5, 5), autoAlpha: 0 },
        { y: 0, rotation: 0, autoAlpha: 1, duration: M.dur * 0.8, ease: M.pop, stagger: 0.07 }, 0)
      .fromTo(mascaras, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.95, ease: 'power1.inOut', stagger: 0.05 }, 0.55);
    if (lineas.length) tl.fromTo(lineas, { yPercent: 105 }, { yPercent: 0, duration: M.dur, stagger: M.stagger }, 0.45);
    if (cta) {
      tl.fromTo(cta, { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: M.pop }, 1.2);
      if (mascaraCta) tl.fromTo(mascaraCta, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power1.inOut' }, 1.35);
    }
    if (sello) tl.fromTo(sello, { scale: 1.6, rotation: -22, autoAlpha: 0 }, { scale: 1, rotation: -8, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.4)' }, 1.75);

    // Se salta con un toque y nunca deja la portada a medias
    const saltar = () => { if (tl.progress() < 1 && tl.isActive()) tl.progress(1); };
    portada.addEventListener('pointerdown', saltar, { passive: true });
    setTimeout(() => { if (tl.progress() < 1) tl.progress(1); }, 4500);
    return tl;
  };

  // 6. Arranque: espera las fuentes (con tope) para medir bien las líneas
  let tl = null;
  Promise.race([d.fonts ? d.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
    .then(() => safe(() => { tl = firmaPortada(); }));
  safe(() => {
    const b = $('[data-ver-de-nuevo]');
    b && b.addEventListener('click', () => { if (tl) tl.restart(); });
  });

  // 7. En la hoja: cada retazo se cose al aparecer y los títulos suben por líneas
  safe(() => {
    $$('.hoja [data-retazo]').forEach((el) => {
      const c = costuras.get(el); if (!c) return;
      gsap.fromTo(c.mask, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power1.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
    if (window.SplitText) {
      $$('.hoja h2').forEach((h) => {
        const st = SplitText.create(h, { type: 'lines', mask: 'lines' });
        gsap.fromTo(st.lines, { yPercent: 105 }, { yPercent: 0, duration: M.dur, ease: M.ease, stagger: M.stagger, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
      });
    }
  });

  // 8. Demostraciones de los elementos ("Ver cómo se mueve")
  safe(() => {
    // Puntada: se cose a lo largo del trazo
    const demoSvg = $('[data-demo-costura]');
    let demoPuntada = null;
    if (demoSvg) {
      const p = $('path', demoSvg);
      const id = `cm${uid++}`;
      const defs = d.createElementNS(SVGNS, 'defs');
      defs.innerHTML = `<mask id="${id}" maskUnits="userSpaceOnUse"><path d="${p.getAttribute('d')}" fill="none" stroke="#fff" stroke-width="10" pathLength="1" stroke-dasharray="1 1"/></mask>`;
      demoSvg.prepend(defs);
      p.setAttribute('mask', `url(#${id})`);
      const m = $('mask path', defs);
      demoPuntada = () => gsap.fromTo(m, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power1.inOut' });
      ScrollTrigger.create({ trigger: demoSvg, start: 'top 85%', once: true, onEnter: demoPuntada });
    }
    const demoColcha = () => gsap.fromTo('[data-demo-colcha] > span',
      { y: -18, rotation: () => gsap.utils.random(-8, 8), autoAlpha: 0 },
      { y: 0, rotation: 0, autoAlpha: 1, duration: 0.6, ease: M.pop, stagger: 0.07 });
    const demoHuella = () => gsap.fromTo('[data-demo-huella]', { scale: 1.6, rotation: -24, autoAlpha: 0 }, { scale: 1, rotation: -8, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.4)' });
    const demos = { costura: demoPuntada, colcha: demoColcha, huella: demoHuella };
    $$('[data-demo]').forEach((btn) => btn.addEventListener('click', () => { const f = demos[btn.dataset.demo]; f && f(); }));
    const escena = $('[data-demo-huella-escena]');
    escena && escena.addEventListener('pointerdown', (e) => dejarHuella(e.clientX, e.clientY));
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
