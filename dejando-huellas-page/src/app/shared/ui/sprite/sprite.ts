import { Component } from '@angular/core';

/**
 * Símbolos SVG del sitio: íconos de trazo redondo (una sola familia), la huella del logo y el logo
 * de Studio Gloz. Se inserta una vez en la app; cada ícono los usa con `<use href="#i-…">`.
 */
@Component({
  selector: 'app-sprite',
  host: { 'aria-hidden': 'true', style: 'position:absolute;width:0;height:0;overflow:hidden' },
  template: `
    <svg width="0" height="0" focusable="false">
      <defs>
        <symbol id="i-whatsapp" viewBox="0 0 24 24">
          <path d="M4.2 19.8l1.1-3.6A8.2 8.2 0 1 1 8 18.9z" />
          <path
            stroke-width="1.8"
            d="M9.2 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.6 1.4c.1.3 0 .5-.1.7l-.4.5c-.1.2-.1.4 0 .5.5.9 1.3 1.7 2.2 2.2.2.1.4.1.5 0l.5-.4c.2-.2.5-.2.7-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3-.2.6-.6.8-.6.3-1.6.4-3-.3a8.3 8.3 0 0 1-3.6-3.6c-.6-1.4-.6-2.4-.4-3.1z"
          />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h11" /></symbol>
        <symbol id="i-cerrar" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
        <symbol id="i-sol" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2.5v2M12 19.5v2M5 5l1.4 1.4M17.6 17.6 19 19M2.5 12h2M19.5 12h2M5 19l1.4-1.4M17.6 6.4 19 5"
          />
        </symbol>
        <symbol id="i-manzana" viewBox="0 0 24 24">
          <path
            d="M12 7.5c-1.6-1.1-5.2-1.3-6.4 1.7-1.3 3.3.5 8.4 3 10.4 1.2 1 2.2.6 3.4.1 1.2.5 2.2.9 3.4-.1 2.5-2 4.3-7.1 3-10.4-1.2-3-4.8-2.8-6.4-1.7z"
          />
          <path d="M12 7.5c0-2 1.1-3.6 3.2-4.2" />
        </symbol>
        <symbol id="i-paleta" viewBox="0 0 24 24">
          <path
            d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-1-1-1.4-1-2.4 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2z"
          />
          <circle cx="7.5" cy="11" r="1" />
          <circle cx="10.5" cy="7.2" r="1" />
          <circle cx="15" cy="7.6" r="1" />
        </symbol>
        <symbol id="i-brote" viewBox="0 0 24 24">
          <path d="M7 20.5h10M12 20.5V12" />
          <path
            d="M12 12c0-3.2-2.2-5.4-6.2-5.4 0 3.2 2.2 5.4 6.2 5.4zM12 10.2c0-3.2 2.2-5.4 6.2-5.4 0 3.2-2.2 5.4-6.2 5.4z"
          />
        </symbol>
        <symbol id="i-cubiertos" viewBox="0 0 24 24">
          <path
            d="M6 3v7.5A2 2 0 0 0 8 12.5V21M10 3v7.5a2 2 0 0 1-2 2M8 3v5.5M17.5 21V3c-2 1.2-3.3 4-3.3 7.2v3h3.3"
          />
        </symbol>
        <symbol id="i-luna" viewBox="0 0 24 24">
          <path d="M20 14.6A8.2 8.2 0 1 1 9.4 4a6.6 6.6 0 0 0 10.6 10.6z" />
        </symbol>
        <symbol id="i-casa" viewBox="0 0 24 24">
          <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />
        </symbol>
        <symbol id="i-escudo" viewBox="0 0 24 24">
          <path d="M12 3 19 6v5.2c0 4.8-3 8.3-7 9.8-4-1.5-7-5-7-9.8V6z" />
          <path d="m9 12 2.2 2.2L15.4 10" />
        </symbol>
        <symbol id="i-corazon" viewBox="0 0 24 24">
          <path
            d="M12 20s-7.5-4.6-7.5-10.4A4.1 4.1 0 0 1 12 7.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"
          />
        </symbol>
        <symbol id="i-pin" viewBox="0 0 24 24">
          <path d="M12 21.2s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
          <circle cx="12" cy="9.2" r="2.5" />
        </symbol>
        <symbol id="i-telefono" viewBox="0 0 24 24">
          <path
            d="M5.2 3.8h3.6l1.9 4.7-2.4 1.5a11.5 11.5 0 0 0 5.7 5.7l1.5-2.4 4.7 1.9v3.6a2 2 0 0 1-2.2 2A16.4 16.4 0 0 1 3.2 6a2 2 0 0 1 2-2.2z"
          />
        </symbol>
        <symbol id="i-correo" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2.2" />
          <path d="m3.5 7 8.5 6 8.5-6" />
        </symbol>
        <symbol id="i-reloj" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.2 2" />
        </symbol>
        <symbol id="i-mas" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></symbol>
        <symbol id="i-ampliar" viewBox="0 0 24 24">
          <path d="M15 3.5h5.5V9M9 20.5H3.5V15M20.5 3.5l-6.5 6.5M3.5 20.5l6.5-6.5" />
        </symbol>
        <symbol id="i-musica" viewBox="0 0 24 24">
          <path d="M9 18V5.5l11-2.2V16" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="17" cy="16" r="3" />
        </symbol>
        <symbol id="i-instagram" viewBox="0 0 24 24">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.3 6.7h.01" stroke-width="2.6" />
        </symbol>
        <symbol id="i-libro" viewBox="0 0 24 24">
          <path
            d="M12 6.5c-2-1.6-5-2-8-1.5v13c3-.5 6-.1 8 1.5 2-1.6 5-2 8-1.5V5c-3-.5-6-.1-8 1.5z"
          />
          <path d="M12 6.5V20" />
        </symbol>
        <symbol id="i-globo" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path
            d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"
          />
        </symbol>
        <symbol id="i-matraz" viewBox="0 0 24 24">
          <path d="M9.5 3h5M10 3v5.5L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.5V3" />
          <path d="M7.3 14.5h9.4" />
        </symbol>
        <symbol id="i-pelota" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M5.6 5.6c3.4 3 3.4 9.8 0 12.8M18.4 5.6c-3.4 3-3.4 9.8 0 12.8" />
        </symbol>
        <symbol id="i-mano" viewBox="0 0 24 24">
          <path
            d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4a1.5 1.5 0 0 1 3 0v6M14 10V5.5a1.5 1.5 0 0 1 3 0V13c0 4.5-2.6 8-6.5 8-2.4 0-3.9-1.2-5.2-3.2L3.6 15a1.5 1.5 0 0 1 2.4-1.8L8 15.5"
          />
        </symbol>
        <symbol id="i-sonaja" viewBox="0 0 24 24">
          <circle cx="9" cy="9" r="5.5" />
          <circle cx="9" cy="9" r="1.6" />
          <path d="m12.9 12.9 6.6 6.6M17.6 21.4l3.8-3.8" />
        </symbol>
        <symbol id="i-birrete" viewBox="0 0 24 24">
          <path d="M2.5 9.5 12 5l9.5 4.5L12 14z" />
          <path d="M6.5 11.5V16c1.6 1.6 3.4 2.3 5.5 2.3s3.9-.7 5.5-2.3v-4.5M21.5 9.5v5" />
        </symbol>
        <symbol id="i-documento" viewBox="0 0 24 24">
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </symbol>
        <symbol id="i-pausa" viewBox="0 0 24 24">
          <path d="M9 5.5v13M15 5.5v13" stroke-width="2.6" />
        </symbol>
        <symbol id="i-reproducir" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" /></symbol>
        <symbol id="huella" viewBox="0 0 100 104">
          <path d="M29 63c-1-12 7-19 21-19s22 7 21 19c-1 16-8 31-21 33-13-2-20-17-21-33z" />
          <rect x="20" y="33" width="12" height="25" rx="6" transform="rotate(-24 26 45.5)" />
          <rect
            x="32.5"
            y="16"
            width="12.5"
            height="31"
            rx="6.25"
            transform="rotate(-9 38.75 31.5)"
          />
          <rect
            x="45.5"
            y="10"
            width="12.5"
            height="35"
            rx="6.25"
            transform="rotate(2 51.75 27.5)"
          />
          <rect x="58.5" y="16" width="12" height="31" rx="6" transform="rotate(13 64.5 31.5)" />
          <rect x="71" y="49" width="12" height="27" rx="6" transform="rotate(50 77 62.5)" />
        </symbol>
        <symbol id="corazon" viewBox="0 0 100 104">
          <path
            fill="none"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M50 80c-8-6-11-10.5-9.5-14.2 1.6-3.6 6.4-4 9.5-.4 3.1-3.6 7.9-3.2 9.5.4C61 69.5 58 74 50 80z"
          />
        </symbol>
        <symbol id="gloz" viewBox="4.5 -71.5 211 73">
          <path
            d="M32.50 1.50Q24.90 1.50 18.50-2.80Q12.10-7.10 8.30-15.350Q4.50-23.600 4.50-35L4.50-35Q4.50-46.50 8.45-54.75Q12.40-63 19.55-67.25Q26.70-71.50 36.10-71.50L36.10-71.50Q41.80-71.50 47.60-68.20L47.60-68.20Q49.80-67 52-65L52-65Q53.70-67.60 55.50-69.10L55.50-69.10Q57.30-70.40 57.50-70.50L57.50-70.50L60-70.50L60-51.50L56-51.50Q54.70-56.30 52.10-60.20L52.10-60.20Q49.70-64 46.15-66.50Q42.60-69 38-69L38-69Q31.10-69 26.55-61Q22-53 22-35L22-35Q22-17 26.05-9.50Q30.10-2 36.50-2L36.50-2Q40.20-2 43.20-6L43.20-6Q44.30-7.50 45.50-10L45.50-10L45.50-33L39.50-34.50L39.50-36L68-36L68-34.50L62-33L62 0.50L60.50 0.50Q53.20 0.50 49.40-3.50L49.40-3.50Q47.70-5.30 47-7.50L47-7.50Q45.60-5 43.70-3L43.70-3Q39.20 1.50 32.50 1.50L32.50 1.50Z"
          />
          <path
            d="M74 0L74-1.50L80-3L80-67L74-68.50L74-70L87-70Q96-70 96-61L96-61L96-3L102-1.50L102 0L74 0Z"
          />
          <path
            d="M134.50 1.50Q122.10 1.50 115.05-5.55Q108-12.60 108-25L108-25Q108-37.40 115.05-44.45Q122.10-51.50 134.50-51.50L134.50-51.50Q146.90-51.50 153.95-44.45Q161-37.40 161-25L161-25Q161-12.60 153.95-5.55Q146.90 1.50 134.50 1.50L134.50 1.50ZM134.50-0.50Q138.50-0.50 141.25-6.10Q144-11.70 144-25L144-25Q144-38.30 141.25-43.90Q138.50-49.50 134.50-49.50L134.50-49.50Q130.50-49.50 127.75-43.90Q125-38.30 125-25L125-25Q125-11.70 127.750-6.10Q130.50-0.50 134.50-0.50L134.50-0.50Z"
          />
          <path
            d="M169 0L169-2.50L197.50-47.50L179.50-47.50Q179.50-42 176.20-36.40L176.20-36.40Q174.90-34.30 173-32.50L173-32.50L170-32.50L170-50L215.50-50L215.50-47.50L187-2.50L206-2.50Q206-8.20 209.20-13.60L209.20-13.60Q210.60-15.90 212.50-17.50L212.50-17.50L215.50-17.50L215.50 0L169 0Z"
          />
        </symbol>
      </defs>
    </svg>
  `,
})
export class Sprite {}
