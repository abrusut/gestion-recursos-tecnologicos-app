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



@NgModule({
    declarations: [
        DashboardComponent,
        ProfileComponent,
        UsuariosListComponent,
        UsuarioDetailComponent,
        AtributoConfiguracionListComponent,
        AtributoConfiguracionDetailComponent,
        TipoDocumentoDetailComponent,
        TipoDocumentoListComponent
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
