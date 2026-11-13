import {
  DOCUMENT,
  EnvironmentProviders,
  PLATFORM_ID,
  afterNextRender,
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Analitica, AnaliticaInactiva } from './analitica';
import { AnaliticaUmami } from './analitica-umami';

/**
 * Id del sitio en Umami Cloud (Configuración → Sitios web). Vacío = analítica apagada.
 * No es un secreto: aparece en el HTML público.
 */
export const UMAMI_ID_SITIO = '';
const DOMINIO_PRODUCCION = 'dejandohuellacr.com';

/** Punto único donde se elige el proveedor de analítica. */
export function provideAnalitica(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: Analitica,
      useFactory: () => {
        const enNavegador = isPlatformBrowser(inject(PLATFORM_ID));
        return enNavegador && UMAMI_ID_SITIO
          ? new AnaliticaUmami(inject(DOCUMENT), UMAMI_ID_SITIO, DOMINIO_PRODUCCION)
          : new AnaliticaInactiva();
      },
    },
    provideEnvironmentInitializer(() => {
      const analitica = inject(Analitica);
      if (analitica instanceof AnaliticaUmami) afterNextRender(() => analitica.cargar());
    }),
  ]);
}
