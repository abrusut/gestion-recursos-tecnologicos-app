import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: './assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private document) {
    // this.cargarAjustes();
   }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    } else {
    }

    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema: string) {
    const url = `./assets/css/colors/${tema}.css`;

     // Modifico los datos en el localStorage con el tema seleccionado
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();

     // El tema se define en el Index.html raiz, por eso lo accede asi para salir de Angular
    this.document.getElementById('tema').setAttribute('href', url);
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
