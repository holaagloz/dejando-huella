import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

import { Movimiento } from '../../../core/movimiento/movimiento';

const SVGNS = 'http://www.w3.org/2000/svg';
let contador = 0;

/**
 * Cose un retazo: dibuja su costura de puntada corrida en SVG (con largo de puntada al azar, para que
 * se vea hecha a mano) y la cose al entrar en pantalla. Sin JS queda la costura CSS de respaldo
 * (`.retazo:not(.cosido)`), así que el prerender ya se ve cosido.
 */
@Directive({
  selector: '[appRetazo]',
  host: { class: 'retazo' },
})
export class Retazo {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly movimiento = inject(Movimiento);

  /** Distancia de la costura al borde; por defecto 7px en celular y 9px en escritorio. */
  readonly costuraInset = input<number>();
  readonly costuraRadio = input(3);
  /** Cuando una animación propia (la firma de la portada) se encarga de coserlo. */
  readonly coserManual = input(false, { transform: booleanAttribute });

  /** Máscara de la costura: animar su `strokeDashoffset` de 1 a 0 la «cose». */
  mascara: SVGRectElement | null = null;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const vista = this.el.ownerDocument.defaultView;
      const inset = this.costuraInset() ?? ((vista?.innerWidth ?? 0) >= 1024 ? 9 : 7);
      const medir = this.crearCostura(inset, this.costuraRadio());
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(medir);
        ro.observe(this.el);
        destroyRef.onDestroy(() => ro.disconnect());
      }
      if (!this.coserManual()) void this.coserAlAparecer();
    });
  }

  /** Muestra la costura completa sin animar (respaldo si el movimiento no carga). */
  revelar(): void {
    this.mascara?.setAttribute('stroke-dashoffset', '0');
  }

  private crearCostura(inset: number, radio: number): () => void {
    const id = `costura-${contador++}`;
    const doc = this.el.ownerDocument;
    const svg = doc.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'costura');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const defs = doc.createElementNS(SVGNS, 'defs');
    const mask = doc.createElementNS(SVGNS, 'mask');
    mask.setAttribute('id', id);
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    const rectMascara = doc.createElementNS(SVGNS, 'rect');
    rectMascara.setAttribute('pathLength', '1');
    // Si otra animación la va a coser, nace sin coser (evita que aparezca, desaparezca y se cosa).
    rectMascara.setAttribute(
      'stroke-dashoffset',
      this.coserManual() && this.movimiento.activo ? '1' : '0',
    );
    mask.appendChild(rectMascara);
    defs.appendChild(mask);
    const rect = doc.createElementNS(SVGNS, 'rect');
    rect.setAttribute('mask', `url(#${id})`);
    const largo = 4 + Math.random() * 1.6;
    rect.style.strokeDasharray = `${largo.toFixed(2)} ${(10 - largo + Math.random()).toFixed(2)}`;
    svg.append(defs, rect);
    this.el.appendChild(svg);
    this.el.classList.add('cosido');
    this.mascara = rectMascara;

    const medir = () => {
      const w = this.el.clientWidth;
      const h = this.el.clientHeight;
      if (!w || !h) return;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      for (const r of [rectMascara, rect]) {
        r.setAttribute('x', String(inset));
        r.setAttribute('y', String(inset));
        r.setAttribute('width', String(Math.max(0, w - inset * 2)));
        r.setAttribute('height', String(Math.max(0, h - inset * 2)));
        r.setAttribute('rx', String(radio));
      }
    };
    medir();
    return medir;
  }

  private async coserAlAparecer(): Promise<void> {
    const motor = await this.movimiento.cargar();
    if (!motor || !this.mascara) return;
    motor.gsap.fromTo(
      this.mascara,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: this.el, start: 'top 88%', once: true },
      },
    );
  }
}
