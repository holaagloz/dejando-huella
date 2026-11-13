import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Contenido } from '../../core/contenido/contenido';
import { Seo } from '../../core/seo/seo';
import { BotonWhatsapp } from '../../shared/ui/boton-whatsapp/boton-whatsapp';
import { Huella } from '../../shared/ui/huella/huella';
import { Retazo } from '../../shared/ui/retazo/retazo';

/** Página 404. Se publica como `404.html`, que GitHub Pages sirve para cualquier ruta inexistente. */
@Component({
  selector: 'app-no-encontrada',
  imports: [RouterLink, BotonWhatsapp, Huella, Retazo],
  template: `
    <section class="colcha-seccion" aria-labelledby="t-404">
      <div class="r-cabeza tela t-manta" appRetazo>
        <h1 class="titular" id="t-404">Esta página se nos perdió</h1>
        <p class="bajada">
          Puede que el enlace esté mal escrito o que la página ya no exista. Te ayudamos a encontrar
          lo que buscas.
        </p>
        <div class="acciones">
          <a class="parche parche--manta" routerLink="/">Ir al inicio</a>
          <app-boton-whatsapp ubicacion="404" texto="Escríbenos" variante="normal" />
        </div>
      </div>
      <div class="r-huella tela t-cuadrille" appRetazo>
        <svg appHuella corazon></svg>
      </div>
    </section>
  `,
  styles: `
    .acciones {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 8px;
    }
    .r-huella {
      display: grid;
      place-items: center;
      min-height: 220px;
      padding: 24px;
    }
    .r-huella svg {
      width: min(40%, 160px);
      height: auto;
      transform: rotate(-8deg);
    }
    @media (min-width: 1024px) {
      .r-cabeza {
        grid-column: 1 / 8;
        min-height: 420px;
        justify-content: center;
      }
      .r-huella {
        grid-column: 8 / 13;
      }
    }
  `,
})
export class NoEncontrada {
  constructor() {
    const c = inject(Contenido);
    inject(Seo).aplicar({
      titulo: `Página no encontrada · ${c.sitio.nombre}`,
      descripcion: c.sitio.seo.descripcion,
      ruta: '/',
      urlBase: c.sitio.url,
      imagen: c.sitio.seo.imagen,
      nombreSitio: c.sitio.nombre,
      indexar: false,
    });
  }
}
