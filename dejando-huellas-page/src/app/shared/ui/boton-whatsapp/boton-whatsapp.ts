import { Component, computed, inject, input } from '@angular/core';

import { RegistrarEvento } from '../../../core/analitica/registrar-evento';
import { enlaceWhatsapp } from '../../../core/contacto/whatsapp';
import { Contenido } from '../../../core/contenido/contenido';
import { Icono } from '../icono/icono';

export type VarianteParche = 'normal' | 'chico' | 'ancho' | 'manta' | 'manta-chico';

/**
 * El parche bordado de WhatsApp: la única acción principal del sitio. Cada ubicación lleva su propio
 * mensaje ya escrito y registra el clic en la analítica para que el centro vea de dónde le escriben.
 */
@Component({
  selector: 'app-boton-whatsapp',
  imports: [Icono, RegistrarEvento],
  host: { style: 'display:contents' },
  template: `
    <a
      class="parche"
      [class.parche--chico]="variante() === 'chico' || variante() === 'manta-chico'"
      [class.parche--ancho]="variante() === 'ancho'"
      [class.parche--manta]="variante() === 'manta' || variante() === 'manta-chico'"
      [href]="enlace()"
      target="_blank"
      rel="noopener"
      appRegistrarEvento="clic_whatsapp"
      [ubicacion]="ubicacion()"
    >
      <svg appIcono="whatsapp"></svg>{{ texto() }}<span class="vh"> (se abre WhatsApp)</span>
    </a>
  `,
})
export class BotonWhatsapp {
  private readonly contenido = inject(Contenido);

  readonly ubicacion = input.required<string>();
  /** Mensaje ya escrito; si no se indica, el mensaje general del centro. */
  readonly mensaje = input<string>();
  readonly texto = input('Agenda una visita');
  readonly variante = input<VarianteParche>('normal');

  protected readonly enlace = computed(() => {
    const { whatsapp, mensajeGeneral } = this.contenido.sitio.contacto;
    return enlaceWhatsapp(whatsapp, this.mensaje() ?? mensajeGeneral);
  });
}
