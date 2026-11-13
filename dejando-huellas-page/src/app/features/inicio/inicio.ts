import { Component, inject } from '@angular/core';

import { Contenido } from '../../core/contenido/contenido';
import { rutaFoto } from '../../core/media/media';
import { construirDatosEstructurados } from '../../core/seo/datos-estructurados';
import { Seo } from '../../core/seo/seo';
import { Alimentacion } from './secciones/alimentacion/alimentacion';
import { Cinta } from './secciones/cinta/cinta';
import { Espacios } from './secciones/espacios/espacios';
import { Experiencias } from './secciones/experiencias/experiencias';
import { Grupos } from './secciones/grupos/grupos';
import { Horarios } from './secciones/horarios/horarios';
import { Matricula } from './secciones/matricula/matricula';
import { Nosotros } from './secciones/nosotros/nosotros';
import { Portada } from './secciones/portada/portada';
import { Preguntas } from './secciones/preguntas/preguntas';
import { Testimonios } from './secciones/testimonios/testimonios';
import { Tranquilidad } from './secciones/tranquilidad/tranquilidad';
import { UnDia } from './secciones/un-dia/un-dia';
import { Visitanos } from './secciones/visitanos/visitanos';

/**
 * La landing. Todo se prerenderiza (Google recibe el HTML completo); las secciones de abajo se
 * hidratan recién al acercarse a la pantalla, para ejecutar menos JS al cargar.
 */
@Component({
  selector: 'app-inicio',
  imports: [
    Portada,
    Cinta,
    Tranquilidad,
    Nosotros,
    Grupos,
    Experiencias,
    UnDia,
    Alimentacion,
    Espacios,
    Testimonios,
    Horarios,
    Matricula,
    Preguntas,
    Visitanos,
  ],
  template: `
    <app-portada />
    <app-cinta />
    <app-tranquilidad />
    @defer (hydrate on viewport) {
      <app-nosotros />
    }
    @defer (hydrate on viewport) {
      <app-grupos />
    }
    @defer (hydrate on viewport) {
      <app-experiencias />
    }
    @defer (hydrate on viewport) {
      <app-un-dia />
    }
    @defer (hydrate on viewport) {
      <app-alimentacion />
    }
    @defer (hydrate on viewport) {
      <app-espacios />
    }
    @defer (hydrate on viewport) {
      <app-testimonios />
    }
    @defer (hydrate on viewport) {
      <app-horarios />
    }
    @defer (hydrate on viewport) {
      <app-matricula />
    }
    @defer (hydrate on viewport) {
      <app-preguntas />
    }
    @defer (hydrate on viewport) {
      <app-visitanos />
    }
  `,
})
export class Inicio {
  constructor() {
    const c = inject(Contenido);
    inject(Seo).aplicar({
      titulo: c.sitio.seo.titulo,
      descripcion: c.sitio.seo.descripcion,
      ruta: '/',
      urlBase: c.sitio.url,
      imagen: c.sitio.seo.imagen,
      nombreSitio: c.sitio.nombre,
      datosEstructurados: construirDatosEstructurados({
        sitio: c.sitio,
        horarios: c.horarios,
        preguntas: c.preguntas,
        rutaLogo: rutaFoto('logo-dejando-huella', 480),
      }),
    });
  }
}
