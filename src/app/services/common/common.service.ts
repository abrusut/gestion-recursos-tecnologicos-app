import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Exception } from '../../domain/exception.domain';
import { HttpErrorResponse } from '@angular/common/http';
import { element } from 'protractor';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import * as moment from 'moment';
import { DateUtils } from '../utils/dateUtils';
import { isArray } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  handlerError(err: any): Exception {
    const exception: Exception = {};
    exception.body = '';
    const commonsExceptionBody = 'Error procesando la peticion <br/>';
    const commonsExceptionTitle = 'Error en la aplicacion';
    exception.icon = 'error';
    console.log(err);
    if ( err && err !== undefined ) {
      if (err instanceof HttpErrorResponse) {
        exception.statusCode = err.status;
        exception.title = `Mensaje de la aplicacion `;
        console.error(`Mensaje de la aplicacion ${err.status} - ${err.statusText} - ${err.url}` );
      }
      if (err.error !== undefined && err.error.violations !== undefined && err.error.violations.length > 0) {
        err.error.violations.forEach(violation => {
          if (violation.propertyPath !== undefined) {
              exception.body = ` ${violation.propertyPath} : `;
              exception.body += ` ${violation.message} <br/>` ;
          } else {
              exception.body = `${violation.message} <br/>` ;
          }

        });
      }
      if (err.error !== undefined && err.error.code !== undefined && err.error.message !== undefined ) {
        if (!this.isMessageForUser(err.error.message) ) {
          console.error( ` Message for administrator ${err.error.code} - ${err.error.message}` );
        } else {
          exception.body += ` ${err.error.code} - ${err.error.message} <br/>`;

        }
      }

      if ((exception.body === undefined ||
          (exception.body !== undefined && exception.body.length === 0))
        && err !== undefined && err.error !== undefined && err.error['hydra:description'] !== undefined &&
           err.error['hydra:description'].length > 0) {
        exception.body += ` ${err.error['hydra:description']} <br/>`;
      }

      if ((exception.body === undefined ||
            (exception.body !== undefined && exception.body.length === 0))
          && err !== undefined && err.statusText !== undefined && err.statusText.length > 0) {
        exception.body += ` ${err.statusText} <br/>`;
      }

    }

    if ( exception.body === undefined || (exception.body !== undefined && exception.body.length === 0 )) {
      exception.body = commonsExceptionBody;
    }
    if ( exception.title === undefined || (exception.title !== undefined && exception.title.length === 0 )) {
      exception.title = commonsExceptionTitle;
    }

    return exception;

  }

  isMessageForUser(message: string): boolean {
    let isMessageForUser = true;
    const wordsBlack = environment.BADWORDS;
    message = message.toLocaleUpperCase();
    wordsBlack.forEach(word => {
      const index = message.indexOf(word.toLocaleUpperCase());
      if ( index > 0) {
        isMessageForUser = false;
      }
    });
    return isMessageForUser;

  }

  /**
   * Funcion que convierte de Date a String una fecha, recorriendo las propiedades de un objeto
   * Tambien puede recibir un date solo o un String y pasarlo a date si se especifica TRUE el parametro
   * stringToDate
   * @param object
   * @param stringToDate
   */
  normalizePropertyDate( object: any, stringToDate: boolean = false) {
    if (object === undefined || object === null) {
      return null;
    }

    if (stringToDate) {
      return DateUtils.convertStringToDate(object);
    }

    // Si es una fecha la devuelvo en string formateado
    if (moment.isDate(object)) {
      object = DateUtils.convertDateToString(object);
      return object;
    }

    Object.keys(object).forEach((key: any) => {
      const value: any = object[key];
      if (value !== undefined && value !== null) {
        if (moment.isDate(object)) {
          object = DateUtils.convertDateToString(object);
        }
        if (moment(value, moment.ISO_8601, true).isValid()) {
          object[key] = DateUtils.convertDateToString(value);
        }
        if (value !== undefined && (Array.isArray(value) || typeof value === 'object' )) {
          return this.normalizePropertyDate(value);
        }
      }
    });
    return object;
  }

}
