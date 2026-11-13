import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

import { M, Movimiento } from '../../../core/movimiento/movimiento';

/** El titular sube por líneas desde la costura al llegar a la pantalla. */
@Directive({ selector: '[appTitularAnimado]' })
export class TitularAnimado {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly movimiento = inject(Movimiento);

  constructor() {
    afterNextRender(async () => {
      const motor = await this.movimiento.cargar();
      if (!motor) return;
      const { gsap, SplitText } = motor;
      const division = SplitText.create(this.el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'linea-animada',
      });
      gsap.fromTo(
        division.lines,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: M.dur,
          ease: M.ease,
          stagger: M.stagger,
          scrollTrigger: { trigger: this.el, start: 'top 88%', once: true },
        },
      );
    });
  }
}
