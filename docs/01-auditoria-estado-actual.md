# Auditoría del estado actual: Centro Infantil Dejando Huella

| | |
|---|---|
| **Sitio auditado** | https://dejandohuellacr.com/ |
| **Fecha de la auditoría** | 2026-11-11 |
| **Fase** | 1 de 2: diagnóstico. La fase 2 son mockups de una landing mejorada. |
| **Objetivo del proyecto** | Proponer al dueño un rediseño completo (diseño, SEO, UI/UX, posicionamiento) para captar un cliente nuevo. |
| **Capturas** | [screenshots/](screenshots/) (ver [Evidencia](#evidencia)) |

## 1. Contexto

- **Negocio:** guardería / centro infantil en Ciudad Quesada, San Carlos, Alajuela, Costa Rica.
- **Contacto público:** WhatsApp/teléfono +506 6478 1319, correo en Gmail, sin redes sociales enlazadas.
- **Sitio actual:** página única estática (~13 KB de HTML) alojada en GitHub Pages. Redirige de `http` a `https` y de `www` al dominio sin `www`.
- **Identidad existente:** logo multicolor con huella de mano, paleta verde azulado / naranja / coral / azul marino sobre crema, tipografías Fredoka (títulos) y Nunito (texto).

### Estructura actual de la página

1. Encabezado con logo y menú (Inicio, Nosotros, Galería, Contacto).
2. Hero: "Donde cada pequeño paso cuenta" + botón "Solicitar propuesta educativa".
3. "Lo que nos hace especiales": 3 tarjetas (Crecemos con amor, Aprendemos con alegría, Dejamos huella).
4. "Metodología": 3 tarjetas con emoji y un párrafo cada una.
5. "Nuestras Instalaciones": 3 fotos de salones.
6. "¡Ven a conocernos!": dirección, teléfono, correo, botón de WhatsApp y mapa de Google.
7. Pie de página con el copyright.

## 2. Resumen

Visualmente la página **no está mal**: es limpia, coherente con la marca y con tipografías adecuadas para el público. No conviene plantearla al dueño como "fea". Sus problemas reales y demostrables son:

1. **Casi no tiene contenido** (~1.290 caracteres en toda la página). No explica edades, horarios, servicios, equipo, matrícula ni precios.
2. **No está preparada para buscadores ni para compartirse** (sin meta description, Open Graph, datos estructurados ni sitemap).
3. **Convierte poco:** el botón principal promete una "propuesta educativa" que no existe y el contacto es texto plano.
4. **Accesibilidad y móvil deficientes:** contrastes por debajo del mínimo, sin menú en celular, estructura de encabezados rota.

## 3. Hallazgos priorizados

Prioridades: **P0** afecta a la captación de clientes, **P1** jerarquía/contraste/accesibilidad, **P2** rendimiento y contenido visual, **P3** pulido.

### P0: Captación de clientes

| # | Hallazgo | Evidencia |
|---|---|---|
| 1 | El botón principal no cumple lo que promete. "Solicitar propuesta educativa" solo baja a la tarjeta de contacto: no hay formulario ni mensaje de WhatsApp prellenado (`wa.me/50664781319` sin texto). | Snapshot: el enlace apunta a `#contacto`; 0 formularios en la página. |
| 2 | Falta la información que un padre busca primero: edades/niveles, horario, servicios (alimentación, transporte, horario extendido), equipo y formación, proceso de matrícula, testimonios y preguntas frecuentes. Las secciones actuales son frases genéricas. | ~1.290 caracteres de texto en total. |
| 3 | En móvil no hay navegación. Los enlaces del menú quedan ocultos (0×0 px) y no existe botón de menú. | Medición en viewport 390 px; sin elementos `aria-expanded`. |
| 4 | Teléfono y correo son texto plano: sin enlaces `tel:` ni `mailto:`, sin botón flotante de WhatsApp y sin redes sociales. | 0 enlaces `tel:`/`mailto:`; 0 enlaces a redes. |
| 5 | SEO local prácticamente nulo (ver detalle abajo). | Ver sección 4. |

### P1: Jerarquía, contraste y accesibilidad

| # | Hallazgo | Evidencia |
|---|---|---|
| 6 | Contraste por debajo de WCAG (mínimo 4,5:1 en texto normal): botón naranja con texto blanco **2,49:1**; botón de WhatsApp y etiquetas verdes del contacto **3,12:1**; "paso cuenta" en el titular **2,74:1** (texto grande, mínimo 3:1). | Valores calculados sobre los colores renderizados. |
| 7 | En móvil la jerarquía se invierte: los títulos de sección (44,8 px) son mayores que el titular principal (40 px). Interlineado de títulos de 1,6 (excesivo): el titular ocupa 3 líneas muy separadas y empuja el botón al borde de la primera pantalla. | Capturas `mobile-hero.png`, `mobile-cards.png`. |
| 8 | Estructura HTML defectuosa: 3 `h3` vacíos en "Metodología" y `id="nosotros"` duplicado. No hay `<main>` ni enlace "saltar al contenido". | Inspección del DOM. |
| 9 | Textos alternativos que no corresponden a la foto: la imagen del comedor dice "Uniformes", la del aula dice "Área de juegos". | Atributos `alt` vs. archivo (`comedor.jpeg`, `aula_espacio.jpeg`, `entrada.jpeg`). |
| 10 | El lenguaje "l@s niñ@s" se lee mal y los lectores de pantalla lo pronuncian de forma errónea. | Texto de la tarjeta de metodología. |
| 11 | Los emojis hacen de iconos (❤️🌈🌱🧸🧩🧠): se ven distinto en cada sistema, restan profesionalidad y los lectores de pantalla los leen. | Capturas de escritorio y móvil. |
| 12 | Sin estilos de foco visibles, sin soporte para `prefers-reduced-motion` y uso de `transition: all`. El encabezado fijo ocupa ~90 px en móvil solo para el logo. | Revisión de hojas de estilo; único `@media` es `(max-width: 768px)`. |

### P2: Rendimiento y contenido visual

| # | Hallazgo | Evidencia |
|---|---|---|
| 13 | Imágenes sin optimizar: 3 fotos de 4160×3120 px (546 KB, 697 KB, 930 KB) mostradas a 415×280 px; sin `width`/`height`, sin `loading="lazy"`, sin WebP/AVIF. El logo pesa 105 KB. Total transferido ≈ 2,2 MB. | `performance.getEntriesByType('resource')`. |
| 14 | La "Galería" son solo 3 fotos de salones vacíos, sin niños ni actividades y sin visor para ampliarlas. La sección ni siquiera tiene enlaces. | Capturas de escritorio. |
| 15 | Sin prueba social: sin reseñas, testimonios, años de experiencia ni permisos o habilitaciones visibles. | Revisión de contenido. |
| 16 | Sin favicon declarado ni `theme-color`. El pie de página solo tiene el copyright. | `<link rel="icon">` ausente. |
| 17 | El iframe del mapa no tiene atributo `title` (accesibilidad). | Inspección del DOM. |

### P3: Pulido

| # | Hallazgo |
|---|---|
| 18 | Las 6 tarjetas siguen el mismo patrón repetitivo, sin ritmo visual; el primer bloque de la página es solo texto sobre fondo crema, sin ninguna foto. |
| 19 | Sin analítica ni seguimiento de clics a WhatsApp, por lo que el dueño no puede medir el retorno de la página. |

## 4. Detalle técnico de SEO

| Elemento | Estado actual |
|---|---|
| `<title>` | "Centro Infantil Dejando Huella" (sin "guardería", ciudad ni zona) |
| Meta description | Ausente |
| Canonical | Ausente |
| Open Graph / Twitter Card | Ausentes (al compartir por WhatsApp o Facebook no hay imagen ni descripción) |
| Datos estructurados (JSON-LD) | Ausentes (`ChildCare` / `LocalBusiness`) |
| `robots.txt` / `sitemap.xml` | Ambos devuelven 404 |
| `lang` | `es` (correcto; podría ser `es-CR`) |
| Un solo `<h1>` | Sí, pero el resto de encabezados está mal estructurado (hallazgo 8) |
| HTTPS y redirecciones | Correcto (301 de `http` a `https` y de `www` al dominio base) |
| Google Business Profile | No verificado |

## 5. Rendimiento medido

Medición puntual en un solo navegador y una sola conexión: orientativa, no sustituye a Lighthouse.

| Métrica | Valor |
|---|---|
| TTFB | ~355 ms |
| DOMContentLoaded | ~376 ms |
| Evento `load` | ~2.589 ms (dominado por las imágenes) |
| Transferencia total | ~2,2 MB |
| Caché HTTP | `max-age=600` (GitHub Pages) |

## 6. Lo que funciona y conviene conservar

- Logo reconocible y paleta cálida adecuada al público infantil.
- Tipografías Fredoka y Nunito, legibles y coherentes con la marca.
- Texto principal con buen contraste (azul marino sobre crema, 12,9:1 a 14,8:1).
- Diseño responsivo sin desbordamiento horizontal (ancho de página igual al del viewport a 390 px).
- Mapa de Google integrado con carga diferida; HTTPS correcto.
- Fotos reales del centro con murales atractivos y coloridos.

## 7. Dirección propuesta para la fase 2

**Conservar la identidad (logo y paleta, corrigiendo contrastes) y convertir la página en una herramienta de matrícula.**

- **Primera pantalla:** foto real (idealmente con niños, con autorización), propuesta de valor clara y botón de WhatsApp con mensaje prellenado.
- **Secciones nuevas:** programas por edad, un día típico, equipo, instalaciones con galería ampliable, testimonios, preguntas frecuentes y proceso de matrícula en pocos pasos.
- **Conversión:** botón flotante de WhatsApp, enlaces `tel:` y `mailto:`, formulario breve opcional.
- **SEO local:** título y meta description orientados a "guardería en Ciudad Quesada / San Carlos", datos estructurados `ChildCare`, Open Graph, sitemap, y recomendación de optimizar el Google Business Profile.
- **Calidad técnica:** imágenes optimizadas, menú móvil, contrastes AA, encabezados correctos, foco visible, `prefers-reduced-motion`.
- **Medición:** analítica básica y seguimiento de clics a WhatsApp para demostrar resultados.

### Pendiente de definir con el usuario antes de diseñar

- ¿Se conserva la paleta actual o se explora una nueva?
- ¿Hay material adicional: fotos con niños, testimonios, listado de servicios, horarios, tarifas, permisos?
- ¿Se entregan solo mockups o también una versión navegable en HTML?
- ¿Qué se incluirá en la propuesta comercial (alcance, precios, mantenimiento)?

## 8. Método y limitaciones

**Herramientas:** `agent-browser` (Chrome 157) con viewport de escritorio 1440×900 y perfil iPhone 14 (390 px); inspección del DOM, medición de contraste, recursos y cabeceras HTTP con `curl`. Se aplicaron las reglas de las [Web Interface Guidelines de Vercel](https://github.com/vercel-labs/web-interface-guidelines) a la página publicada (no a su código fuente).

**No verificado:**

- Puntuación de Lighthouse / Core Web Vitals.
- Presencia y estado del Google Business Profile.
- Comportamiento en Safari iOS real y con lector de pantalla.
- Posicionamiento actual en buscadores y competencia local.
- Cumplimiento legal o normativo del centro (permisos, habilitaciones).

## Evidencia

| Archivo | Contenido |
|---|---|
| [screenshots/desktop-hero.png](screenshots/desktop-hero.png) | Escritorio, primera pantalla |
| [screenshots/desktop-full.png](screenshots/desktop-full.png) | Escritorio, página completa |
| [screenshots/mobile-hero.png](screenshots/mobile-hero.png) | Móvil, primera pantalla (sin menú) |
| [screenshots/mobile-cards.png](screenshots/mobile-cards.png) | Móvil, tarjetas |
| [screenshots/mobile-contacto.png](screenshots/mobile-contacto.png) | Móvil, contacto y botón de WhatsApp |
| [screenshots/mobile-mapa-footer.png](screenshots/mobile-mapa-footer.png) | Móvil, mapa y pie de página |
| [screenshots/mobile-full.png](screenshots/mobile-full.png) | Móvil, página completa (la captura repite contenido al final por un fallo de la herramienta) |
