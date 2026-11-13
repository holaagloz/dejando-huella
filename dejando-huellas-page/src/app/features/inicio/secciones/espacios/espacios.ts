import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { Contenido } from '../../../../core/contenido/contenido';
import type { Foto as FotoContenido } from '../../../../core/contenido/modelo';
import { medidasFoto } from '../../../../core/media/media';
import { Movimiento } from '../../../../core/movimiento/movimiento';
import { Aparecer } from '../../../../shared/ui/aparecer/aparecer';
import { Foto } from '../../../../shared/ui/foto/foto';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { TitularAnimado } from '../../../../shared/ui/titular-animado/titular-animado';

/** Las instalaciones del centro con fotos reales. Cada foto se abre en grande en un visor (`<dialog>`). */
@Component({
  selector: 'app-espacios',
  imports: [NgOptimizedImage, Aparecer, Foto, Icono, Retazo, TitularAnimado],
  templateUrl: './espacios.html',
  styleUrl: './espacios.css',
})
export class Espacios {
  private readonly movimiento = inject(Movimiento);
  private readonly visor = viewChild.required<ElementRef<HTMLDialogElement>>('visor');

  protected readonly g = inject(Contenido).galeria;
  protected readonly seleccionada = signal<FotoContenido | null>(null);
  protected readonly medidas = computed(() => {
    const foto = this.seleccionada();
    return foto ? medidasFoto(foto.nombre) : null;
  });

  protected abrir(foto: FotoContenido): void {
    this.seleccionada.set(foto);
    this.visor().nativeElement.showModal();
    this.movimiento.detener();
  }

  protected cerrar(): void {
    this.visor().nativeElement.close();
  }

  /** Clic en el fondo oscuro (fuera del contenido) cierra el visor. */
  protected alClicVisor(evento: MouseEvent): void {
    if (evento.target === this.visor().nativeElement) this.cerrar();
  }

  protected alCerrar(): void {
    this.movimiento.reanudar();
  }
}
