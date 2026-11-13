import { Routes } from '@angular/router';

/** Rutas con carga diferida. Cada una se prerenderiza a su propio index.html (ver app.routes.server.ts). */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/inicio/inicio').then((m) => m.Inicio) },
  {
    path: 'privacidad',
    loadComponent: () => import('./features/privacidad/privacidad').then((m) => m.Privacidad),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./features/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/no-encontrada/no-encontrada').then((m) => m.NoEncontrada),
  },
];
