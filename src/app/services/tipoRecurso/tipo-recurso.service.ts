import { Observable, throwError } from 'rxjs';
import { map, filter, catchError, mergeMap, mapTo, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpParams,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { Exception } from 'src/app/domain/exception.domain';
import { SortMeta } from 'primeng/api';
import { TipoRecurso } from 'src/app/domain/tipo.recurso.domain';
import { DateUtils } from '../utils/dateUtils';
import { ServiceConfig } from '../serviceconfig';

@Injectable({
  providedIn: 'root'
})
export class TipoRecursoService {

  pathEntityResource  = 'tipoRecursos';

  private get serviceBaseURL(): string {
    return this.serviceConfig.context + '/api';
  }

  constructor(
    public http: HttpClient,
    public router: Router,
    public commonService: CommonService,
    private serviceConfig: ServiceConfig
  ) {

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

  guardar(tipoRecurso: TipoRecurso) {
    const url: string = `${this.serviceBaseURL}/${this.pathEntityResource}`;

    if (tipoRecurso !== undefined && tipoRecurso.id !== undefined && Number(tipoRecurso.id) !== 0 ) {
     return this.actualizar(tipoRecurso);
    } else {
      return this.http
        .post(url, tipoRecurso)
        .pipe(
            map((resp: any) => {
              return resp;
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }
  }

  actualizar(tipoRecurso: TipoRecurso) {
    const url = `${this.serviceBaseURL}/${this.pathEntityResource}/${tipoRecurso.id}` ;

    return this.http
      .put(url, tipoRecurso)
      .pipe(
        map((resp: any) => {
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

  findAll(page: number , size: number , termino: string, multiSortMeta: SortMeta[]) {
    let url = `${this.serviceBaseURL}/${this.pathEntityResource}?size=${size}&page=${page}`;

    if (termino !== undefined && termino !== null && termino.length > 0) {
      url = `${this.serviceBaseURL}/${this.pathEntityResource}/globalFilter?termino=${termino}&size=${size}&page=${page}`;
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

    return this.http.get(url).pipe(
      map((tipoRecursos: any) => {
        this.commonService.normalizePropertyDate(tipoRecursos);
        return tipoRecursos;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))); ;
  }

  findById(id: number): Observable<TipoRecurso> {
    const url = `${this.serviceBaseURL}/${this.pathEntityResource}/${id}` ;
    const params = this.createHttpParams({});
    return this.http.get<TipoRecurso>(url, { params })
              .pipe(
                map((tipoRecurso: any) => {
                  if (tipoRecurso.fechaBaja !== undefined &&
                    tipoRecurso.fechaBaja !== null) {
                    tipoRecurso.fechaBaja = DateUtils.convertStringToDate(tipoRecurso.fechaBaja);
                  }
                  return tipoRecurso;
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error)));

  }

  borrar(tipoRecurso: TipoRecurso) {
    tipoRecurso.fechaBaja = new Date();
    return this.actualizar(tipoRecurso);
   }
}
