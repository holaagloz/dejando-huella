import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnalitica } from './core/analitica/provide-analitica';
import { provideMedia } from './core/media/media';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    // Hidratación incremental: el HTML prerenderizado se reutiliza y cada sección se activa al verse.
    provideClientHydration(withIncrementalHydration()),
    provideMedia(),
    provideAnalitica(),
  ],
};
