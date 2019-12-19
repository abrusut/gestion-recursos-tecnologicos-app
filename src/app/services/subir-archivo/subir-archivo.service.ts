import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise( ( resolve, reject ) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('file', archivo, archivo.name);

      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 201 ) {
            console.log('Archivo Subido');
            resolve( JSON.parse(xhr.response) );
          } else {
            console.log('Fallo la subida');
            reject( JSON.parse(xhr.response) );
          }
        }
      };

      const url = environment.URL_API + '/images/' + tipo + '/' + id;

      xhr.open('POST', url, true);
      xhr.send(formData);

    });
  }

}
