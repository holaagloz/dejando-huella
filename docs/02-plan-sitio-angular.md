# Plan: sitio de producción de Dejando Huella en Angular

| | |
|---|---|
| **Fecha** | 2026-11-13 |
| **Estado** | Aprobado. Fases 0 a 8 implementadas en la rama `sitio-angular`; falta el lanzamiento (fase 9). |
| **Proyecto** | `dejando-huellas-page/` (Angular 22.2.6, CLI 22.2.7, Vitest) |
| **Fuentes** | Prototipo aprobado (`propuesta/index.html`), `DESIGN.md`, `PRODUCT.md`, PDF «Propuesta Educativa 2027» del cliente, 36 fotos y 9 videos del cliente |

## 1. Decisiones tomadas

| Tema | Decisión | Por qué |
|---|---|---|
| Hosting | GitHub Pages con el dominio `dejandohuellacr.com` (comprado en GoDaddy) | Gratis y ya conocido. Sirve archivos estáticos, que es lo que genera el prerender. |
| Renderizado | **SSG**: `@angular/ssr` con `outputMode: "static"` y `RenderMode.Prerender` | Google recibe el HTML completo sin ejecutar JS. No hace falta servidor, así que GitHub Pages alcanza. |
| Repositorio | El mismo (`holaagloz/dejando-huella`). Se desarrolla en una rama y al lanzar se limpia. | Lo pidió el usuario. La transferencia al cliente queda para después (sección 9). |
| Rutas | `/` (landing completa), `/privacidad/` y `404.html` | Un centro con una sola sede compite por una sola intención («guardería en Ciudad Quesada»). Una página fuerte rinde más que varias delgadas. Las rutas son lazy, así que agregar páginas después (por ejemplo `/matricula-2027/`) no exige rehacer nada. |
| Edición del cliente | **Contenido en JSON dentro del repo + Pages CMS** (editor visual gratuito que hace commits en GitHub) | No hay servidor ni base de datos y el costo es cero. Si el CMS desaparece, el contenido sigue en el repo. Cada cambio pasa por la compilación y las validaciones antes de publicarse. El cliente edita contenido, no código Angular. |
| Analítica | **Umami Cloud** (plan gratuito), sin cookies, con eventos de clic | No usa cookies, así que no necesita banner. Mide clics a WhatsApp, teléfono e Instagram por ubicación, y el dueño puede ver un panel compartido. Va detrás de un puerto (`Analitica`) para poder cambiar de proveedor. Hay que verificar el plan vigente al configurarlo. |
| Trato | **Tú** | El propio PDF del cliente habla de tú («Te damos la bienvenida», «Te invitamos»). |
| Firma | Pie con «Diseño · Studio Gloz», logo y enlace a studiogloz.com | Lo pidió el usuario. Va con un tratamiento cuidado y discreto, sin competir con la marca del cliente. |
| Nombre | Siempre «Centro Infantil Dejando Huella» (singular) | El PDF mezcla «Huella» y «Huellas». Para el SEO local el nombre tiene que ser idéntico en la web, Google Business e Instagram. |

## 2. Datos reales (del PDF 2027) que reemplazan los de ejemplo

| Dato | Valor | Antes en el prototipo |
|---|---|---|
| Apertura | Septiembre de 2026 | No estaba |
| Lema | «Creciendo con amor, aprendiendo con alegría y dejando huella para toda la vida» | No estaba |
| Filosofía | Educación para la vida, desde el amor, el respeto y experiencias significativas, respetando el ritmo de cada niño | Texto del sitio actual |
| Grupos | **Semillitas** de 3 meses a 2 años · **Pasitos** de 2 a 3 años · **Huellitas** de 3 a 4 años | Huellitas, Exploradores y Preescolar (inventados) |
| Edades | 3 meses a 4 años | 1 a 5 años |
| Horario | Tiempo completo de 7:00 a. m. a 5:00 p. m. · Medio tiempo de mañana de 7:00 a. m. a 1:00 p. m. · Medio tiempo de tarde de 12:00 m. a 5:00 p. m. | 7:00 a. m. a 6:00 p. m. |
| Mensualidad, tiempo completo | 5 días ₡185.000 · 3 días ₡125.000 · 2 días ₡85.000 | «Escríbenos» |
| Mensualidad, mañanas | 5 días ₡120.000 · 3 días ₡95.000 · 2 días ₡70.000 | |
| Mensualidad, tardes | 5 días ₡100.000 · 3 días ₡80.000 · 2 días ₡60.000 | |
| Plan de hermanos | 10 % de descuento | |
| Matrícula 2027 | ₡80.000 para reservar el espacio. Materiales y uniformes se pagan aparte. | |
| Experiencias | Inglés, lectoescritura, agricultura, música, educación física, STEAM, estimulación temprana y estimulación sensorial | Arte y música, aire libre |
| Alimentación | Desayuno, merienda de la mañana, almuerzo y merienda de la tarde. Cocinera con formación de chef. Menús elaborados y supervisados por una nutricionista especializada en alimentación infantil. | «Merienda nutritiva» |
| Seguridad | Personas autorizadas registradas con copia de cédula · póliza estudiantil del INS obligatoria | «Entrada controlada» genérica |
| Requisitos | Entrevista familiar, formulario de admisión, certificado de nacimiento, cédula de ambos padres, foto tamaño pasaporte, tarjeta de vacunas, cédulas de personas autorizadas, póliza INS, contrato firmado y pago de matrícula | |
| Uniforme | Camisa polo o camiseta blanca con verde salvia, short, enagua short o pantalón beige, medias beige, tenis o zapatos café | |
| Redes | Instagram `@dejandohuella.centroinfantil` | Ninguna |
| Teléfono y WhatsApp | 6478-1319 (sin cambios) | |

**Fuera de producción porque no tienen respaldo:** la proporción de 1 maestra por cada 6 niños, las fotos por WhatsApp durante el día, la formación en primeros auxilios, las horas exactas de la rutina, los testimonios y todas las fotos de banco. En producción no habrá ninguna etiqueta «dato de ejemplo»: cada dato está confirmado o no aparece. La sección de testimonios queda lista, pero apagada desde el contenido hasta que existan reseñas reales.

## 3. Mapa de la landing

| # | Sección | Contenido y material |
|---|---|---|
| 1 | Barra y menú del celular | Logo, anclas y parche de WhatsApp. El menú usa `<dialog>` nativo (atrapa el foco y cierra con Esc). |
| 2 | Portada | `h1` con la palabra clave y el lema («Centro infantil en Ciudad Quesada» + «Donde cada pequeño paso cuenta»). Foto real de la niña frente al mural del logo. Datos rápidos: 7:00 a. m. a 5:00 p. m., Barrio San Martín, 3 meses a 4 años. |
| 3 | Cinta | Las 8 experiencias académicas |
| 4 | Nosotros | Bienvenida, filosofía, apertura en 2026 y el lema del mural |
| 5 | Lo que te da tranquilidad | Personas autorizadas, nutricionista, equipo docente y póliza INS (todo real) |
| 6 | Grupos por edad | Semillitas, Pasitos y Huellitas. Cada uno abre WhatsApp con un mensaje propio. |
| 7 | Experiencias académicas | 8 retazos con fotos reales (huerta, ciencia, neón, música…) y 1 o 2 videos cortos |
| 8 | Alimentación | 4 tiempos de comida, cocinera y nutricionista. Video de la cocina. |
| 9 | Un día aquí | La secuencia real (llegada, desayuno, experiencias, merienda, almuerzo, merienda de la tarde, salida). Solo lleva horas en la entrada y la salida hasta que el centro confirme el resto. |
| 10 | Instalaciones y galería | Fotos reales con visor, incluidas fechas especiales (traje típico, Navidad) |
| 11 | Horarios y mensualidades | Tabla accesible de modalidades, plan de hermanos y matrícula 2027 |
| 12 | Matrícula en 3 pasos | Escríbenos, luego entrevista y visita, luego documentos y reserva. Los requisitos van en una lista desplegable. |
| 13 | Preguntas frecuentes | Salen de datos reales: edades, horario, alimentación, uniforme, póliza, materiales y hermanos |
| 14 | Visítanos | Formulario que arma el mensaje de WhatsApp, teléfono, correo, Instagram y el mapa con carga diferida |
| 15 | Pie | Logo, lema, anclas, Instagram y firma de Studio Gloz |

Lo que se elimina del prototipo: la portada de Gloz, el comparador, «Ver notas», las notas de Gloz, el `noindex`, las fuentes Montserrat y Yeseva One, las fotos de banco y las etiquetas de ejemplo.

## 4. Arquitectura Angular

Se sigue la guía de estilo actual de Angular: archivos sin sufijo de tipo (`portada.ts`, como el `app.ts` que generó el CLI), componentes standalone, signals, `input()` y `output()`, control de flujo nativo, `inject()` y `host` en lugar de decoradores. La organización es por funcionalidad.

```
dejando-huellas-page/
├── contenido/                    ← lo que edita el cliente (JSON), uno por sección
│   ├── sitio.json                  nombre, contacto, dirección, redes, textos SEO
│   ├── grupos.json  modalidades.json  experiencias.json  alimentacion.json
│   ├── tranquilidad.json  un-dia.json  galeria.json  matricula.json  preguntas.json
├── media/                        ← originales (fotos ≤2400 px sin EXIF, videos ya comprimidos)
│   ├── fotos/   videos/
├── scripts/
│   ├── procesar-media.mjs          sharp: variantes WebP 480/800/1200/1600, manifiesto con medidas, borra EXIF/GPS
│   ├── procesar-videos.mjs         ffmpeg-static: recorte, H.264 ~1 MB y póster
│   └── subset-fuentes.mjs          reduce las fuentes a caracteres latinos (Shantell pasa de 174 KB a mucho menos)
├── public/                       ← robots.txt, CNAME, favicon, og-dejando-huella.jpg, fuentes subset
├── .pages.yml                    ← configuración de Pages CMS (campos tipados por archivo)
└── src/
    ├── styles/                   ← sistema de diseño global, portado de sitio.css
    │   ├── tokens.css  base.css  telas.css  tipografia.css  movimiento.css
    └── app/
        ├── app.ts  app.config.ts  app.config.server.ts  app.routes.ts  app.routes.server.ts
        ├── core/                 ← servicios únicos y reglas sin UI
        │   ├── contenido/          modelo tipado (interfaces) y servicio que expone el JSON
        │   ├── seo/                seo.ts (Title, Meta, canonical) y datos-estructurados.ts (función pura → JSON-LD)
        │   ├── analitica/          analitica.ts (puerto), umami.ts (adaptador), provide-analitica.ts
        │   ├── contacto/           whatsapp.ts (función pura que arma el enlace y el mensaje)
        │   └── movimiento/         carga GSAP y Lenis solo en el navegador; respeta «reducir movimiento»
        ├── shared/ui/            ← piezas de la colcha, reutilizables y sin datos
        │   ├── retazo/             directiva appRetazo (costura SVG, respaldo con outline)
        │   ├── parche/             botón de WhatsApp (registra el evento de analítica)
        │   ├── etiqueta/  icono/  foto/ (NgOptimizedImage + loader propio)  huella/
        ├── layout/               ← barra, menu-movil, barra-fija, pie
        └── features/
            ├── inicio/             la landing (ruta lazy): inicio.ts compone las secciones
            │   └── secciones/      portada, tranquilidad, nosotros, grupos, experiencias, alimentacion,
            │                       un-dia, instalaciones, horarios, matricula, preguntas, visitanos
            ├── privacidad/
            └── no-encontrada/
```

**Reglas de dependencia:** `features` usa `shared` y `core`. `shared` no conoce ni el contenido ni el negocio. `core` no importa componentes. Las secciones reciben datos tipados del servicio de contenido y no leen JSON directamente.

**Una sola fuente de verdad.** El teléfono, el horario, los grupos y las preguntas viven solo en `contenido/`. De ahí salen la página, los mensajes de WhatsApp, el JSON-LD y el `sitemap.xml`, así que no pueden contradecirse.

**Validación del contenido del cliente, en tres capas:**
1. Pages CMS ofrece campos tipados: el cliente elige de listas y escribe números en campos numéricos.
2. TypeScript importa cada JSON con su interfaz (`resolveJsonModule`). Si la estructura se rompe, la compilación falla y no se publica.
3. Una prueba de Vitest revisa reglas de negocio: precios positivos, teléfono válido, fotos que existen y textos alternativos presentes.

**Imágenes.** `NgOptimizedImage` con un loader propio que pide `media/<nombre>-<ancho>.webp`, alineado con los anchos que genera el script (`IMAGE_CONFIG.breakpoints`). Las medidas salen del manifiesto, así que no hay saltos de diseño. Va **solo WebP**, no AVIF: `NgOptimizedImage` no genera `<picture>`, así que no habría respaldo para navegadores sin AVIF. La foto de portada lleva `priority`.

**Movimiento.** GSAP 3.13+ (ScrollTrigger y SplitText incluidos y gratuitos) y Lenis, desde npm. Se cargan con importación dinámica dentro de `afterNextRender`, fuera del paquete inicial y nunca en el prerender. Hay un cambio frente al prototipo: **la foto de portada y el `h1` nunca se ocultan para animarlos**, porque eso empeora el LCP. La firma se hace con el hilo, las costuras y el sello. Sin JS la página se ve completa y quieta, y con «reducir movimiento» no hay animaciones.

**Hidratación.** `provideClientHydration(withEventReplay())` y `@defer (hydrate on viewport)` en las secciones de abajo, para enviar menos JS al cargar.

**Formulario.** Signal Forms (`@angular/forms/signals`) con validación de nombre y edad. Las opciones de edad salen de `grupos.json`. Al enviarlo abre WhatsApp: no guarda datos ni los envía a ningún servidor.

## 5. SEO

- HTML prerenderizado, `lang="es-CR"`, un solo `h1`, encabezados en orden y textos alternativos reales.
- Título: «Guardería y centro infantil en Ciudad Quesada · Dejando Huella». Descripción con las edades, el horario y la zona. Canonical `https://dejandohuellacr.com/`.
- Open Graph y Twitter con `og-dejando-huella.jpg` (1200×630, foto real + logo).
- JSON-LD `ChildCare` con dirección, coordenadas (sacadas del Plus Code 8HCF+4M6), `openingHoursSpecification`, `priceRange`, `foundingDate` 2026-09, logo, imagen y `sameAs` con Instagram. También `FAQPage`, aunque Google hoy casi no muestra resultados enriquecidos de preguntas para este tipo de sitios: aporta poco, pero no estorba.
- `robots.txt`, `sitemap.xml` generado al compilar y `404.html` real.
- Core Web Vitals: fuentes subset con `preload`, foto LCP con `priority`, JS de animación diferido, imágenes con medidas y videos con `preload="none"` y póster.
- Fuera del código, a cargo del dueño y con guía nuestra: verificar Google Search Console (registro TXT en GoDaddy), enviar el sitemap y crear y optimizar Google Business Profile, que en búsquedas locales pesa más que la web.

## 6. Analítica

Eventos: `clic_whatsapp` (con `ubicacion`: portada, barra, grupo-semillitas, formulario…), `clic_telefono`, `clic_instagram`, `clic_mapa` y `formulario_enviado`. Un clic a WhatsApp mide la intención: no garantiza que el mensaje se haya enviado, y así se le explicará al dueño. El panel de Umami se comparte por enlace. La página `/privacidad/` explica en lenguaje simple qué se mide y que el formulario no guarda datos.

## 7. Calidad

| Capa | Qué cubre |
|---|---|
| Lint | `angular-eslint` (hoy el proyecto no tiene) y Prettier, que ya está |
| Unitarias (Vitest) | Armado del enlace y el mensaje de WhatsApp (acentos y saltos de línea), validación del formulario, constructor del JSON-LD, servicio SEO, reglas del contenido |
| Componentes | Secciones con contenido real, estados vacíos (por ejemplo testimonios apagados) y teclado en el menú y el visor |
| E2E (Playwright + axe) | Contra el sitio prerenderizado: cero violaciones de axe, menú del celular, formulario, enlaces de WhatsApp y HTML sin JS |
| Prerender | Una prueba lee `dist/…/index.html` y verifica el `h1`, las metas, el canonical y que el JSON-LD sea válido |
| Lighthouse CI | Presupuestos de rendimiento, accesibilidad, buenas prácticas y SEO en celular. Se reporta lo medido, sin prometer puntajes. |
| Manual | Cada botón de WhatsApp en un celular real (número y acentos), Safari iOS y revisión de fidelidad contra el prototipo con `/impeccable` |

## 8. Fases

| Fase | Entregable | Cierre |
|---|---|---|
| 0. Preparación | Rama `sitio-angular`, `.gitignore` raíz, proyecto Angular versionado, media del cliente fuera de `propuesta/img` (el video repetido se descarta) | `ng build` pasa |
| 1. Fundaciones | SSR estático, rutas, estilos globales portados, fuentes subset, sprite de íconos, modelo y JSON de contenido, scripts de media y loader, `whatsapp.ts`, ESLint | Pruebas unitarias en verde y prerender generado |
| 2. Layout | Barra, menú del celular, barra fija y pie con la firma | axe sin violaciones |
| 3. Secciones | Las 12 secciones con contenido real | Revisión visual contra el prototipo en 390 y 1440 px |
| 4. Movimiento | Directiva de costura, hilo firma, gestos por sección y huella al tocar | Sin regresión de LCP y CLS = 0 |
| 5. SEO | Servicio SEO, JSON-LD, robots, sitemap, imagen OG, 404 y privacidad | Prueba de prerender y Rich Results Test |
| 6. Analítica | Umami y eventos | Eventos vistos en el panel |
| 7. CMS | `.pages.yml` y la guía «Cómo editar tu página» para el cliente | Un cambio hecho desde el CMS llega publicado |
| 8. QA | E2E, Lighthouse y pruebas en celular real | Informe con resultados medidos |
| 9. Lanzamiento | Workflow nuevo, DNS y limpieza del repo | Sitio en `https://dejandohuellacr.com` con HTTPS |

## 9. Lanzamiento y traspaso

**Workflow:** instala dependencias, procesa la media, ejecuta lint y pruebas, compila, copia la ruta 404 a `404.html`, agrega `.nojekyll` y publica `dist/dejando-huellas-page/browser`. Hasta el lanzamiento, `main` sigue publicando `propuesta/`.

**DNS en GoDaddy:**

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | 185.199.108.153 · 185.199.109.153 · 185.199.110.153 · 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 · 2606:50c0:8001::153 · 2606:50c0:8002::153 · 2606:50c0:8003::153 |
| CNAME | www | `<cuenta>.github.io` |
| TXT | (el que indique GitHub) | Verificación del dominio, para evitar que alguien lo tome |

El sitio actual ya está en GitHub Pages con ese dominio. Primero hay que **quitar el dominio del repo actual** y después ponerlo en este. Son minutos sin servicio, así que conviene hacerlo en un horario tranquilo. Al final se activa «Enforce HTTPS».

**Limpieza al lanzar (se confirma antes de borrar):**
- Se conservan `DESIGN.md`, `PRODUCT.md`, `docs/` (auditoría y este plan), `propuesta/index.html` con sus `css/js/img/fonts/vendor` y `propuesta/direccion-de-arte.html` como archivo histórico. Quedan en el repo, pero **no se publican** en el dominio del cliente.
- Se eliminan `propuesta/dist/` (se puede regenerar), `materiales/stock/`, `propuesta/img/stock-*`, `.impeccable/review/` (unos 80 MB de capturas internas) y `propuesta/img/dejando-huellas-contenido-cliente/` (ya movida a `media/`).

**Traspaso al cliente:** GitHub permite transferir el repo, pero el historial incluiría la propuesta, las notas internas de Gloz y las capturas. La alternativa es entregarle un repo nuevo con historial limpio. Se decide al llegar a esta fase. En los dos casos, Search Console, Google Business, Umami y el dominio deben quedar a nombre del cliente.

## 10. Estado de los pendientes (actualizado el 2026-11-13)

| Pendiente | Estado |
|---|---|
| Edades de Semillitas | Resuelto: se usa el PDF (3 meses a 2 años). El letrero de la foto queda desactualizado frente al PDF; conviene avisarle al centro. |
| Días y precios | Resuelto: tiempo completo y medio tiempo, de 2 a 5 días, de 7:00 a 5:00. Precios del PDF publicados como mensualidades. Para 4 días la página invita a escribir, porque el PDF no trae ese precio. |
| Permiso de imagen | Resuelto: el centro tiene autorización de las familias. |
| Rutina diaria | Abierto (opcional): la sección muestra la secuencia real (comidas del PDF y experiencias) con horas solo en la llegada y la salida. |
| Correo | Se mantiene el del sitio actual. Confirmar que sigue vigente. |
| Firma | Resuelto: «Diseño · Studio Gloz» en el pie. |
| Equipo | Resuelto: Licenciatura en Educación Preescolar, Educación Musical y Bachillerato en Terapia del Lenguaje. |
| Puntos de cada grupo | Abierto: son texto editorial armado con las experiencias del PDF. El centro debe revisarlos. |
