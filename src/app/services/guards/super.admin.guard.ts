import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UsuarioService} from '../usuario/usuario.service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { SecurityService } from './security.service';

import Swal from 'sweetalert2';

@Injectable()
export class SuperAdminGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router,
              public securityService: SecurityService) {

  }

  canActivate() {
    if ( this.securityService.hasRole('ROLE_SUPER_ADMIN') ) {
      return true;
    } else {
      console.log('Bloqueado por SuperAdminGuard');
      Swal.fire(this.usuarioService.usuario.fullName, `Usted ${this.usuarioService.usuario.fullName} no cuenta con los
      permisos adecuados para acceder a esta seccion`, 'error');
      this.router.navigate(['/']);
      return false;
    }
  }
}
