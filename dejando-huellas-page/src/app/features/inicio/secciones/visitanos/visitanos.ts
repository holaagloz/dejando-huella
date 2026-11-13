import { Component, DOCUMENT, computed, inject, signal } from '@angular/core';
import { FormField, form, maxLength, required } from '@angular/forms/signals';

import { Analitica } from '../../../../core/analitica/analitica';
import { RegistrarEvento } from '../../../../core/analitica/registrar-evento';
import {
  enlaceWhatsapp,
  mensajeSolicitudVisita,
  SolicitudVisita,
} from '../../../../core/contacto/whatsapp';
import { Contenido } from '../../../../core/contenido/contenido';
import { formatearRango } from '../../../../core/contenido/formato';
import { Icono } from '../../../../shared/ui/icono/icono';
import { Retazo } from '../../../../shared/ui/retazo/retazo';
import { Mapa } from './mapa';

const LARGO_MAXIMO_MENSAJE = 500;

/**
 * «¡Ven a conocernos!»: formulario que arma el mensaje de WhatsApp (no guarda ni envía datos a
 * ningún servidor), datos de contacto que se tocan y el mapa.
 */
@Component({
  selector: 'app-visitanos',
  imports: [FormField, RegistrarEvento, Icono, Retazo, Mapa],
  templateUrl: './visitanos.html',
  styleUrl: './visitanos.css',
})
export class Visitanos {
  private readonly documento = inject(DOCUMENT);
  private readonly analitica = inject(Analitica);

  protected readonly c = inject(Contenido);
  protected readonly v = this.c.visitanos;
  protected readonly contacto = this.c.sitio.contacto;
  protected readonly direccion = this.c.sitio.direccion;
  protected readonly horario = `${this.c.sitio.horario.dias}, ${formatearRango(this.c.sitio.horario.apertura, this.c.sitio.horario.cierre)}`;
  protected readonly telefono = `tel:+${this.contacto.whatsapp}`;
  protected readonly whatsapp = enlaceWhatsapp(
    this.contacto.whatsapp,
    this.contacto.mensajeGeneral,
  );
  protected readonly instagram = `https://www.instagram.com/${this.contacto.instagram}/`;
  protected readonly mapaExterno = `https://www.google.com/maps/search/?api=1&query=${this.direccion.latitud},${this.direccion.longitud}`;
  protected readonly edades = [
    ...this.c.grupos.grupos.map((g) => `${g.edades} (${g.nombre})`),
    'Otra edad',
  ];

  private readonly modelo = signal<SolicitudVisita>({
    nombre: '',
    edad: '',
    horario: '',
    mensaje: '',
  });
  protected readonly formulario = form(this.modelo, (campo) => {
    required(campo.nombre, { message: 'Escribe tu nombre.' });
    required(campo.edad, { message: 'Elige la edad de tu hijo o hija.' });
    maxLength(campo.mensaje, LARGO_MAXIMO_MENSAJE);
  });

  /** Los errores se muestran después del primer intento de envío, no mientras se escribe. */
  protected readonly intento = signal(false);
  protected readonly errorNombre = computed(
    () => this.intento() && this.formulario.nombre().invalid(),
  );
  protected readonly errorEdad = computed(() => this.intento() && this.formulario.edad().invalid());
  protected readonly aviso = computed(() => {
    if (this.errorNombre() && this.errorEdad())
      return 'Escribe tu nombre y elige la edad de tu hijo o hija para continuar.';
    if (this.errorNombre()) return 'Escribe tu nombre para continuar.';
    if (this.errorEdad()) return 'Elige la edad de tu hijo o hija para continuar.';
    return '';
  });

  /**
   * Se valida y se abre WhatsApp en el mismo gesto del usuario (síncrono): si se esperara una
   * promesa, Safari podría bloquear la ventana nueva.
   */
  protected enviar(evento: SubmitEvent): void {
    evento.preventDefault();
    this.intento.set(true);
    if (this.formulario().invalid()) {
      const primero = this.errorNombre() ? 'f-nombre' : 'f-edad';
      this.documento.getElementById(primero)?.focus();
      return;
    }
    const mensaje = mensajeSolicitudVisita(this.modelo(), this.c.sitio.nombre);
    this.analitica.registrar('formulario_enviado', 'visitanos');
    this.documento.defaultView?.open(
      enlaceWhatsapp(this.contacto.whatsapp, mensaje),
      '_blank',
      'noopener',
    );
  }
}
