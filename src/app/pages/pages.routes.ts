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
import { AgenteListComponent } from './agente/agente-list/agente-list.component';
import { DelegacionListComponent } from './delegacion/delegacion-list/delegacion-list.component';
import { DelegacionDetailComponent } from './delegacion/delegacion-detail/delegacion-detail.component';
import { AgenteDetailComponent } from './agente/agente-detail/agente-detail.component';
import { DireccionListComponent } from './direccion/direccion-list/direccion-list.component';
import { DireccionDetailComponent } from './direccion/direccion-detail/direccion-detail.component';
import { SecretariaListComponent } from './secretaria/secretaria-list/secretaria-list.component';
import { SecretariaDetailComponent } from './secretaria/secretaria-detail/secretaria-detail.component';
import { SituacionRevistaListComponent } from './situacionRevista/situacion-revista-list/situacion-revista-list.component';
import { SituacionRevistaDetailComponent } from './situacionRevista/situacion-revista-detail/situacion-revista-detail.component';
import { TipoRecursoListComponent } from './tipoRecurso/tipo-recurso-list/tipo-recurso-list.component';
import { TipoRecursoDetailComponent } from './tipoRecurso/tipo-recurso-detail/tipo-recurso-detail.component';

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
  {
    path: 'agente',
    component: AgenteListComponent,
    data: { titulo: 'Agente',
            description: 'Mantenimiento de Agentes de la APP',
            pathPrevio: { path: '/#/agente', label: 'Listado'}
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'agente/:id',
    component: AgenteDetailComponent,
    data: { titulo: 'Agente',
            description: 'Mantenimiento de Agentes de la APP',
            pathPrevio: { path: '/#/agente', label: 'Listado' }
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'delegacion',
    component: DelegacionListComponent,
    data: { titulo: 'Delegacion',
            description: 'Mantenimiento de Delegaciones de la APP',
            pathPrevio: { path: '/#/delegacion', label: 'Listado'}
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'delegacion/:id',
    component: DelegacionDetailComponent,
    data: { titulo: 'Agente',
            description: 'Mantenimiento de Delegaciones de la APP',
            pathPrevio: { path: '/#/delegacion', label: 'Listado' }
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'direccion',
    component: DireccionListComponent,
    data: { titulo: 'Direcciones',
            description: 'Mantenimiento de Direcciones de la APP',
            pathPrevio: { path: '/#/direccion', label: 'Listado'}
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'direccion/:id',
    component: DireccionDetailComponent,
    data: { titulo: 'Direcciones',
            description: 'Mantenimiento de Direcciones de la APP',
            pathPrevio: { path: '/#/direccion', label: 'Listado' }
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'secretaria',
    component: SecretariaListComponent,
    data: { titulo: 'Secretaria',
            description: 'Mantenimiento de Secretaria de la APP',
            pathPrevio: { path: '/#/secretaria', label: 'Listado'}
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'secretaria/:id',
    component: SecretariaDetailComponent,
    data: { titulo: 'Secretaria',
            description: 'Mantenimiento de Secretaria de la APP',
            pathPrevio: { path: '/#/secretaria', label: 'Listado' }
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'situacionRevista',
    component: SituacionRevistaListComponent,
    data: { titulo: 'Situacion Revista',
            description: 'Mantenimiento de Situacion Revista de la APP',
            pathPrevio: { path: '/#/situacionRevista', label: 'Listado'}
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'situacionRevista/:id',
    component: SituacionRevistaDetailComponent,
    data: { titulo: 'Situacion Revista',
            description: 'Mantenimiento de Situacion Revista de la APP',
            pathPrevio: { path: '/#/situacionRevista', label: 'Listado' }
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'tipoRecurso',
    component: TipoRecursoListComponent,
    data: { titulo: 'Tipo Recurso',
            description: 'Mantenimiento de Tipo Recurso de la APP',
            pathPrevio: { path: '/#/tipoRecurso', label: 'Listado'}
          },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'tipoRecurso/:id',
    component: TipoRecursoDetailComponent,
    data: { titulo: 'Tipo Recurso',
            description: 'Mantenimiento de Tipo Recurso de la APP',
            pathPrevio: { path: '/#/tipoRecurso', label: 'Listado' }
          },
    canActivate: [ AdminGuard ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

export const PAGES_ROUTING: ModuleWithProviders = RouterModule.forChild(PAGES_ROUTES);

