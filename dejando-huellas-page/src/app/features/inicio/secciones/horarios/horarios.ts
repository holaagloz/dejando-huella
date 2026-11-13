import { Component, inject } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { formatearColones, formatearRango } from '../../../../core/contenido/formato';
import { Aparecer } from '../../../../shared/ui/aparecer/aparecer';
import { BotonWhatsapp } from '../../../../shared/ui/boton-whatsapp/boton-whatsapp';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { TitularAnimado } from '../../../../shared/ui/titular-animado/titular-animado';

const TELAS = ['t-lavanda', 't-cuadrille t-cuadrille--suave', 't-fieltro'];

/** Horarios y mensualidades: una tabla accesible por modalidad, descuentos y matrícula. */
@Component({
  selector: 'app-horarios',
  imports: [Aparecer, BotonWhatsapp, Retazo, TitularAnimado],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css',
})
export class Horarios {
  protected readonly h = inject(Contenido).horarios;
  protected readonly modalidades = this.h.modalidades.map((m, i) => ({
    ...m,
    tela: TELAS[i % TELAS.length],
    horario: formatearRango(m.desde, m.hasta),
    precios: m.precios.map((p) => ({ ...p, monto: formatearColones(p.monto) })),
  }));
  protected readonly matricula = formatearColones(this.h.matricula.monto);
}
