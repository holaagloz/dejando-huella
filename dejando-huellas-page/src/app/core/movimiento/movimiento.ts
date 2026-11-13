import { DOCUMENT, PLATFORM_ID, Service, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as TipoScrollTrigger } from 'gsap/ScrollTrigger';
import type { SplitText as TipoSplitText } from 'gsap/SplitText';
import type Lenis from 'lenis';

/** Tokens de movimiento de la marca (DESIGN.md): cálido y de juego. */
export const M = {
  ease: 'power2.out',
  easeIO: 'power2.inOut',
  pop: 'back.out(1.4)',
  dur: 1,
  stagger: 0.09,
  dist: 26,
  lerp: 0.1,
} as const;

export interface Motor {
  readonly gsap: typeof Gsap;
  readonly ScrollTrigger: typeof TipoScrollTrigger;
  readonly SplitText: typeof TipoSplitText;
}

const ESPERA_MAX_FUENTES = 1200;
const DESFASE_ANCLAS = -96;

/**
 * Carga perezosa del movimiento. GSAP y Lenis viven en chunks aparte que se piden después del
 * primer render: no pesan en la carga inicial ni existen en el prerender (Google ve todo quieto
 * y completo). Con «reducir movimiento» no se carga nada.
 */
@Service()
export class Movimiento {
  private readonly documento = inject(DOCUMENT);
  private readonly enNavegador = isPlatformBrowser(inject(PLATFORM_ID));
  private motor?: Promise<Motor | null>;
  private lenis: Lenis | null = null;

  /** Hay animaciones: navegador y sin preferencia de reducir movimiento. */
  readonly activo =
    this.enNavegador &&
    !this.documento.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Resuelve con GSAP listo (y las fuentes cargadas, para medir bien las líneas), o null si no hay movimiento. */
  cargar(): Promise<Motor | null> {
    if (!this.activo) return Promise.resolve(null);
    this.motor ??= Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
      this.fuentesListas(),
    ])
      .then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        ScrollTrigger.config({ ignoreMobileResize: true });
        return { gsap, ScrollTrigger, SplitText };
      })
      .catch((error: unknown) => {
        console.warn(
          '[movimiento] No se pudo cargar GSAP; la página sigue completa y quieta.',
          error,
        );
        return null;
      });
    return this.motor;
  }

  /** Desplazamiento suave con Lenis y anclas internas que respetan la barra fija. */
  async iniciarDesplazamientoSuave(): Promise<void> {
    const motor = await this.cargar();
    if (!motor || this.lenis) return;
    const { default: LenisClase } = await import('lenis');
    const lenis = new LenisClase({ lerp: M.lerp, smoothWheel: true });
    this.lenis = lenis;
    lenis.on('scroll', motor.ScrollTrigger.update);
    motor.gsap.ticker.add((t) => lenis.raf(t * 1000));
    motor.gsap.ticker.lagSmoothing(0);
    this.documento.addEventListener('click', (evento) => this.alClicAncla(evento));
  }

  /** Detiene el desplazamiento de fondo (menú o visor abiertos). */
  detener(): void {
    this.lenis?.stop();
  }

  reanudar(): void {
    this.lenis?.start();
  }

  private alClicAncla(evento: MouseEvent): void {
    const enlace = (evento.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const hash = enlace?.getAttribute('href');
    if (!enlace || !hash || hash.length < 2 || !this.lenis) return;
    const destino = this.documento.getElementById(hash.slice(1));
    if (!destino) return;
    evento.preventDefault();
    this.lenis.scrollTo(destino, {
      offset: hash === '#inicio' ? 0 : DESFASE_ANCLAS,
      duration: 1.4,
    });
    this.documento.defaultView?.history.replaceState(null, '', hash);
    destino.setAttribute('tabindex', '-1');
    destino.focus({ preventScroll: true });
  }

  private fuentesListas(): Promise<unknown> {
    const fuentes = this.documento.fonts?.ready ?? Promise.resolve();
    return Promise.race([fuentes, new Promise((r) => setTimeout(r, ESPERA_MAX_FUENTES))]);
  }
}
