import { Component, inject } from '@angular/core';

import { RegistrarEvento } from '../../../../core/analitica/registrar-evento';
import { enlaceWhatsapp } from '../../../../core/contacto/whatsapp';
import { Contenido } from '../../../../core/contenido/contenido';
import { Aparecer } from '../../../../shared/ui/aparecer/aparecer';
import { Foto } from '../../../../shared/ui/foto/foto';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { TitularAnimado } from '../../../../shared/ui/titular-animado/titular-animado';

const TELAS = ['t-cuadrille t-cuadrille--suave', 't-lavanda', 't-fieltro'];

/** Grupos por edad. Cada uno abre WhatsApp con su nombre. Gesto: la foto se despliega. */
@Component({
  selector: 'app-grupos',
  imports: [RegistrarEvento, Aparecer, Foto, Retazo, TitularAnimado],
  templateUrl: './grupos.html',
  styleUrl: './grupos.css',
})
export class Grupos {
  private readonly c = inject(Contenido);
  protected readonly g = this.c.grupos;
  protected readonly grupos = this.g.grupos.map((grupo, i) => ({
    ...grupo,
    tela: TELAS[i % TELAS.length],
    enlace: enlaceWhatsapp(this.c.sitio.contacto.whatsapp, grupo.mensajeWhatsapp),
  }));
}
