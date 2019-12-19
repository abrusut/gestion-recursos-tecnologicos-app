import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto = 'oculto'; // propiedad por css

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('modal upload service');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}

