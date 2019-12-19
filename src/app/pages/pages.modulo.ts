import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Rutas
import { PAGES_ROUTING } from './pages.routes';

// Modulos
import { SharedModule } from '../shared/shared.modulo';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonsAppModule } from '../commons/commons.app.module';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosListComponent } from './usuarios/usuariosList/usuarios-list.component';
import { UsuarioDetailComponent } from './usuarios/usuarioDetail/usuario-detail.component';
import { AtributoConfiguracionListComponent } from './atributo-configuracion/atributo-configuracion-list/atributo-configuracion-list.component';
import { AtributoConfiguracionDetailComponent } from './atributo-configuracion/atributo-configuracion-detail/atributo-configuracion-detail.component';
import { TipoDocumentoDetailComponent } from './tipo-documento/tipo-documento-detail/tipo-documento-detail.component';
import { TipoDocumentoListComponent } from './tipo-documento/tipo-documento-list/tipo-documento-list.component';
import { AgenteListComponent } from './agente/agente-list/agente-list.component';
import { AgenteDetailComponent } from './agente/agente-detail/agente-detail.component';
import { DelegacionListComponent } from './delegacion/delegacion-list/delegacion-list.component';
import { DelegacionDetailComponent } from './delegacion/delegacion-detail/delegacion-detail.component';
import { DireccionListComponent } from './direccion/direccion-list/direccion-list.component';
import { DireccionDetailComponent } from './direccion/direccion-detail/direccion-detail.component';
import { SecretariaListComponent } from './secretaria/secretaria-list/secretaria-list.component';
import { SecretariaDetailComponent } from './secretaria/secretaria-detail/secretaria-detail.component';
import { SituacionRevistaListComponent } from './situacionRevista/situacion-revista-list/situacion-revista-list.component';
import { SituacionRevistaDetailComponent } from './situacionRevista/situacion-revista-detail/situacion-revista-detail.component';
import { TipoRecursoListComponent } from './tipoRecurso/tipo-recurso-list/tipo-recurso-list.component';
import { TipoRecursoDetailComponent } from './tipoRecurso/tipo-recurso-detail/tipo-recurso-detail.component';



@NgModule({
    declarations: [
        DashboardComponent,
        ProfileComponent,
        UsuariosListComponent,
        UsuarioDetailComponent,
        AtributoConfiguracionListComponent,
        AtributoConfiguracionDetailComponent,
        TipoDocumentoDetailComponent,
        TipoDocumentoListComponent,
        AgenteListComponent,
        AgenteDetailComponent,
        DelegacionListComponent,
        DelegacionDetailComponent,
        DireccionListComponent,
        DireccionDetailComponent,
        SecretariaListComponent,
        SecretariaDetailComponent,
        SituacionRevistaListComponent,
        SituacionRevistaDetailComponent,
        TipoRecursoListComponent,
        TipoRecursoDetailComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        PAGES_ROUTING,
        SweetAlert2Module,
        CommonsAppModule // Modulos basicos (RouterModule,FormsModule,ReactiveFormsModule,HttpClientModule,etc)
    ]
})
export class PageModule { }
