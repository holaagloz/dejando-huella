import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

import { M, Motor, Movimiento } from '../../../core/movimiento/movimiento';

/** Gesto de entrada. Cada sección usa uno (DESIGN.md · «Un gesto por sección»). */
export type ModoAparecer = 'subir' | 'caer' | 'avanzar' | 'desplegar';

/**
 * Anima la entrada del elemento al llegar a la pantalla. El estado inicial lo pone GSAP en el
 * navegador: el HTML prerenderizado y la versión sin JS se ven completos y quietos.
 */
@Directive({ selector: '[appAparecer]' })
export class Aparecer {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly movimiento = inject(Movimiento);

  readonly appAparecer = input<ModoAparecer | ''>('');
  /** Posición dentro de un grupo, para escalonar la entrada. */
  readonly orden = input(0);

  constructor() {
    afterNextRender(() => {
      void this.movimiento.cargar().then((motor) => motor && this.animar(motor));
    });
  }

  private animar({ gsap }: Motor): void {
    const modo = this.appAparecer() || 'subir';
    const delay = this.orden() * 0.08;
    const scrollTrigger = { trigger: this.el, start: 'top 90%', once: true };
    switch (modo) {
      case 'caer':
        gsap.fromTo(
          this.el,
          { y: -M.dist * 1.4, rotation: gsap.utils.random(-4, 4), autoAlpha: 0 },
          {
            y: 0,
            rotation: 0,
            autoAlpha: 1,
            duration: M.dur * 0.8,
            ease: M.pop,
            delay,
            clearProps: 'transform',
            scrollTrigger,
          },
        );
        break;
      case 'avanzar':
        gsap.fromTo(
          this.el,
          { x: -M.dist, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: M.dur * 0.8,
            ease: M.ease,
            delay,
            clearProps: 'transform',
            scrollTrigger,
          },
        );
        break;
      case 'desplegar':
        gsap.fromTo(
          this.el,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: M.dur * 1.1,
            ease: M.easeIO,
            delay,
            clearProps: 'clipPath',
            scrollTrigger,
          },
        );
        break;
      default:
        gsap.fromTo(
          this.el,
          { y: M.dist, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: M.dur,
            ease: M.ease,
            delay,
            clearProps: 'transform',
            scrollTrigger,
          },
        );
    }
  }
}
