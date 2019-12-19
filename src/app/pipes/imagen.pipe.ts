import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = environment.URL_RESOURCES;

    if ( !img ) {
      return url + '/images/empty.png'; // No imagen
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    } else {
      switch (tipo) {
        case 'usuario':
           url +=  img;
           break;

        default:
          console.log('Tipo de imagen no existe, disponible: usuarios');
          url += '/usuarios/xxx';
          break;
      }

      return url;

    }
  }

}
