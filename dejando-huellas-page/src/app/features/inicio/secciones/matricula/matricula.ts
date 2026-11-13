import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
  viewChildren,
} from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { M, Movimiento } from '../../../../core/movimiento/movimiento';
import { BotonWhatsapp } from '../../../../shared/ui/boton-whatsapp/boton-whatsapp';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';

/** Matrícula en tres pasos y requisitos. Gesto: un hilo azul marino une los pasos con el scroll. */
@Component({
  selector: 'app-matricula',
  imports: [BotonWhatsapp, Icono, Retazo],
  templateUrl: './matricula.html',
  styleUrl: './matricula.css',
})
export class Matricula {
  private readonly movimiento = inject(Movimiento);
  private readonly caja = viewChild.required<ElementRef<HTMLElement>>('caja');
  private readonly hilo = viewChild.required<ElementRef<SVGSVGElement>>('hilo');
  private readonly lista = viewChild.required<ElementRef<HTMLElement>>('lista');
  private readonly numeros = viewChildren<ElementRef<HTMLElement>>('numero');
  private readonly pasos = viewChildren<ElementRef<HTMLElement>>('paso');

  protected readonly m = inject(Contenido).matricula;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.trazar();
      const vista = this.caja().nativeElement.ownerDocument.defaultView;
      let ancho = vista?.innerWidth ?? 0;
      let espera: ReturnType<typeof setTimeout> | undefined;
      const alRedimensionar = () => {
        if (!vista || vista.innerWidth === ancho) return;
        ancho = vista.innerWidth;
        clearTimeout(espera);
        espera = setTimeout(() => this.trazar(), 200);
      };
      vista?.addEventListener('resize', alRedimensionar);
      destroyRef.onDestroy(() => vista?.removeEventListener('resize', alRedimensionar));
      void this.animar();
    });
  }

  /** Une los números de los pasos con una curva calculada sobre sus posiciones reales. */
  private trazar(): void {
    const r = this.caja().nativeElement.getBoundingClientRect();
    const pts = this.numeros().map((n) => {
      const b = n.nativeElement.getBoundingClientRect();
      return [b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top] as const;
    });
    if (pts.length < 2) return;
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      d +=
        Math.abs(x1 - x0) > Math.abs(y1 - y0)
          ? ` C${x0 + (x1 - x0) * 0.3},${y0 - 64} ${x0 + (x1 - x0) * 0.7},${y1 - 64} ${x1},${y1}`
          : ` C${x0 - 60},${y0 + (y1 - y0) * 0.35} ${x1 - 60},${y0 + (y1 - y0) * 0.65} ${x1},${y1}`;
    }
    const svg = this.hilo().nativeElement;
    svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
    svg.querySelectorAll('path').forEach((p) => p.setAttribute('d', d));
  }

  private async animar(): Promise<void> {
    const motor = await this.movimiento.cargar();
    if (!motor) return;
    const { gsap } = motor;
    const svg = this.hilo().nativeElement;
    svg.querySelector(':scope > path')?.setAttribute('mask', 'url(#mascara-hilo-pasos)');
    gsap.fromTo(
      svg.querySelector('mask path'),
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: this.lista().nativeElement,
          start: 'top 80%',
          end: 'bottom 55%',
          scrub: true,
          onRefresh: () => this.trazar(),
        },
      },
    );
    gsap.fromTo(
      this.pasos().map((p) => p.nativeElement),
      { y: M.dist, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: M.dur * 0.8,
        ease: M.pop,
        stagger: 0.14,
        clearProps: 'transform',
        scrollTrigger: { trigger: this.lista().nativeElement, start: 'top 85%', once: true },
      },
    );
  }
}
