---
name: Dejando Huella
description: Colcha de retazos cosida a mano sobre mezclilla azul marino; cada retazo responde una pregunta de las familias.
colors:
  ink: "#0D1A3C"
  ink-soft: "#3B4664"
  manta: "#FBF7EF"
  coral: "#E38F83"
  coral-deep: "#C96F62"
  coral-soft: "#F5CFC8"
  coral-texto: "#A84E42"
  mostaza: "#DCA74C"
  mostaza-deep: "#B9862E"
  mostaza-soft: "#F1DDB0"
  salvia: "#A6B3A6"
  salvia-deep: "#7D8E7D"
  salvia-soft: "#DCE3DA"
  chambray: "#91A8CB"
  chambray-deep: "#6C86AF"
  chambray-soft: "#D9E2F0"
  mezclilla: "#13234A"
  ejemplo: "#FFF3C9"
  gloz: "#024AA9"
typography:
  display:
    fontFamily: "Shantell Sans, Comic Sans MS, system-ui, sans-serif"
    fontSize: "clamp(2.45rem, 10.4vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "'INFM' 100, 'BNCE' 20"
  headline:
    fontFamily: "Shantell Sans, Comic Sans MS, system-ui, sans-serif"
    fontSize: "clamp(2rem, 7.4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.018em"
    fontVariation: "'INFM' 100, 'BNCE' 15"
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.025em"
  body:
    fontFamily: "Nunito, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Shantell Sans, Comic Sans MS, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.2
    fontVariation: "'INFM' 100, 'BNCE' 40"
  cover-display:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(2rem, 6.6vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  cover-accent:
    fontFamily: "Yeseva One, Georgia, serif"
    fontWeight: 400
    lineHeight: 1
rounded:
  etiqueta: "3px"
  retazo: "6px"
  campo: "8px"
  parche: "16px"
  pastilla: "999px"
spacing:
  costura: "9px"
  costura-escritorio: "12px"
  gutter: "clamp(16px, 4vw, 40px)"
  maxw: "1320px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.parche}"
    padding: "0.85em 1.5em"
    height: "56px"
  button-primary-hover:
    backgroundColor: "#E99D92"
  button-manta:
    backgroundColor: "{colors.manta}"
    textColor: "{colors.ink}"
    rounded: "{rounded.parche}"
    padding: "0.85em 1.5em"
    height: "56px"
  button-small:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.parche}"
    padding: "0.6em 1.1em"
    height: "48px"
  label-cloth:
    backgroundColor: "{colors.manta}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.etiqueta}"
    padding: "0.55em 1em 0.58em"
  label-sample:
    backgroundColor: "{colors.ejemplo}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.etiqueta}"
  label-real:
    backgroundColor: "{colors.salvia-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.etiqueta}"
  input-field:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.campo}"
    padding: "12px 14px"
    height: "52px"
  patch-reading:
    backgroundColor: "{colors.manta}"
    textColor: "{colors.ink}"
    rounded: "{rounded.retazo}"
    padding: "28px 22px 30px"
  button-gloz:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.gloz}"
    rounded: "{rounded.pastilla}"
    padding: "0.8em 1.4em"
    height: "52px"
---

# Design System: Dejando Huella

## Overview

**Creative North Star: "La colcha de retazos"**

Cada página es una sola colcha cosida a mano. Los retazos se colocan borde con borde sobre un respaldo de mezclilla azul marino (el azul del logo), y ese azul solo asoma en la costura entre bloques. Las telas son los colores del logo convertidos en tejidos limpios hechos con CSS: cuadrillé coral, chambray, raya mostaza, fieltro salvia, mezclilla y manta. La manta queda reservada para los retazos de lectura. Cada retazo lleva una costura de puntada corrida que el JS dibuja en SVG. Las fotos se cosen como un retazo más, los rótulos son etiquetas de tela escritas a mano y los botones son parches bordados.

La densidad es de colcha y no de folleto: los bloques llenan su celda y no flotan sobre un fondo vacío. La jerarquía sale del tamaño de cada retazo y de su tela, no de tarjetas iguales repetidas. La tinta azul marino se usa sobre todos los colores. La profundidad existe solo como el leve relieve de una tela. El movimiento es cálido y de juego: los retazos llegan con un pequeño rebote, las costuras se cosen solas a medida que aparecen y un toque deja una huella que se desvanece.

La identidad de Gloz Studio (azul real, Montserrat, Yeseva One) vive solo en la portada de la propuesta, en las notas de propuesta que se pueden mostrar u ocultar y en la firma del pie. Nunca entra en la colcha.

**Key Characteristics:**
- Retazos borde con borde (separación 0 dentro de cada bloque); el azul marino se ve solo entre bloques, con el ancho de una costura.
- Costura de puntada corrida en cada retazo: coral oscuro sobre telas claras, manta sobre mezclilla, fieltro y chambray.
- La manta es la tela de lectura; las telas con estampado se aclaran donde llevan texto.
- Tinta azul marino sobre toda tela clara.
- Shantell Sans escrita a mano para la voz, Big Shoulders Display en mayúsculas de sello para los rótulos, Nunito para leer.
- Etiquetas de tela que distinguen lo real («fotos reales del centro»), lo ilustrativo («foto ilustrativa») y lo que es de ejemplo («dato de ejemplo»).

## Colors

Los colores del logo convertidos en telas, cosidos sobre mezclilla azul marino.

### Primary
- **Coral de cuadrillé** (coral): la tela del parche bordado (la acción principal) y la base del cuadrillé. También es el relleno de la marca abierta de las preguntas frecuentes.
- **Coral de hilo** (coral-deep): el hilo. Se usa en las costuras, en el borde exterior de 3px del parche, en el subrayado punteado del enlace a mano, en el cursor de los campos y en las comillas. Las costuras lo leen a través del alias `--puntada`.
- **Coral para texto** (coral-texto): la única versión de coral que puede ser texto sobre manta. Hoy se usa en el acento del titular de portada.
- **Coral pálido** (coral-soft): el fondo del cuadrillé y de los círculos de las preguntas.

### Secondary
- **Raya mostaza** (mostaza): la tela de rayas (con dos hilos intermedios, `#E8C47F` y `#F2DCA8`), el hilo de la línea de tiempo del día, el anillo de foco y la selección de texto.
- **Mostaza oscura y pálida** (mostaza-deep, mostaza-soft): huellas de la cinta y fondo de la cinta de oficios y de los retazos suaves.

### Tertiary
- **Chambray** (chambray): tela de chambray con trama cruzada a 45°; también es el color de la barra de desplazamiento.
- **Chambray oscuro y pálido** (chambray-deep, chambray-soft): los lunares sobre fondo pálido y el fondo de las fotos mientras cargan.
- **Fieltro salvia** (salvia): fieltro liso con grano completo.
- **Salvia oscura y pálida** (salvia-deep, salvia-soft): huellas de la cinta, retazo suave y fondo de la etiqueta «real».

### Neutral
- **Azul marino del logo** (ink): respaldo de mezclilla de toda la página (con una trama de 135°) y tinta de todo el texto sobre telas claras.
- **Tinta suave** (ink-soft): bajadas, ayudas de campo y respuestas sobre manta (8.7:1).
- **Mezclilla** (mezclilla): retazo de mezclilla con trama; lleva texto en manta y bajada en `#D3DCEB`.
- **Manta** (manta): la tela de lectura, el fondo de las etiquetas y la versión clara del parche.
- **Papel de ejemplo** (ejemplo): fondo exclusivo de lo que es dato de prueba (etiqueta de ejemplo y marcador de testimonio). Funciona como señal de honestidad, no como decoración.
- **Azul Gloz** (gloz): solo en la portada de la propuesta, en la pastilla y las notas de Gloz y en la firma del pie.

### Named Rules
**The Tinta Marina Rule.** El texto sobre toda tela clara es azul marino (ink) o tinta suave. El coral solo puede ser texto en su versión `coral-texto`. Solo la mezclilla invierte a manta.

**The Manta para Leer Rule.** Los párrafos largos van sobre manta. Si una tela con estampado lleva texto, el estampado baja de intensidad (en el cuadrillé, del 62% al 34%).

**The Papel de Ejemplo Rule.** El amarillo `ejemplo` significa «esto es un dato de prueba» y no se usa para nada más.

## Typography

**Display Font:** Shantell Sans variable (con Comic Sans MS y system-ui)
**Body Font:** Nunito variable (con system-ui y Segoe UI)
**Label/Mono Font:** Big Shoulders Display (con Arial Narrow), en mayúsculas de sello

**Character:** Una letra a mano cálida con ejes vivos (INFM informalidad, BNCE rebote) para la voz del centro, una mayúscula condensada de sello para rotular retazos, horas y datos de contacto, y una redonda amable para leer. Las cinco fuentes se sirven desde el propio sitio, en `propuesta/fonts/`.

### Hierarchy
- **Display** (800, clamp(2.45rem,10.4vw,4.6rem); en escritorio clamp(3rem,4.3vw,4.9rem); 0.98): solo el titular de portada.
- **Headline** (800, clamp(2rem,7.4vw,3.5rem), 1, INFM 100 / BNCE 15): titulares de sección. Las citas grandes usan la misma voz (clamp(1.8rem,7vw,3.3rem), BNCE 30).
- **Title** (Big Shoulders 800, 1.7rem, 1, +0.025em, mayúsculas): rótulos de retazo, como los pasos y las salas. Las horas usan 2rem con cifras tabulares y los rótulos de contacto y de mapa 1.2 a 1.35rem.
- **Body** (Nunito 400, 1.0625rem, 1.6): lectura. Las bajadas tienen un máximo de 58ch y las respuestas de 62ch. Los textos de retazo bajan a 0.9063–0.9688rem con un interlineado de 1.4–1.45.
- **Label** (Shantell 500, 0.8125rem, INFM 100 / BNCE 40): etiquetas de tela. Los nombres de campo, las preguntas y los enlaces usan Shantell 600–700 a 1–1.125rem.
- **Cifra** (Shantell 800, clamp(4.5rem,18vw,7rem), 0.9, cifras tabulares): números protagonistas dentro de un retazo.

### Named Rules
**The Mano y Sello Rule.** Shantell habla y Big Shoulders rotula. Nunito se usa solo para leer. Big Shoulders siempre va en mayúsculas y con espaciado positivo.

**The Línea con Aire Rule.** Las líneas de titular que suben al animarse llevan un relleno de 0.14em arriba y 0.12em a los lados, compensado con un margen negativo, para que no se recorten las colitas ni los acentos.

## Layout

Mobile first. Cada sección es un bloque de colcha: una cuadrícula de 6 columnas (12 desde 760px) con `gap: 0`, un ancho máximo de 1320px, un radio de 6px y `overflow: clip`. Los retazos internos pierden su radio para que el bloque se lea como una sola pieza. Entre bloques queda un margen de una costura (9px; 12px desde 1024px), y por esa separación asoma la mezclilla. La página tiene un relleno lateral del mismo ancho de costura.

Cortes: 640px (garantías y fotos del día a media fila, horas a 3 columnas), 760px (12 columnas, pasos a 3), 1024px (costura de 12px, navegación completa, se oculta la barra fija del celular, composiciones asimétricas 5/7 y 4/8 por sección) y 1200px (aparece el lema en la barra).

En escritorio cada bloque compone su propia asimetría: en la portada, la etiqueta ocupa 5/12 y la foto 7/12, con los datos debajo. El ancho de cada hora sigue su duración (1.5fr 1.2fr 1.2fr 1.5fr 2.3fr 2.3fr). La cabecera de preguntas queda fija (sticky) en 4/12. El relleno de los retazos de lectura va de 22 a 28px en el celular y de clamp(28px,3vw,48px) a clamp(36px,4vw,60px) en escritorio. Las fotos se cosen dentro de un retazo de manta con un margen de una costura.

## Elevation & Depth

La colcha es plana. La profundidad aparece solo como el relieve de una tela: un grano de ruido SVG multiplicado sobre cada tela (`--grano`; en pantalla sobre la mezclilla), tramas de tejido hechas con gradientes y sombras pequeñas y difusas bajo lo que se cose encima (parches, etiquetas, globos).

### Shadow Vocabulary
- **Relieve de parche** (`0 0 0 3px var(--coral-deep), 0 calc(6px + var(--lift)) 18px -10px rgb(13 26 60 / 55%)`): el parche bordado. Al pasar el cursor, `--lift` sube 3px.
- **Borde de etiqueta** (`0 1px 0 rgb(13 26 60 / 18%)`): el canto de la etiqueta de tela.
- **Canto de globo** (`0 2px 0 rgb(13 26 60 / 12%)`): los globos del chat de ejemplo.
- **Tarjeta del mapa** (`0 10px 24px -14px rgb(13 26 60 / 60%)`): la nota que se apoya sobre el mapa dibujado.

### Named Rules
**The Relieve de Tela Rule.** No hay tarjetas flotantes ni sombras de elevación sobre los retazos. Solo se eleva lo que está cosido encima de la colcha, y siempre con una sombra difusa y teñida de azul marino.

## Shapes

Las esquinas son las de una tela cortada: 6px en el bloque de colcha, 3px en las fotos y las etiquetas y 16px en el parche bordado. El radio de 8px queda para lo funcional (campos, visor, avisos) y los 999px solo para los botones del visor y de Gloz. La costura dibujada es un rectángulo con esquinas de 3px, metido 7px hacia adentro (9px en escritorio), con una puntada de 4.5 de largo por 5.5 de espacio que el JS varía al azar en cada retazo para que se vea cosida a mano. Sin JS, la costura cae a un `outline: 2px dashed`. El parche lleva un segundo pespunte punteado en azul marino, 5px hacia adentro. Las listas se marcan con un tramo de puntada, no con viñetas.

## Components

### Buttons
- **Shape:** parche bordado de esquinas suaves (16px), con una altura mínima de 56px (48px en la versión chica).
- **Primary:** tela coral, tinta azul marino, Shantell 700 a 1.0625rem, borde exterior de 3px en coral oscuro, pespunte interior punteado y un icono de trazo de 1.3em. Es la única acción principal: abre WhatsApp con un mensaje ya escrito.
- **Hover / Focus:** se eleva 3px y se aclara a `#E99D92` (0.35s, `--ease`). Al presionarlo baja a escala 0.97. El foco es un anillo mostaza de 3px con 3px de separación.
- **Manta:** el mismo parche en manta, con borde azul marino, para fondos coral o chambray.
- **Enlace a mano:** la acción secundaria. Va en Shantell 600 con subrayado punteado coral, que se vuelve continuo al pasar el cursor, y tiene una altura mínima de 44px.

### Chips (etiquetas de tela)
- **Style:** etiqueta de manta con pespunte coral oscuro a 3px del borde, Shantell 500 a 0.8125rem y radio de 3px.
- **State:** `--ejemplo` (papel amarillo, inclinada 1.2°) para lo que es de prueba, `--real` (salvia pálida) para lo comprobado y la versión normal para «foto ilustrativa» o el nombre de una sala. Siempre aparece después del titular o en una esquina de la foto, nunca encima de él.

### Cards / Containers (retazos)
- **Corner Style:** 0 dentro del bloque; el bloque tiene 6px.
- **Background:** una tela por retazo. La manta lleva la lectura; el cuadrillé, la raya, el chambray, el fieltro, los lunares y la mezclilla llevan datos, imágenes de marca y cierres.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Border:** la costura dibujada.
- **Internal Padding:** de 18 a 30px en el celular y fluido en escritorio.

### Inputs / Fields
- **Style:** blanco, borde azul marino de 2px, radio de 8px, altura mínima de 52px y el nombre del campo arriba en Shantell 700. El select lleva una flecha SVG azul marino.
- **Focus:** el borde pasa a coral oscuro, con un halo de 4px en `rgb(227 143 131 / 40%)`.
- **Error / Disabled:** el error usa un borde `#B3261E` con un halo de 3px y un aviso en `#FDE8E6`/`#8C1D18`.

### Navigation
- Una barra fija (sticky) de retazos: un retazo con el logo y, en escritorio, un retazo de navegación con el lema y enlaces Shantell 600 (fondo de 8% azul marino al pasar el cursor) que terminan en un parche chico. Al bajar se esconde y al subir vuelve.
- En el celular hay un botón «Menú» que abre una colcha a pantalla completa: retazos de dos columnas con distintas telas, que llegan con rebote, y un parche ancho sobre mezclilla. También hay una barra fija inferior con parches que aparece después de la portada.

### Costura e hilo firma (componente insignia)
Cada `[data-retazo]` recibe una costura SVG que se cose sola, con una máscara `strokeDashoffset` de 1.1s, cuando el retazo entra en pantalla. En la portada, un hilo coral sigue las costuras reales entre la foto y los datos, sube por la costura de la huella y termina pespunteando el contorno del parche principal. En «Un día», un hilo mostaza recorre las horas; en «Inscripción», un hilo azul marino une los pasos. Ambos se cosen al ritmo del desplazamiento.

### Motion
Los tokens son `M = { ease: power2.out, easeIO: power2.inOut, pop: back.out(1.4), dur: 1, stagger: 0.09, dist: 26, lerp: 0.1 }` y, en CSS, `--ease`, `--ease-io`, `--ease-pop` y `--t-hover: .35s`. Se usan GSAP 3.13.0 y Lenis 1.3.11 desde `vendor/`. Todo el contenido es visible sin JS. Con movimiento reducido no hay Lenis ni animaciones de entrada, y las transiciones CSS quedan casi en cero.

## Do's and Don'ts

### Do:
- **Do** colocar los retazos borde con borde dentro de cada bloque (`gap: 0`) y separar los bloques con una costura (9px/12px) por la que asome la mezclilla.
- **Do** dar a cada retazo nuevo `data-retazo` para que reciba su costura dibujada, con el `outline` punteado como respaldo sin JS.
- **Do** escribir con tinta azul marino sobre toda tela clara y poner los párrafos largos sobre manta.
- **Do** marcar cada dato no confirmado con la etiqueta de ejemplo, y cada foto de banco con «foto ilustrativa».
- **Do** reservar el parche coral para la acción de WhatsApp. Las acciones secundarias van como enlace a mano o como parche de manta.
- **Do** usar Big Shoulders en mayúsculas para rotular y Shantell para hablar.

### Don't:
- **Don't** separar los retazos con huecos de fondo, como si fueran una fila de tarjetas redondeadas del mismo tamaño.
- **Don't** usar coral claro, mostaza, salvia o chambray como color de texto. Para texto coral está `coral-texto`.
- **Don't** usar el amarillo `ejemplo` para resaltar algo que no sea un dato de prueba.
- **Don't** llevar el azul Gloz, Montserrat ni Yeseva One dentro de la colcha. Son solo de la portada de la propuesta, las notas y la firma.
- **Don't** agregar sombras de elevación a los retazos. La profundidad es grano, trama y el relieve de lo que va cosido encima.
- **Don't** reemplazar la puntada dibujada por bordes continuos.
