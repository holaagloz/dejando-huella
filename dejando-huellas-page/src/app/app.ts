import { Component, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Movimiento } from './core/movimiento/movimiento';
import { BarraFija } from './layout/barra-fija/barra-fija';
import { Barra } from './layout/barra/barra';
import { Pie } from './layout/pie/pie';
import { HuellaToque } from './shared/ui/huella-toque/huella-toque';
import { Sprite } from './shared/ui/sprite/sprite';

/** Esqueleto común: sprite de íconos, barra, contenido de la ruta, pie y barra fija del celular. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraFija, Barra, Pie, HuellaToque, Sprite],
  template: `
    <app-sprite />
    <a class="saltar" href="#contenido">Saltar al contenido</a>
    <div class="sitio" appHuellaToque>
      <app-barra />
      <main id="contenido" tabindex="-1">
        <router-outlet />
      </main>
      <app-pie />
    </div>
    <app-barra-fija />
  `,
})
export class App {
  constructor() {
    const movimiento = inject(Movimiento);
    afterNextRender(() => void movimiento.iniciarDesplazamientoSuave());
  }
}
