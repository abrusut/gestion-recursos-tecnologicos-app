import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Exception } from '../../domain/exception.domain';
import { HttpErrorResponse } from '@angular/common/http';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private usuarioService: UsuarioService) { }

  rolesDisponibles = environment.ROLES_JERARQUIA;

  checkPermision(menu: Array<any>): any {

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
              if (!this.hasRole(rol)) {
                console.log(`no tiene rol necesario para menu ${elementMenu.url} ( ${elementMenu.titulo} ).
                          Roles configurados ${elementMenu.roles} roles de usuario ${rolesUserLogged}`);
                menu.splice(menu.indexOf(elementMenu), 1);
                this.checkPermision(menu);
              }
          });
      }

      // Analiza roles de submenu de Menu
      if ( elementMenu['submenu'] !== undefined && elementMenu['submenu'].length > 0) {
        elementMenu['submenu'].forEach(submenu => {
            if (submenu.roles !== undefined && submenu.roles.length > 0) {
                submenu.roles.forEach(rol => {
                  if (!this.hasRole(rol)) {
                    console.log(`no tiene rol necesario para submenu ${submenu.titulo} .
                              Roles configurados ${submenu.roles} roles de usuario ${rolesUserLogged}`);
                    elementMenu['submenu'].splice(elementMenu['submenu'].indexOf(submenu), 1);
                    this.checkPermision(menu);
                  }
                });
            }
          });
      }
    });
    return menu;
  }

  hasRole(role: string) {
    let tieneRol = false;
    if (this.usuarioService.usuario !== undefined
      && this.usuarioService.usuario.roles !== undefined
      && this.usuarioService.usuario.roles.length > 0) {
        // Si el rol coincide directamente
        if (this.usuarioService.usuario.roles.includes(role)) {
          tieneRol = true;
          return tieneRol;
        } else {
          // Analizo la jerarquia de roles
          if (this.rolesDisponibles[role] !== undefined) {
            let rolJerarquiaConfig: string[] = [];
            rolJerarquiaConfig = this.rolesDisponibles[role];

            // Recorro los roles del usuario a ver si alguno coincide o esta dentro de la jerarquia
            this.usuarioService.usuario.roles.forEach(rolUser => {
              const rolUserJerarquia: string[] = this.rolesDisponibles[rolUser];
              if (rolUserJerarquia !== undefined && rolUserJerarquia.includes(role)) {
                tieneRol = true;
              }
            });

            return tieneRol;
          } else {
            console.log(`El role requerido ${role}, no tiene jerarquia configurada en environment.`);
          }
        }

      } else {
        return false;
      }

  }

  checkPermisionPngMenu(menu: Array<any>): any {

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
              if (!this.hasRole(rol)) {
                console.log(`no tiene rol necesario para menu ${elementMenu.url} ( ${elementMenu.titulo} ).
                          Roles configurados ${elementMenu.roles} roles de usuario ${rolesUserLogged}`);
                menu.splice(menu.indexOf(elementMenu), 1);
                this.checkPermisionPngMenu(menu);
              }
          });
      }

      // Analiza roles de items de Menu
      if ( elementMenu['items'] !== undefined && elementMenu['items'].length > 0) {
        elementMenu['items'].forEach(submenu => {
            if (submenu.roles !== undefined && submenu.roles.length > 0) {
                submenu.roles.forEach(rol => {
                  if (!this.hasRole(rol)) {
                    console.log(`no tiene rol necesario para items ${submenu.titulo} .
                              Roles configurados ${submenu.roles} roles de usuario ${rolesUserLogged}`);
                    elementMenu['items'].splice(elementMenu['items'].indexOf(submenu), 1);
                    this.checkPermisionPngMenu(menu);
                  }
                });
            }

          });
      }
    });
    return menu;
  }

}
