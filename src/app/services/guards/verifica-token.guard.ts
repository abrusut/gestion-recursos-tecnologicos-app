import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UsuarioService} from '../usuario/usuario.service';
import { resolve } from 'url';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) {

  }

  canActivate(): Promise<boolean> | boolean {
    console.log('Inicio de verifica token guard');
    const token = this.usuarioService.token;
    if (token === undefined || token.trim() === '') {
      return   this.router.navigate(['/login']);
    }
    const payload = JSON.parse(atob( token.split('.')[1]));
    console.log(` payload token: ${payload}` );

    const expirado = this.expirado(payload.exp);
    if (expirado) {
      return   this.router.navigate(['/login']);
    }

    return this.verificaRenueva(payload.exp);
  }

  expirado(fechaExpiracion: number) {
    const ahora = new Date().getTime() / 1000;

    if (fechaExpiracion < ahora) {
      return true;
    } else {
      return false;
    }
  }

  verificaRenueva(fechaExpToken: number): Promise<boolean> {
    return new Promise( ( resolve, reject) => {

      const tokenExp = new Date( fechaExpToken * 1000);
      const ahora = new Date();
      ahora.setTime( ahora.getTime() + (4 * 60 * 60) ); // Incrementa 4hs
      console.log ( `token expire ${tokenExp}` );
      console.log ( `ahora es: ${ahora} ` );
      console.log(ahora);

      if (tokenExp.getTime() > ahora.getTime()) {// el token no esta proximo a vencer devuelvo true
        resolve(true);
      } else {
        // renuvo el token
        this.usuarioService.renuevaToken()
            .subscribe( () => {
              resolve(true);
            },
            () => {
              reject(false);
              this.router.navigate(['/login']);
            }

          );
      }

      resolve(true);
    });

  }


}
