/**
 * Red de seguridad del contenido editable (carpeta `contenido/`).
 * Corre en CI antes de publicar: si el cliente se equivoca al editar, el cambio no sale al sitio.
 * Cada mensaje de error dice qué corregir y dónde.
 */

import { enlaceWhatsapp } from '../contacto/whatsapp';
import { existeFoto } from '../media/media';
import { Contenido } from './contenido';
import { formatearHora } from './formato';
import { ICONOS } from './modelo';

type Nodo = unknown;

/** Recorre todo el contenido y junta los objetos que cumplen `es`. Así una sección nueva queda cubierta sola. */
function buscar<T>(
  nodo: Nodo,
  es: (o: Record<string, unknown>) => boolean,
  ruta = '',
  salida: [string, T][] = [],
) {
  if (Array.isArray(nodo)) nodo.forEach((n, i) => buscar(n, es, `${ruta}[${i}]`, salida));
  else if (nodo && typeof nodo === 'object') {
    const obj = nodo as Record<string, unknown>;
    if (es(obj)) salida.push([ruta, obj as T]);
    for (const [k, v] of Object.entries(obj)) buscar(v, es, ruta ? `${ruta}.${k}` : k, salida);
  }
  return salida;
}

describe('Contenido editable', () => {
  const contenido = new Contenido();
  const secciones = Object.fromEntries(Object.entries(contenido));

  const fotos = buscar<{ nombre: string; alt: string }>(
    secciones,
    (o) => typeof o['nombre'] === 'string' && 'alt' in o,
  );
  const videos = buscar<{ nombre: string; descripcion: string }>(
    secciones,
    (o) => typeof o['nombre'] === 'string' && 'descripcion' in o,
  );
  const iconos = buscar<{ icono: string }>(secciones, (o) => 'icono' in o);

  it('cada foto existe en media/fotos/ y tiene un texto alternativo útil', () => {
    expect(fotos.length).toBeGreaterThan(10);
    for (const [ruta, foto] of fotos) {
      expect(
        existeFoto(foto.nombre),
        `${ruta}: la foto «${foto.nombre}» no está en media/fotos/`,
      ).toBe(true);
      expect(
        foto.alt.trim().length,
        `${ruta}: describe la foto en «alt» (mínimo 10 letras)`,
      ).toBeGreaterThanOrEqual(10);
    }
  });

  it('cada video tiene su póster y una descripción', () => {
    for (const [ruta, video] of videos) {
      expect(
        existeFoto(`video-${video.nombre}`),
        `${ruta}: falta el video «${video.nombre}» (o su póster)`,
      ).toBe(true);
      expect(video.descripcion.trim().length, `${ruta}: describe el video`).toBeGreaterThanOrEqual(
        10,
      );
    }
  });

  it('cada ícono existe en el sprite', () => {
    for (const [ruta, { icono }] of iconos) {
      expect(ICONOS as readonly string[], `${ruta}: el ícono «${icono}» no existe`).toContain(
        icono,
      );
    }
  });

  it('los datos de contacto son válidos', () => {
    const { contacto, url } = contenido.sitio;
    expect(() => enlaceWhatsapp(contacto.whatsapp)).not.toThrow();
    expect(contacto.correo).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(contacto.instagram, 'el usuario de Instagram va sin @ ni enlace').toMatch(
      /^[a-z0-9._]+$/i,
    );
    expect(url, 'la URL del sitio va con https y sin barra final').toMatch(/^https:\/\/[^/]+$/);
  });

  it('las horas usan el formato HH:MM y cada modalidad termina después de empezar', () => {
    const { horario } = contenido.sitio;
    expect(() => [formatearHora(horario.apertura), formatearHora(horario.cierre)]).not.toThrow();
    for (const m of contenido.horarios.modalidades) {
      expect(() => [formatearHora(m.desde), formatearHora(m.hasta)], m.nombre).not.toThrow();
      expect(m.hasta > m.desde, `${m.nombre}: «hasta» debe ser después de «desde»`).toBe(true);
    }
  });

  it('los precios son montos enteros positivos para 1 a 5 días', () => {
    const { modalidades, matricula } = contenido.horarios;
    expect(modalidades.length).toBeGreaterThan(0);
    for (const m of modalidades) {
      expect(m.precios.length, `${m.nombre}: agrega al menos un precio`).toBeGreaterThan(0);
      for (const p of m.precios) {
        expect(
          Number.isInteger(p.monto) && p.monto > 0,
          `${m.nombre}, ${p.dias} días: monto inválido`,
        ).toBe(true);
        expect(p.dias >= 1 && p.dias <= 5, `${m.nombre}: los días van de 1 a 5`).toBe(true);
      }
    }
    expect(Number.isInteger(matricula.monto) && matricula.monto >= 0).toBe(true);
  });

  it('los grupos tienen identificadores únicos aptos para enlaces', () => {
    const ids = contenido.grupos.grupos.map((g) => g.id);
    expect(new Set(ids).size, 'hay dos grupos con el mismo id').toBe(ids.length);
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('los testimonios solo se activan si hay al menos uno real', () => {
    const { activo, testimonios } = contenido.testimonios;
    if (activo)
      expect(testimonios.length, 'activaste testimonios pero la lista está vacía').toBeGreaterThan(
        0,
      );
  });

  it('ningún texto queda vacío', () => {
    const vacios = buscar<Record<string, unknown>>(secciones, (o) =>
      Object.values(o).some((v) => typeof v === 'string' && v.trim() === ''),
    );
    expect(vacios.map(([ruta]) => ruta)).toEqual([]);
  });
});
