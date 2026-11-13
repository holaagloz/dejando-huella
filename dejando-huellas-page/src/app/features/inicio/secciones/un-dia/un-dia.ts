import { Component, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { Movimiento } from '../../../../core/movimiento/movimiento';
import { Aparecer } from '../../../../shared/ui/aparecer/aparecer';
import { Foto } from '../../../../shared/ui/foto/foto';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { TitularAnimado } from '../../../../shared/ui/titular-animado/titular-animado';

const TELAS = [
  't-mostaza-suave',
  't-fieltro',
  't-cuadrille t-cuadrille--suave',
  't-lavanda',
  't-rayas',
  't-salvia-suave',
  't-mostaza-suave',
];

/** La rutina de un día. Gesto: los momentos avanzan y el hilo mostaza se cose con el scroll. */
@Component({
  selector: 'app-un-dia',
  imports: [Aparecer, Foto, Icono, Retazo, TitularAnimado],
  templateUrl: './un-dia.html',
  styleUrl: './un-dia.css',
})
export class UnDia {
  private readonly movimiento = inject(Movimiento);
  private readonly hilo = viewChild.required<ElementRef<SVGSVGElement>>('hilo');

  protected readonly d = inject(Contenido).unDia;
  protected readonly momentos = this.d.momentos.map((m, i) => ({
    ...m,
    tela: TELAS[i % TELAS.length],
  }));

  constructor() {
    afterNextRender(async () => {
      const motor = await this.movimiento.cargar();
      const svg = this.hilo().nativeElement;
      if (!motor || getComputedStyle(svg).display === 'none') return;
      const mascara = svg.querySelector('mask path');
      svg.querySelector(':scope > path')?.setAttribute('mask', 'url(#mascara-hilo-dia)');
      motor.gsap.fromTo(
        mascara,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: svg, start: 'top 85%', end: 'top 35%', scrub: true },
        },
      );
    });
  }
}
