import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import type { Video } from '../../../core/contenido/modelo';
import { rutaFoto } from '../../../core/media/media';
import { Movimiento } from '../../../core/movimiento/movimiento';
import { Icono } from '../icono/icono';

/**
 * Clip corto, mudo y en bucle. Solo se descarga y reproduce cuando está en pantalla, nunca con
 * «reducir movimiento», y siempre tiene un botón de pausa (WCAG 2.2.2: contenido en movimiento).
 */
@Component({
  selector: 'app-video-clip',
  imports: [Icono],
  host: { style: 'display:contents' },
  template: `
    <video
      #reproductor
      muted
      loop
      playsinline
      disablepictureinpicture
      preload="none"
      [poster]="poster()"
      [attr.aria-label]="video().descripcion"
    >
      <source [src]="fuente()" type="video/mp4" />
    </video>
    <button
      class="control"
      type="button"
      (click)="alternar()"
      [attr.aria-label]="reproduciendo() ? 'Pausar video' : 'Reproducir video'"
    >
      <svg [appIcono]="reproduciendo() ? 'pausa' : 'reproducir'"></svg>
    </button>
  `,
  styles: `
    .control {
      position: absolute;
      right: 10px;
      bottom: 10px;
      z-index: 2;
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      border: 0;
      border-radius: 50%;
      background: var(--manta);
      color: var(--ink);
      cursor: pointer;
      box-shadow: 0 2px 0 rgb(13 26 60 / 18%);
    }
    .control .icono {
      width: 20px;
      height: 20px;
    }
  `,
})
export class VideoClip {
  private readonly movimiento = inject(Movimiento);
  private readonly elemento = viewChild.required<ElementRef<HTMLVideoElement>>('reproductor');

  readonly video = input.required<Video>();
  protected readonly poster = computed(() => rutaFoto(`video-${this.video().nombre}`, 800));
  protected readonly fuente = computed(() => `media/${this.video().nombre}.mp4`);
  protected readonly reproduciendo = signal(false);
  private pausadoPorUsuario = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!this.movimiento.activo || typeof IntersectionObserver === 'undefined') return;
      const io = new IntersectionObserver(
        ([entrada]) => {
          if (entrada.isIntersecting && !this.pausadoPorUsuario) this.reproducir();
          else if (!entrada.isIntersecting) this.pausar();
        },
        { threshold: 0.4 },
      );
      io.observe(this.elemento().nativeElement);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  protected alternar(): void {
    if (this.reproduciendo()) {
      this.pausadoPorUsuario = true;
      this.pausar();
    } else {
      this.pausadoPorUsuario = false;
      this.reproducir();
    }
  }

  private reproducir(): void {
    const v = this.elemento().nativeElement;
    v.play().then(
      () => this.reproduciendo.set(true),
      () => this.reproduciendo.set(false), // el navegador lo impidió (ahorro de datos, etc.)
    );
  }

  private pausar(): void {
    this.elemento().nativeElement.pause();
    this.reproduciendo.set(false);
  }
}
