import { Component, ElementRef, inject, output, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { M, Movimiento } from '../../core/movimiento/movimiento';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp/boton-whatsapp';
import { Icono } from '../../shared/ui/icono/icono';
import { Retazo } from '../../shared/ui/retazo/retazo';
import { SECCIONES } from '../navegacion';

const TELAS = [
  't-rayas',
  't-lavanda',
  't-fieltro',
  't-cuadrille t-cuadrille--suave',
  't-manta',
  't-mostaza-suave',
  't-lavanda',
  't-salvia-suave',
  't-cuadrille t-cuadrille--suave',
];

/**
 * Menú del celular: una colcha a pantalla completa. Es un `<dialog>` modal nativo, que atrapa el
 * foco, cierra con Esc y devuelve el foco al botón que lo abrió.
 */
@Component({
  selector: 'app-menu-movil',
  imports: [NgOptimizedImage, BotonWhatsapp, Icono, Retazo],
  templateUrl: './menu-movil.html',
  styleUrl: './menu-movil.css',
})
export class MenuMovil {
  private readonly movimiento = inject(Movimiento);
  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');

  readonly cerrado = output<void>();
  protected readonly secciones = SECCIONES.map((s, i) => ({
    ...s,
    tela: TELAS[i % TELAS.length],
    // Solo el último ocupa el ancho completo: así las filas de dos quedan siempre llenas.
    ancho: s.ancla === 'visitanos',
  }));

  abrir(): void {
    const dialogo = this.dialogo().nativeElement;
    dialogo.showModal();
    this.movimiento.detener();
    void this.movimiento.cargar().then((motor) => {
      motor?.gsap.fromTo(
        dialogo.querySelectorAll('.retazo'),
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: M.pop, stagger: 0.04 },
      );
    });
  }

  /** También al tocar un enlace: se cierra para que el ancla haga su trabajo. */
  protected cerrar(): void {
    // Se reactiva el desplazamiento ya, no en el evento «close» (que llega después): si se espera,
    // el salto al ancla que se tocó ocurre con Lenis detenido y la página no se mueve.
    this.movimiento.reanudar();
    this.dialogo().nativeElement.close();
  }

  protected alCerrar(): void {
    this.movimiento.reanudar();
    this.cerrado.emit();
  }
}
