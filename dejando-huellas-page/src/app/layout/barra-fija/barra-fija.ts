import { Component, DOCUMENT, DestroyRef, afterNextRender, inject, signal } from '@angular/core';

import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp/boton-whatsapp';

/**
 * Barra fija del celular con el parche de WhatsApp. Aparece al pasar la portada y se esconde en
 * «Visítanos» y en el pie, para no repetir el botón donde ya hay uno.
 */
@Component({
  selector: 'app-barra-fija',
  imports: [BotonWhatsapp],
  host: {
    class: 'barra-fija',
    '[class.barra-fija--visible]': 'visible()',
    '[attr.aria-hidden]': '!visible()',
    '[attr.inert]': 'visible() ? null : ""',
  },
  template: `<app-boton-whatsapp
    variante="ancho"
    ubicacion="barra-fija"
    mensaje="Hola, quisiera información para agendar una visita al centro."
  />`,
  styles: `
    :host {
      position: fixed;
      left: var(--costura);
      right: var(--costura);
      bottom: calc(var(--costura) + env(safe-area-inset-bottom));
      z-index: 35;
      display: flex;
      transform: translateY(160%);
      transition: transform 0.5s var(--ease);
    }
    :host(.barra-fija--visible) {
      transform: none;
    }
    @media (min-width: 1024px) {
      :host {
        display: none;
      }
    }
  `,
})
export class BarraFija {
  private readonly documento = inject(DOCUMENT);
  protected readonly visible = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const vista = this.documento.defaultView;
      if (!vista || typeof IntersectionObserver === 'undefined') return;
      let pasoPortada = false;
      const enZonaContacto = new Set<Element>();
      const actualizar = () => this.visible.set(pasoPortada && enZonaContacto.size === 0);

      const portada = this.documento.getElementById('inicio');
      const ioPortada = new IntersectionObserver(([e]) => {
        pasoPortada = !e.isIntersecting && e.boundingClientRect.bottom < 0;
        actualizar();
      });
      if (portada) ioPortada.observe(portada);

      const ioContacto = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((e) =>
            e.isIntersecting ? enZonaContacto.add(e.target) : enZonaContacto.delete(e.target),
          );
          actualizar();
        },
        { rootMargin: '0px 0px -20% 0px' },
      );
      ['visitanos', 'pie'].forEach((id) => {
        const el = this.documento.getElementById(id);
        if (el) ioContacto.observe(el);
      });

      destroyRef.onDestroy(() => {
        ioPortada.disconnect();
        ioContacto.disconnect();
      });
    });
  }
}
