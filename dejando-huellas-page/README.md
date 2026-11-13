# Centro Infantil Dejando Huella · sitio web

Landing del centro infantil en Ciudad Quesada (dejandohuellacr.com). Angular 22 con **prerender estático** (SSG) publicado en GitHub Pages. Diseño: dirección de arte «Colcha de retazos» (`../DESIGN.md`), por Studio Gloz.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo en http://localhost:4200 |
| `npm run build` | Procesa la media, compila, prerenderiza y prepara la salida para GitHub Pages (`dist/dejando-huellas-page/browser`) |
| `npm test -- --watch=false` | Pruebas unitarias y **validación del contenido editable** |
| `npm run lint` | ESLint (incluye reglas de accesibilidad de plantillas) |
| `npm run e2e` | Playwright + axe contra el build (requiere `npm run build` y `npx playwright install chromium`) |
| `npm run importar-media` | Importa fotos y videos nuevos desde `../materiales/cliente/media-original/` (manual) |
| `npm run fuentes` | Regenera las fuentes reducidas (manual, rara vez) |

## Estructura

```
contenido/           JSON editables por el cliente (Pages CMS: ../.pages.yml). Única fuente de verdad.
media/               Fotos (≤2400 px, sin metadatos) y clips de video. Se versionan.
scripts/             Procesamiento de media, fuentes, postbuild (404, sitemap) y servidor estático de pruebas.
e2e/                 Pruebas Playwright + axe.
src/styles/          Sistema de diseño global: tokens, telas, costura, parche, colcha.
src/app/
  core/              Reglas sin UI: contenido (modelo + validación), SEO y JSON-LD, analítica (puerto + Umami),
                     WhatsApp, media (loader de NgOptimizedImage), movimiento (GSAP/Lenis diferidos).
  shared/ui/         Piezas de la colcha sin datos: retazo (costura), foto, video, ícono, huella, botón de WhatsApp.
  layout/            Barra, menú del celular, barra fija y pie.
  features/          Páginas con carga diferida: inicio (secciones), privacidad, no-encontrada.
```

Dependencias: `features → shared, core`; `shared` no conoce el contenido; `core` no importa componentes.

## Decisiones

- **SEO:** todo se prerenderiza; título, descripción, canonical, Open Graph y JSON-LD (`ChildCare`, `WebSite`, `FAQPage`) salen del mismo contenido que pinta la página. `postbuild` genera `404.html` y `sitemap.xml`.
- **Contenido del cliente:** los JSON se importan con tipos (la estructura se comprueba al compilar) y `validar-contenido.spec.ts` revisa reglas de negocio (precios, horas, fotos existentes, textos alternativos). CI bloquea la publicación si fallan.
- **Imágenes:** `scripts/procesar-media.mjs` genera WebP en 480/800/1200/1600 px y un manifiesto con medidas; `NgOptimizedImage` usa un loader propio. Solo WebP: NgOptimizedImage no genera `<picture>` para ofrecer respaldo a AVIF.
- **Movimiento:** GSAP y Lenis se cargan después del primer render y nunca en el prerender ni con «reducir movimiento». La foto principal y el titular no se ocultan para animarse (LCP).
- **Analítica:** Umami (sin cookies). Se activa poniendo el id del sitio en `UMAMI_ID_SITIO` (`src/app/core/analitica/provide-analitica.ts`).
- **Formulario:** Signal Forms; abre WhatsApp con el mensaje armado. No guarda ni envía datos.

## Publicación

`../.github/workflows/sitio.yml` valida y construye en cada push. La publicación se activa en el lanzamiento con la variable de repositorio `PUBLICAR_SITIO=true` (ver `../docs/02-plan-sitio-angular.md`, sección 9).
