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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    SearchInputComponent
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
