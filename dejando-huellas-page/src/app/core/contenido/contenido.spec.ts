import { normalizarNombreMedia } from './contenido';

describe('normalizarNombreMedia', () => {
  it.each([
    ['agricultura-sembrando', 'agricultura-sembrando'],
    ['media/fotos/agricultura-sembrando.jpg', 'agricultura-sembrando'],
    ['/dejando-huellas-page/media/fotos/aula.JPEG', 'aula'],
    ['media/videos/cocina.mp4', 'cocina'],
  ])('«%s» → «%s»', (entrada, esperado) => expect(normalizarNombreMedia(entrada)).toBe(esperado));
});
