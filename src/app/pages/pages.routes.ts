import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginGuardGuard} from '../services/guards/login-guard.guard';
import {AdminGuard} from '../services/guards/admin.guard';
import {ProfileComponent} from './profile/profile.component';
import {VerificaTokenGuard} from '../services/guards/verifica-token.guard';
import { UsuarioDetailComponent } from './usuarios/usuarioDetail/usuario-detail.component';
import { UsuariosListComponent } from './usuarios/usuariosList/usuarios-list.component';
import { AtributoConfiguracionListComponent } from './atributo-configuracion/atributo-configuracion-list/atributo-configuracion-list.component';
import { AtributoConfiguracionDetailComponent } from './atributo-configuracion/atributo-configuracion-detail/atributo-configuracion-detail.component';
import { SuperAdminGuard } from '../services/guards/super.admin.guard';
import { TipoDocumentoListComponent } from './tipo-documento/tipo-documento-list/tipo-documento-list.component';
import { TipoDocumentoDetailComponent } from './tipo-documento/tipo-documento-detail/tipo-documento-detail.component';

/**
 *   La "data" de cada ruta se usa para agregar meta tags dinamicamente y
 *   setear el titulo de la pagina en la que estoy
 *   Esto se usa en BreadcrumsComponent
 */
const PAGES_ROUTES: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { titulo: 'Dashboard', description: 'Dashboard de la APP' },
    canActivate: [ VerificaTokenGuard ]
  },
  {
    // Profile del usuario logueado. Reset Password
    path: 'profile', component: ProfileComponent,
    data: { titulo: 'Profile', description: 'Perfil del usuario de la APP' }
  },
  // Mantenimientos
  {
    path: 'usuarios',
    component: UsuariosListComponent,
    data: { titulo: 'Usuarios',
            description: 'Mantenimiento de usuarios de la APP',
            pathPrevio: { path: '/#/usuarios', label: 'Listado' } },
    canActivate: [ SuperAdminGuard ]
  },
  {
    path: 'usuarios/:id',
    component: UsuarioDetailComponent,
    data: { titulo: 'Mantenimiento Usuarios',
            description: 'Mantenimiento de usuarios de la APP',
            pathPrevio: { path: '/#/usuarios', label: 'Listado' } },
    canActivate: [ SuperAdminGuard ]
  },
  {
    path: 'atributo-configuracion',
    component: AtributoConfiguracionListComponent,
    data: { titulo: 'Configuracion',
            description: 'Mantenimiento de Configuraciones de la APP',
            pathPrevio: { path: '/#/atributo-configuracion', label: 'Listado'}
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'atributo-configuracion/:id',
    component: AtributoConfiguracionDetailComponent,
    data: { titulo: 'Mantenimiento Configuracion',
            description: 'Mantenimiento de Configuraciones de la APP',
            pathPrevio: { path: '/#/atributo-configuracion', label: 'Listado' }
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'tipo-documento',
    component: TipoDocumentoListComponent,
    data: { titulo: 'Tipo Documento',
            description: 'Mantenimiento de Tipos de Documentos de la APP',
            pathPrevio: { path: '/#/tipo-documento', label: 'Listado'}
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'tipo-documento/:id',
    component: TipoDocumentoDetailComponent,
    data: { titulo: 'Tipo Documento',
            description: 'Mantenimiento de Tipos de Documentos de la APP',
            pathPrevio: { path: '/#/tipo-documento', label: 'Listado' }
          },
    canActivate: [ AdminGuard ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

export const PAGES_ROUTING: ModuleWithProviders = RouterModule.forChild(PAGES_ROUTES);

