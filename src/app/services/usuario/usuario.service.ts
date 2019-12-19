import { Usuario } from '../../domain/usuario.domain';
import { Observable, throwError } from 'rxjs';
import { map, filter, catchError, mergeMap, mapTo, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import {
  HttpClient,
  HttpParams,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { UserLogin } from '../../domain/userLogin.domain';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { Exception } from 'src/app/domain/exception.domain';
import { SortMeta } from 'primeng/api';
import { ServiceConfig } from '../serviceconfig';

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService,
    public commonService: CommonService,
    private serviceConfig: ServiceConfig
  ) {
    // console.log("Servicio de usuarios");
    this.cargarStorage();
  }

  private get serviceBaseURL(): string {
    return this.serviceConfig.context + '/api';
  }

  renuevaToken() {
    let url: string = this.serviceBaseURL + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http
      .get(url)
      .pipe(
        map((resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log('Token renovado automaticamente ');
          return true;
        } ),
        catchError( (error: HttpErrorResponse) => {
          this.commonService.handlerError(error);
          this.router.navigate(['/login']);
          Swal.fire(
            'No se pudo renovar token',
            'No fue posible renovar token',
            'error'
          );
          return throwError(error);
        })
      );
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = ' ';
      this.usuario = null;
      this.menu = [];
    }
  }

  estaLogueado() {
    return this.usuario && this.token && this.token.length > 5 ? true : false;
  }

  saveLocalStorage(token: string, usuario: Usuario) {
    this.usuario = usuario;
    this.token = token;
    // this.menu = menu;
    localStorage.setItem('id', usuario.id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout() {
    this.usuario = null;
    this.token = null;
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  login(usuario: UserLogin, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('username', usuario.username);
    } else {
      localStorage.removeItem('username');
    }

    const url: string = `${this.serviceBaseURL}/login_check`;

    return this.http.post(url, usuario).pipe(
      map((data: any) => {
        const user: Usuario = data.user as Usuario;
        this.saveLocalStorage(data.token, user);
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

        errorMessage = `An error occurred: ${err.error.message}`;
    } else {

        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);

    return throwError(err);
  }

  private log(level: string, message: any): void {
    console[level](message);
  }

  private createHttpParams(values: { [index: string]: any }): HttpParams {
    let params: HttpParams = new HttpParams();

    Object.keys(values).forEach((key: string) => {
      const value: any = values[key];
      if (value !== undefined) {
        params = params.set(key, String(value));
      }
    });

    return params;
  }

  guardarUsuario(usuario: Usuario) {
    const url: string = `${this.serviceBaseURL}/users`;

    if (usuario !== undefined && usuario.id !== undefined && Number(usuario.id) !== 0 ) {
     return this.actualizarUsuario(usuario);
    } else {
      return this.http
        .post(url, usuario)
        .pipe(
            map((resp: any) => {
              return resp;
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }
  }

  actualizarUsuario(usuario: Usuario) {
    const url: string = `${this.serviceBaseURL}/users/${usuario.id}`;

    return this.http
      .put(url, usuario)
      .pipe(
        map((resp: any) => {
          if (usuario.id === this.usuario.id) {
            // SI el usuario es el mismo logueado actualizo las variables de storage
            const usuarioDB: Usuario = usuario; // La respuesta del backend me devuelve el usuario actualizado
            this.saveLocalStorage(
              this.token,
              usuarioDB
            );
          }
          return resp;
        }),
        catchError(error => {
          const exception: Exception
              =  this.commonService.handlerError(error);
          Swal.fire(exception.title, exception.statusCode + ' ' + exception.body, 'error');
          return throwError(error);
        })
      );
  }

  actualizarPasswordUsuario(usuarioParam: Usuario) {
    const url: string = `${this.serviceBaseURL}/users/${usuarioParam.id}/reset-password`;
    return this.http
      .put(url, usuarioParam)
      .pipe(
        map((resp: any) => {
          if (usuarioParam.id === this.usuario.id && resp.token !== undefined) {
            this.token = resp.token;
            // SI el usuario es el mismo logueado actualizo las variables de storage
            const usuarioDB: Usuario = usuarioParam; // La respuesta del backend me devuelve el usuario actualizado
            this.saveLocalStorage(
              this.token,
              usuarioDB
            );
          }
          return resp;
        }),
        catchError(error => {
          const exception: Exception
              =  this.commonService.handlerError(error);
          Swal.fire(exception.title, exception.body, 'error');
          return throwError(error);
        })
      );
  }

  uploadImagen(file: File, id: string) {
    return new Promise((resolve, reject) => {
      this.subirArchivoService
        .subirArchivo(file, 'usuarios', id)
        .then((resp: any) => {
          // actualizo la imagen del usuario logueado
          this.usuario.avatar = resp.url;
          // Actualizo datos del usuario en storage (para que se vean los cambios en front)
          this.saveLocalStorage(this.token, this.usuario);
          console.log(resp);
          resolve(resp);
        })
        .catch((resp: any) => {
          reject(resp);
          console.log('Error subiendo archivo ', resp);
        });
    });
  }

  findAllUsuarios(page: number , size: number , termino: string, multiSortMeta: SortMeta[]) {
    let url = `${this.serviceBaseURL}/users?size=${size}&page=${page}`;

    if (termino !== undefined && termino !== null && termino.length > 0) {
      url = `${this.serviceBaseURL}/users/globalFilter?termino=${termino}&size=${size}&page=${page}`;
    }
     // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    if (multiSortMeta !== undefined && multiSortMeta.length > 0) {
      multiSortMeta.forEach( (element: SortMeta) => {
        let direction = 'asc';
        if (element.order === -1) {
          direction = 'desc';
        }
        url += `&_order[${element.field}]=${direction}`;
      });
    }

    return this.http.get(url);
  }


  isUsernameExist(username: string): Observable<Usuario> {
    const url = `${this.serviceBaseURL}/users?username=${username}`;
    const params = this.createHttpParams({});
    return this.http.get<Usuario>(url, { params: params })
              .pipe(
                    tap(data => console.log('return: ' + JSON.stringify(data))),
                    catchError((error: HttpErrorResponse) => this.handleError(error))
                    );

  }

  findUsuarioById(id: number): Observable<Usuario> {
    const url = `${this.serviceBaseURL}/users/${id}`;
    const params = this.createHttpParams({});
    return this.http.get<Usuario>(url, { params: params })
              .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));

  }

  findUsuarios(page: number , size: number, termino: string) {
    const url = `${this.serviceBaseURL}/globalFilter?termino=${termino}&size=${size}&page=${page} `;
    return this.http.get(url);
  }

  /** Borrado fisico
  borrarUsuario(id: string) {
    let url = environment.URL_API + '/users/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
  }
  */
  borrarUsuario(usuario: Usuario) {
   return this.actualizarUsuario(usuario);
  }
}
