import { Component, inject } from '@angular/core';

import { Contenido } from '../../../../core/contenido/contenido';
import { Aparecer } from '../../../../shared/ui/aparecer/aparecer';
import { Foto } from '../../../../shared/ui/foto/foto';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { TitularAnimado } from '../../../../shared/ui/titular-animado/titular-animado';
import { VideoClip } from '../../../../shared/ui/video-clip/video-clip';

const TELAS = [
  't-salvia-suave',
  't-mostaza-suave',
  't-cuadrille t-cuadrille--suave',
  't-lavanda',
  't-fieltro',
  't-rayas',
];
// La raya (tercera) no repite la tela de ningún vecino en 1, 2 ni 3 columnas.
const TELAS_VIDEO = ['t-lavanda', 't-fieltro', 't-rayas'];

/**
 * Las experiencias académicas del centro, con sus fotos y videos reales. Las que tienen video van
 * primero (retazos altos, 4:5); el resto sigue con foto.
 */
@Component({
  selector: 'app-experiencias',
  imports: [Aparecer, Foto, Icono, Retazo, TitularAnimado, VideoClip],
  templateUrl: './experiencias.html',
  styleUrl: './experiencias.css',
})
export class Experiencias {
  protected readonly e = inject(Contenido).experiencias;
  protected readonly conVideo = this.e.experiencias
    .filter((x) => x.video)
    .map((x, i) => ({ ...x, tela: TELAS_VIDEO[i % TELAS_VIDEO.length] }));
  protected readonly conFoto = this.e.experiencias
    .filter((x) => !x.video)
    .map((x, i) => ({ ...x, tela: TELAS[i % TELAS.length] }));
}
