# Propuesta Dejando Huella · Gloz Studio

Propuesta de rediseño de la página del Centro Infantil Dejando Huella (Ciudad Quesada, San Carlos), con la dirección de arte **«Colcha de retazos»**: la página es una colcha cosida a mano y cada retazo responde algo que una familia pregunta antes de llamar.

## Qué enviar

| Archivo | Para qué |
|---|---|
| `dist/Dejando-Huella-Propuesta-Gloz.html` | **El archivo para enviar.** Un solo HTML (3,4 MB) con fotos, letras y animaciones adentro. Se abre con doble clic en Chrome, Edge o Safari. |
| `index.html` + `css/`, `js/`, `img/`, `fonts/`, `vendor/` | La versión editable. Si cambias algo aquí, regenera el archivo único (abajo). |
| `direccion-de-arte.html` | Hoja de muestra interna. No se envía. |

**Al enviarlo:** en computadora se ve completo. En celular, WhatsApp y el correo a veces muestran el HTML en una vista previa sin animaciones ni botones. Pide abrirlo con Chrome o Safari («Abrir con…»), o preséntalo tú desde tu computadora.

Regenerar el archivo único después de editar:

```bash
cd propuesta
node construir-archivo-unico.mjs
```

## Estructura de la página

1. **Portada de la propuesta (Gloz):** el comparador del antes y el después y la lista «Lo que cambia». Se quita al pasar a producción.
2. **Portada:** titular, botón de WhatsApp, foto y datos rápidos (horario, ubicación y edades).
3. **Cinta:** juego libre, arte y música, merienda, siesta y aire libre.
4. **Lo que te da tranquilidad:** 4 garantías.
5. **Un día en Dejando Huella:** 6 momentos del día.
6. **Salas por edad:** 3 salas, cada una con su mensaje de WhatsApp.
7. **Cómo aprendemos:** con los textos de metodología del sitio actual.
8. **Instalaciones:** las 3 fotos reales del centro, con visor para verlas en grande.
9. **Lo que dicen las familias:** espacio para un testimonio real.
10. **Inscripción en 3 pasos.**
11. **Preguntas frecuentes:** 7 preguntas.
12. **Visítanos:** formulario que arma el mensaje de WhatsApp, más datos de contacto y mapa.
13. **Pie.**

Además:
- menú de celular y barra fija de WhatsApp (aparece después de la portada y se esconde en Visítanos);
- botón **«Ver notas»**, que muestra qué mejora cada parte frente a la página actual;
- una huellita que aparece donde tocas.

## Dirección de arte: valores técnicos

**Colores** (leídos del logo):

| Rol | Valor |
|---|---|
| Letra y mezclilla | `#0D1A3C` |
| Manta (retazos de lectura) | `#FBF7EF` |
| Coral | `#E38F83`; puntada `#C96F62`; acento de texto `#A84E42` |
| Mostaza | `#DCA74C` |
| Salvia | `#A6B3A6` |
| Chambray | `#91A8CB` |
| Etiqueta «de ejemplo» | `#FFF3C9` |
| Gloz (solo portada y notas) | `#024AA9` |

**Contrastes comprobados:**

| Pareja | Contraste |
|---|---|
| Azul marino sobre coral (botón) | 6,93 |
| Sobre mostaza | 7,87 |
| Sobre salvia | 7,82 |
| Sobre chambray | 7,05 |
| Sobre manta | 15,98 |
| Texto secundario `#3B4664` sobre manta | 8,75 |
| Acento `#A84E42` sobre manta | 5,13 |
| Página actual, botón naranja con letra blanca | 2,49 (no pasa) |

**Letras** (servidas desde `fonts/`, sin depender de Google):

| Familia | Uso | Ajustes |
|---|---|---|
| Shantell Sans variable (300–800) | Titulares y etiquetas | Ejes `INFM` (informal) 60–100 y `BNCE` (rebote) 0–60 |
| Nunito variable (400–800) | Textos | |
| Montserrat y Yeseva One | Solo la portada de Gloz | |

**Forma:** retazos con radio de 6 px, parche-botón de 16 px y separación entre retazos de 9 px en celular y 12 px en escritorio. Las puntadas son trazos SVG redondos de 4,5 px con espacio de 5,5 px.

**Movimiento** (personalidad cálida y de juego):

```js
const M = { ease: 'power2.out', easeIO: 'power2.inOut', pop: 'back.out(1.4)', dur: 1, stagger: 0.09, dist: 26, lerp: 0.1 };
```

En CSS: `--ease: cubic-bezier(.33,1,.68,1)`, `--ease-pop: cubic-bezier(.34,1.5,.64,1)`, `--dur: 1s`, `--dist: 26px`.

**Animación firma:**
1. Los retazos de la portada caen y se acomodan.
2. El titular sube por líneas.
3. La puntada coral se cose alrededor de cada retazo y termina rodeando el botón de WhatsApp.
4. La huella del logo se estampa.

Dura unos 2,3 s, se salta con un toque y se libera sola a los 4,5 s.

**Rimas de la firma:** cada retazo se cose al aparecer, las huellitas del pie se estampan y la huella aparece al tocar.

**Gesto por sección:**

| Sección | Gesto |
|---|---|
| Tranquilidad | Los retazos caen |
| Un día | Las horas avanzan y el hilo mostaza se cose con el scroll |
| Salas | La foto se despliega |
| Inscripción | El hilo une los 3 pasos |
| Precios, formulario y preguntas | En calma |

**Librerías:** GSAP 3.13.0 (con ScrollTrigger y SplitText) y Lenis 1.3.11, en `vendor/`.
- **Sin JavaScript:** todo se ve completo y quieto.
- **Con «Reducir movimiento»:** nada se mueve solo y no hay scroll suave.

## Qué se edita fácil

- **Número de WhatsApp:** la constante `WA` en `js/sitio.js` (y el `href` de respaldo `https://wa.me/50664781319` en `index.html`).
- **Mensaje de cada botón:** el atributo `data-wa="..."` de cada enlace.
- **Textos, horarios y preguntas:** en `index.html`, por secciones (comentarios `INICIO` / `FIN`).
- **Fotos:** en `img/`, en WebP a 1400–1600 px de ancho y menos de 250 KB cada una.

## De dónde sale cada dato (11 de noviembre de 2026)

**Del sitio actual** (dejandohuellacr.com):
- nombre y logo;
- la frase «Donde cada pequeño paso cuenta» y «¡Ven a conocernos!»;
- dirección, teléfono/WhatsApp y correo;
- los textos de metodología (ligeramente editados y sin «l@s niñ@s»);
- las 3 fotos de instalaciones;
- la ubicación del mapa.

**Datos de ejemplo** (marcados en la página con etiqueta amarilla):
- horario de 7:00 a. m. a 6:00 p. m.;
- edades de 1 a 5 años y nombres de salas;
- rutina del día;
- 1 maestra por cada 6 niños;
- formación del personal;
- entrada controlada;
- comunicación por WhatsApp;
- alimentación incluida;
- medio tiempo o tiempo completo.

**Fotos ilustrativas** (Pexels y Unsplash, licencia gratuita de uso comercial; marcadas «foto ilustrativa»):

| Foto | Origen |
|---|---|
| Portada | Pexels 8540376 |
| Maestra en el piso | Pexels 8364069 |
| Jardín | Pexels 5997590 |
| Merienda | Pexels 1001914 |
| Bloques | Pexels 3661452 |
| Acuarela | Unsplash, Anita Jankovic |
| Alfombra | Pexels 8923258 |
| Manos con pintura | Pexels 1148998 |
| Abrazo | Pexels 4624968 |

Las originales están en `../materiales/stock/`.

**Pendiente de material real:** testimonios de familias, fotos con niños del centro (con permiso de los padres), permisos o habilitaciones, años de experiencia y equipo.

## Por validar (decisiones de Gloz)

- **Trato de tú** («tu hijo», «Agenda una visita»), como en el sitio actual. En Costa Rica muchas familias esperan **usted**.
- **Los botones de WhatsApp van al número real del centro.** Si pruebas la propuesta antes de presentarla, el mensaje le llega al dueño.
- **«Paso cuenta» va en un coral más oscuro (`#A84E42`)** que el del logo, para que se lea bien.
- **Paleta:** la del logo, llevada a telas. Se agregaron tonos suaves y profundos derivados de los mismos colores.
- **Nombres de salas inventados:** Huellitas, Exploradores y Preescolar.
- **«Instalaciones»:** los nombres de los espacios (Aula del espacio, Comedor, Pasillo del árbol) los puse según lo que se ve en las fotos.
- **Página con `noindex`:** la propuesta lleva `noindex` para no competir en Google con el sitio actual; se quita en producción.

## Pendientes antes de producción

- Confirmar todos los datos de ejemplo y reemplazar las fotos ilustrativas por fotos reales.
- Agregar 2 o 3 testimonios reales (o reseñas de Google con permiso).
- Quitar la portada de la propuesta, el botón «Ver notas» y la línea `noindex`.
- Crear `img/og-dejando-huella.jpg` (1200 × 630), que es la imagen que se ve al compartir el enlace.
- Agregar `robots.txt` y `sitemap.xml`.
- Agregar los horarios reales al JSON-LD (los datos estructurados para Google).
- Optimizar el Google Business Profile.
- Probar cada botón de WhatsApp en un celular: número correcto y acentos bien.
