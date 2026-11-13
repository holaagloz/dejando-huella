import { Component, ElementRef, afterNextRender, inject, viewChildren } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { RegistrarEvento } from '../../core/analitica/registrar-evento';
import { Contenido } from '../../core/contenido/contenido';
import { Movimiento } from '../../core/movimiento/movimiento';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp/boton-whatsapp';
import { Huella } from '../../shared/ui/huella/huella';
import { Icono } from '../../shared/ui/icono/icono';
import { Retazo } from '../../shared/ui/retazo/retazo';
import { SECCIONES } from '../navegacion';

/** Pie de la colcha: marca, anclas, Instagram y la firma de Studio Gloz como etiqueta cosida. */
@Component({
  selector: 'app-pie',
  imports: [NgOptimizedImage, RegistrarEvento, BotonWhatsapp, Huella, Icono, Retazo],
  templateUrl: './pie.html',
  styleUrl: './pie.css',
})
export class Pie {
  private readonly movimiento = inject(Movimiento);
  private readonly huellitas = viewChildren<ElementRef<HTMLElement>>('huellita');

  protected readonly c = inject(Contenido);
  protected readonly secciones = SECCIONES;
  protected readonly anio = this.c.sitio.fundacion.slice(0, 4);
  protected readonly instagram = `https://www.instagram.com/${this.c.sitio.contacto.instagram}/`;
  protected readonly colores = ['#C96F62', '#B9862E', '#FBF7EF', '#6C86AF', '#0D1A3C'];

  constructor() {
    // Las huellitas se estampan una por una al llegar al pie.
    afterNextRender(async () => {
      const motor = await this.movimiento.cargar();
      const els = this.huellitas().map((h) => h.nativeElement);
      if (!motor || !els.length) return;
      motor.gsap.fromTo(
        els,
        { scale: 1.6, rotation: -20, autoAlpha: 0 },
        {
          scale: 1,
          rotation: (i: number) => [-10, 6, -4, 10, -6][i % 5],
          autoAlpha: 1,
          duration: 0.45,
          ease: 'back.out(2.4)',
          stagger: 0.12,
          scrollTrigger: { trigger: els[0], start: 'top 95%', once: true },
        },
      );
    });
  }
}
