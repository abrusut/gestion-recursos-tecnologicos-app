import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Interceptor HTTP
import { MyHttpInterceptor } from './my-http-interceptor';

// Rutas
import { APP_ROUTING } from './app-routing';

// Modulos
import { PageModule } from './pages/pages.modulo';
import { ServiceModule } from './services/service.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonsAppModule } from './commons/commons.app.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.modulo';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { AgenteListComponent } from './pages/agente-list/agente-list.component';
import { AgenteDetailComponent } from './pages/agente-detail/agente-detail.component';
import { DelegacionDetailComponent } from './pages/delegacion-detail/delegacion-detail.component';
import { DelegacionListComponent } from './pages/delegacion/delegacion-list/delegacion-list.component';
import { DireccionListComponent } from './pages/direccion/direccion-list/direccion-list.component';
import { DireccionDetailComponent } from './pages/direccion/direccion-detail/direccion-detail.component';
import { RecursoDetailComponent } from './pages/recurso/recurso-detail/recurso-detail.component';
import { RecursoListComponent } from './pages/recurso/recurso-list/recurso-list.component';
import { SecretariaListComponent } from './pages/secretaria/secretaria-list/secretaria-list.component';
import { SecretariaDetailComponent } from './pages/secretaria/secretaria-detail/secretaria-detail.component';
import { SituacionRevistaDetailComponent } from './pages/situacionRevista/situacion-revista-detail/situacion-revista-detail.component';
import { SituacionRevistaListComponent } from './pages/situacionRevista/situacion-revista-list/situacion-revista-list.component';
import { TipoRecursoListComponent } from './pages/tipoRecurso/tipo-recurso-list/tipo-recurso-list.component';
import { TipoRecursoDetailComponent } from './pages/tipoRecurso/tipo-recurso-detail/tipo-recurso-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    SearchInputComponent,
    AgenteListComponent,
    AgenteDetailComponent,
    DelegacionDetailComponent,
    DelegacionListComponent,
    DireccionListComponent,
    DireccionDetailComponent,
    RecursoDetailComponent,
    RecursoListComponent,
    SecretariaListComponent,
    SecretariaDetailComponent,
    SituacionRevistaDetailComponent,
    SituacionRevistaListComponent,
    TipoRecursoListComponent,
    TipoRecursoDetailComponent
  ],
  imports: [
    APP_ROUTING,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ServiceModule.forRoot({context: '/app', debug: true}),    // Modulo de la app que tiene todos los services
    SharedModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    CommonsAppModule, // Modulos basicos (RouterModule,FormsModule,ReactiveFormsModule,HttpClientModule,etc)
  ],
  exports: [
    SweetAlert2Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
