import { normalizarNombreMedia } from './contenido';

describe('normalizarNombreMedia', () => {
  it.each([
    ['huerta-sembrando', 'huerta-sembrando'],
    ['media/fotos/huerta-sembrando.jpg', 'huerta-sembrando'],
    ['/dejando-huellas-page/media/fotos/aula.JPEG', 'aula'],
    ['media/videos/cocina.mp4', 'cocina'],
  ])('«%s» → «%s»', (entrada, esperado) => expect(normalizarNombreMedia(entrada)).toBe(esperado));
});
