import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
              public router: Router) {
  }

  canActivate(): boolean {
    if ( this.usuarioService.estaLogueado() ) {
      // console.log("Paso GUARD");
      return true;
    } else {
      // console.log("Bloqueado por GUARD");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
