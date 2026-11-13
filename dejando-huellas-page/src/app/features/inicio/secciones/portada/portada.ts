import {
  Component,
  DOCUMENT,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
  viewChildren,
} from '@angular/core';

import { RegistrarEvento } from '../../../../core/analitica/registrar-evento';
import { enlaceWhatsapp } from '../../../../core/contacto/whatsapp';
import { Contenido } from '../../../../core/contenido/contenido';
import { formatearHora } from '../../../../core/contenido/formato';
import { M, Motor, Movimiento } from '../../../../core/movimiento/movimiento';
import { Foto } from '../../../../shared/ui/foto/foto';
import { Huella } from '../../../../shared/ui/huella/huella';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';

/** Clase que pone index.html para ocultar las piezas de la firma hasta que la animación arranque. */
const CLASE_FIRMA_PENDIENTE = 'firma-pendiente';

/**
 * Portada. La animación firma: los retazos de datos caen y se acomodan, la puntada coral los cose,
 * se cose el botón de WhatsApp y la huella del logo se estampa.
 * La foto y el titular nunca se ocultan: son lo primero que se pinta (LCP).
 */
@Component({
  selector: 'app-portada',
  imports: [RegistrarEvento, Foto, Huella, Icono, Retazo],
  templateUrl: './portada.html',
  styleUrl: './portada.css',
})
export class Portada {
  private readonly documento = inject(DOCUMENT);
  private readonly movimiento = inject(Movimiento);
  private readonly seccion = viewChild.required<ElementRef<HTMLElement>>('seccion');
  private readonly sello = viewChild.required<ElementRef<HTMLElement>>('sello');
  private readonly retazos = viewChildren(Retazo);
  private readonly retazoBoton = viewChild.required('boton', { read: Retazo });
  private readonly piezas = viewChildren<ElementRef<HTMLElement>>('pieza');

  protected readonly c = inject(Contenido);
  protected readonly p = this.c.portada;
  protected readonly enlace = enlaceWhatsapp(
    this.c.sitio.contacto.whatsapp,
    this.p.mensajeWhatsapp,
  );
  protected readonly horario = `${formatearHora(this.c.sitio.horario.apertura)} – ${formatearHora(this.c.sitio.horario.cierre)}`;
  protected readonly edades = this.rangoEdades();

  constructor() {
    afterNextRender(() => {
      void this.movimiento
        .cargar()
        .then((motor) => (motor ? this.firmar(motor) : this.mostrarTodo()));
    });
  }

  private rangoEdades(): string {
    const grupos = this.c.grupos.grupos;
    const desde = grupos[0]?.edades.split(' a ')[0];
    const hasta = grupos[grupos.length - 1]?.edades.split(' a ').at(-1);
    return desde && hasta ? `De ${desde} a ${hasta}` : '';
  }

  private mostrarTodo(): void {
    this.retazos().forEach((r) => r.revelar());
    this.documento.documentElement.classList.remove(CLASE_FIRMA_PENDIENTE);
  }

  private firmar({ gsap }: Motor): void {
    const piezas = this.piezas()
      .map((p) => p.nativeElement)
      .filter((el) => el.offsetParent !== null);
    const retazoBoton = this.retazoBoton();
    const mascaraBoton = retazoBoton.mascara;
    const mascaras = this.retazos()
      .filter((r) => r !== retazoBoton)
      .map((r) => r.mascara)
      .filter((m): m is SVGRectElement => !!m);

    const tl = gsap.timeline({ paused: true, defaults: { ease: M.ease } });
    tl.fromTo(
      piezas,
      { y: -M.dist * 1.6, rotation: () => gsap.utils.random(-5, 5), autoAlpha: 0 },
      {
        y: 0,
        rotation: 0,
        autoAlpha: 1,
        duration: M.dur * 0.8,
        ease: M.pop,
        stagger: 0.07,
        clearProps: 'transform',
      },
      0,
    ).fromTo(
      mascaras,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.95, ease: 'power1.inOut', stagger: 0.05 },
      0.45,
    );
    if (mascaraBoton)
      tl.fromTo(
        mascaraBoton,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.7, ease: 'power1.inOut' },
        1.25,
      );
    tl.fromTo(
      this.sello().nativeElement,
      { scale: 1.6, rotation: -22, autoAlpha: 0 },
      { scale: 1, rotation: -8, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.4)' },
      1.65,
    );

    tl.progress(0);
    this.documento.documentElement.classList.remove(CLASE_FIRMA_PENDIENTE);
    tl.play();
    // Se salta con un toque y se libera sola, para que nunca estorbe.
    const saltar = () => tl.progress() < 1 && tl.progress(1);
    this.seccion().nativeElement.addEventListener('pointerdown', saltar, {
      passive: true,
      once: true,
    });
    setTimeout(saltar, 4500);
  }
}
