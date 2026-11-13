import { Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { RegistrarEvento } from '../../../../core/analitica/registrar-evento';
import { Huella } from '../../../../shared/ui/huella/huella';

/**
 * Mapa dibujado (liviano, sin rastreadores) que se cambia por el mapa de Google solo si la familia
 * lo pide. Así Google Maps no pesa en la carga ni pone cookies de terceros sin un clic.
 */
@Component({
  selector: 'app-mapa',
  imports: [RegistrarEvento, Huella],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa {
  private readonly sanitizador = inject(DomSanitizer);

  readonly nombre = input.required<string>();
  readonly senas = input.required<string>();
  readonly latitud = input.required<number>();
  readonly longitud = input.required<number>();
  readonly enlaceExterno = input.required<string>();

  protected readonly cargado = signal(false);
  /** URL fija de Google con coordenadas numéricas del contenido: no hay entrada del usuario. */
  protected readonly fuente = computed(() =>
    this.sanitizador.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${Number(this.latitud())},${Number(this.longitud())}&z=16&output=embed`,
    ),
  );
}
