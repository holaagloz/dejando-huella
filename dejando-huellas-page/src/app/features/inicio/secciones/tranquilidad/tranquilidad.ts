import { Component, inject } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { Aparecer } from '../../../../shared/ui/aparecer/aparecer';
import { Foto } from '../../../../shared/ui/foto/foto';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { TitularAnimado } from '../../../../shared/ui/titular-animado/titular-animado';

/** Lo primero que pregunta una familia. Gesto: los retazos caen y se acomodan. */
@Component({
  selector: 'app-tranquilidad',
  imports: [Aparecer, Foto, Icono, Retazo, TitularAnimado],
  templateUrl: './tranquilidad.html',
  styleUrl: './tranquilidad.css',
})
export class Tranquilidad {
  protected readonly t = inject(Contenido).tranquilidad;
}
