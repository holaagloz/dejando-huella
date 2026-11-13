import {
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp/boton-whatsapp';
import { Icono } from '../../shared/ui/icono/icono';
import { Retazo } from '../../shared/ui/retazo/retazo';
import { MenuMovil } from '../menu-movil/menu-movil';
import { SECCIONES_BARRA } from '../navegacion';

/** Barra fija de retazos. Se esconde al bajar (después de la portada) y vuelve al subir. */
@Component({
  selector: 'app-barra',
  imports: [NgOptimizedImage, BotonWhatsapp, Icono, Retazo, MenuMovil],
  templateUrl: './barra.html',
  styleUrl: './barra.css',
})
export class Barra {
  private readonly documento = inject(DOCUMENT);
  private readonly menu = viewChild.required(MenuMovil);

  protected readonly secciones = SECCIONES_BARRA;
  protected readonly oculta = signal(false);
  protected readonly menuAbierto = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const vista = this.documento.defaultView;
      if (!vista) return;
      let yAnterior = vista.scrollY;
      const alDesplazar = () => {
        const y = vista.scrollY;
        const portada = this.documento.getElementById('inicio');
        const bajoPortada = !!portada && portada.getBoundingClientRect().bottom < 0;
        if (!this.menuAbierto()) {
          if (bajoPortada && y > yAnterior + 4) this.oculta.set(true);
          else if (y < yAnterior - 4 || !bajoPortada) this.oculta.set(false);
        }
        yAnterior = y;
      };
      vista.addEventListener('scroll', alDesplazar, { passive: true });
      destroyRef.onDestroy(() => vista.removeEventListener('scroll', alDesplazar));
    });
  }

  protected abrirMenu(): void {
    this.menuAbierto.set(true);
    this.menu().abrir();
  }
}
