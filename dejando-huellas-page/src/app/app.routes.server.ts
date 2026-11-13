import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Salida 100 % estática para GitHub Pages: cada ruta conocida se escribe como HTML completo.
 * `/404` se copia a `404.html` al terminar el build (scripts/postbuild.mjs).
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'privacidad', renderMode: RenderMode.Prerender },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
