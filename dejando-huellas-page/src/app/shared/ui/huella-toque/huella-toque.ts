import { Directive, ElementRef, inject } from '@angular/core';

import { Movimiento } from '../../../core/movimiento/movimiento';

const SVGNS = 'http://www.w3.org/2000/svg';
const COLORES = ['#0D1A3C', '#C96F62', '#B9862E', '#6C86AF', '#7D8E7D'];
const MAXIMO_VIVAS = 10;

/**
 * Rima de la firma: al tocar la colcha queda una huellita que se desvanece. Nunca bloquea el toque,
 * no aparece sobre controles y no existe con «reducir movimiento».
 */
@Directive({
  selector: '[appHuellaToque]',
  host: { '(pointerdown)': 'alTocar($event)' },
})
export class HuellaToque {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly movimiento = inject(Movimiento);
  private color = 0;
  private vivas = 0;

  protected async alTocar(evento: PointerEvent): Promise<void> {
    const objetivo = evento.target as Element | null;
    if (!this.movimiento.activo || this.vivas >= MAXIMO_VIVAS) return;
    if (
      objetivo?.closest('a, button, input, select, textarea, summary, label, iframe, video, dialog')
    )
      return;
    const motor = await this.movimiento.cargar();
    if (!motor) return;

    this.vivas++;
    const doc = this.el.ownerDocument;
    const svg = doc.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 104');
    svg.setAttribute('class', 'huella-toque');
    svg.setAttribute('aria-hidden', 'true');
    const uso = doc.createElementNS(SVGNS, 'use');
    uso.setAttribute('href', '#huella');
    uso.setAttribute('fill', COLORES[this.color++ % COLORES.length]);
    svg.appendChild(uso);
    svg.style.left = `${evento.clientX}px`;
    svg.style.top = `${evento.clientY}px`;
    doc.body.appendChild(svg);

    motor.gsap
      .timeline({
        onComplete: () => {
          svg.remove();
          this.vivas--;
        },
      })
      .fromTo(
        svg,
        { scale: 1.35, rotation: motor.gsap.utils.random(-28, 28), autoAlpha: 0 },
        { scale: 1, autoAlpha: 0.92, duration: 0.28, ease: 'back.out(2)' },
      )
      .to(svg, { autoAlpha: 0, scale: 0.94, duration: 1.1, ease: 'power1.in' }, '+=0.5');
  }
}
