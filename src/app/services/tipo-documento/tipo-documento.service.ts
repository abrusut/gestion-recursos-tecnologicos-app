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
import { DateUtils } from '../utils/dateUtils';
import { ServiceConfig } from '../serviceconfig';
import { TipoDocumento } from 'src/app/domain/tipo.documento.domain';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  pathEntityResource  = 'tipo-documentos';

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

  guardar(tipoDocumento: TipoDocumento) {
    const url: string = `${this.serviceBaseURL}/${this.pathEntityResource}`;

    if (tipoDocumento !== undefined && tipoDocumento.id !== undefined && Number(tipoDocumento.id) !== 0 ) {
     return this.actualizar(tipoDocumento);
    } else {
      return this.http
        .post(url, tipoDocumento)
        .pipe(
            map((resp: any) => {
              return resp;
            }),
            catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }
  }

  actualizar(tipoDocumento: TipoDocumento) {
    const url = `${this.serviceBaseURL}/${this.pathEntityResource}/${tipoDocumento.id}` ;

    return this.http
      .put(url, tipoDocumento)
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
      map((atributosConfiguracion: any) => {
        this.commonService.normalizePropertyDate(atributosConfiguracion);
        return atributosConfiguracion;
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error))); ;
  }

  findById(id: number): Observable<TipoDocumento> {
    const url = `${this.serviceBaseURL}/${this.pathEntityResource}/${id}` ;
    const params = this.createHttpParams({});
    return this.http.get<TipoDocumento>(url, { params })
              .pipe(
                map((tipoDocumento: any) => {
                  if (tipoDocumento.fechaBaja !== undefined &&
                    tipoDocumento.fechaBaja !== null) {
                      tipoDocumento.fechaBaja = DateUtils.convertStringToDate(tipoDocumento.fechaBaja);
                  }
                  return tipoDocumento;
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error)));

  }

  borrar(tipoDocumento: TipoDocumento) {
    tipoDocumento.fechaBaja = new Date();
    return this.actualizar(tipoDocumento);
   }

}
