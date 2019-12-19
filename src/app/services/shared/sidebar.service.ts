import { Injectable } from '@angular/core';
import {UsuarioService} from '../usuario/usuario.service';
import { SecurityService } from '../guards/security.service';

@Injectable()
export class SidebarService {



  /**
   *  Trasladar esta logica a backend
   *
   **/
  menu: any[] = [];



  constructor( public usuarioService: UsuarioService,
               public securityService: SecurityService) {

  }

  cargarMenu() {
    this.menu = [
      {
        titulo: 'Principal',
        icono: 'fas fa-fw fa-folder',
        url: '/dashboard' ,
        submenu: [
          { titulo: 'Dashboard', url: '/dashboard', icono: 'pi pi-home'  },
          { titulo: 'Profile', url: '/profile', icono: 'pi pi-user'  }
        ],
        roles: []
      },
      {
        titulo: 'Usuarios',
        icono: 'fas fa-fw fa-folder',
        url: '/usuarios',
        submenu: [
          { titulo: 'Listado', url: '/usuarios', icono: 'pi pi-users'  },
          { titulo: 'Nuevo', url: '/usuarios/nuevo', icono: 'pi pi-user-plus'  }
        ],
        roles: ['ROLE_SUPER_ADMIN']
      },
      {
        titulo: 'Configuraciones',
        icono: 'fas fa-fw fa-folder',
        url: '/atributo-configuracion',
        submenu: [
          { titulo: 'Listado', url: '/atributo-configuracion', icono: 'pi pi-cog'  },
          { titulo: 'Nuevo', url: '/atributo-configuracion/nuevo', icono: 'pi pi-plus'  }
        ],
        roles: ['ROLE_ADMIN']
      },
      {
        titulo: 'Tipo Documento',
        icono: 'fas fa-fw fa-folder',
        url: '/tipo-documento',
        submenu: [
          { titulo: 'Listado', url: '/tipo-documento', icono: 'pi pi-cog'  },
          { titulo: 'Nuevo', url: '/tipo-documento/nuevo', icono: 'pi pi-plus'  }
        ],
        roles: ['ROLE_ADMIN']
      }
    ];

    this.securityService.checkPermision(this.menu);
  }
}
