import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../services/service.index';

import Swal from 'sweetalert2';
import { SecurityService } from '../services/guards/security.service';

@Pipe({
  name: 'roleGuard'
})
export class RoleGuardPipe implements PipeTransform {

  constructor(private usuarioService: UsuarioService, private securityService: SecurityService) { }

/**
 *
 * Recibe un "menu" configurado en sidear.service.ts y analiza que tipo de rol necesita para mostrarlo u ocultarlo
 * Debe tener configurado un array de "roles" en cada menu y ademas el environment environment.ROLES_ARRAY
 * @param {*} menu
 * @returns {*}
 * @memberof RoleGuardPipe
 */
transform(menu: Array<any>): any {

    const rolesDisponibles = environment.ROLES_JERARQUIA;
    const rolesUserLogged = this.usuarioService.usuario.roles;

    if ( rolesDisponibles === undefined || rolesDisponibles === null || menu === undefined ) {
            Swal.fire(this.usuarioService.usuario.fullName, `Error de Configuracion,
                      debe declarar "roles" array en menu y Roles Disponibles en environment`, 'error');
            return null;
    }

    menu.forEach(elementMenu => {
      // console.log(elementMenu);

      // Analiza roles de cabecera de Menu
      if ( elementMenu.roles !== undefined && elementMenu.roles.length > 0) {
          elementMenu.roles.forEach(rol => {
              if (!this.securityService.hasRole(rol)) {
                console.log(`no tiene rol necesario para menu ${elementMenu.url} ( ${elementMenu.titulo} ).
                          Roles configurados ${elementMenu.roles} roles de usuario ${rolesUserLogged}`);
                menu.splice(menu.indexOf(elementMenu), 1);
              }
          });
      }

      // Analiza roles de submenu de Menu
      if ( elementMenu['submenu'] !== undefined && elementMenu['submenu'].length > 0) {
        elementMenu['submenu'].forEach(submenu => {
            if (submenu.roles !== undefined && submenu.roles.length > 0) {
                submenu.roles.forEach(rol => {
                  if (!this.securityService.hasRole(rol)) {
                    console.log(`no tiene rol necesario para submenu ${submenu.titulo} .
                              Roles configurados ${submenu.roles} roles de usuario ${rolesUserLogged}`);
                    elementMenu['submenu'].splice(elementMenu['submenu'].indexOf(submenu), 1);
                  }
                });
            }
          });
      }
    });
    return menu;
  }
}
