import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/domain/usuario.domain';
import { CommonService, UsuarioService, AtributoConfiguracionService } from 'src/app/services/service.index';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Message, SelectItem } from 'primeng/api';
import Swal from 'sweetalert2';

import { switchMap, debounceTime, map } from 'rxjs/operators';

import { Observable, combineLatest } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Exception } from 'src/app/domain/exception.domain';
import { userInfo } from 'os';
import { AtributoConfiguracion } from 'src/app/domain/atributo.configuracion.domain';
import * as moment from 'moment';

declare function init_plugins();

@Component({
  selector: 'app-atributo-configuracion-detail',
  templateUrl: './atributo-configuracion-detail.component.html',
  styleUrls: ['./atributo-configuracion-detail.component.scss']
})
export class AtributoConfiguracionDetailComponent implements OnInit {

  public yearRangeValue: any;
  public es: any;
  submitted = false;
  atributoConfiguracion: AtributoConfiguracion = {};
  public reactiveForm: FormGroup;
  public msgs: Message[];
  nonWhiteSpaceRegExp: RegExp = new RegExp('^[_A-z0-9]{1,}$');

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public atributoConfiguracionService: AtributoConfiguracionService
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.reactiveForm.controls;
  }


  ngOnInit() {
    init_plugins();
    this.reactiveForm = this.fb.group(
      {
        clave:
          ['',
          {
            validators: [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern(this.nonWhiteSpaceRegExp)
              ]
          }
        ],
        valor: ['', [Validators.required, Validators.minLength(1)]],
        fechaBaja: [null]
      }
    );

    // Levanto el Usuario por parametro
    this.activatedRoute.params.subscribe(params => {
      const id: string = params.id;
      if (id !== undefined && id !== 'nuevo') {
        this.cargar(id);
      }
    });

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this.setYearRangeValue();
  }

   // ==================================
  // Carga el rango de años de los calendarios
  // ==================================
  setYearRangeValue() {
    const yearMin: number = new Date().getFullYear();
    const yearMaxTmp = new Date();
    yearMaxTmp.setFullYear(yearMaxTmp.getFullYear() + 10);
    const yearMax = yearMaxTmp.getFullYear();

    this.yearRangeValue = `${yearMin}:${yearMax}`;
  }

  // ==================================
  // Cargar para Editar
  // ==================================
  cargar(id: string) {
    this.atributoConfiguracionService
      .findById(Number(id))
      .subscribe((atributoConfiguracion: AtributoConfiguracion) => {
        this.atributoConfiguracion = atributoConfiguracion;
        console.log(`Atributo Configuracion ${this.atributoConfiguracion.id}. ${JSON.stringify(this.atributoConfiguracion)} `)
        if (!moment(this.atributoConfiguracion.fechaBaja).isValid()) {
          this.atributoConfiguracion.fechaBaja = null;
        }
        this.reactiveForm.patchValue(this.atributoConfiguracion);
      });
  }

  // ==================================
  // Guardar Nuevo
  // ==================================
  guardar() {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      Swal.fire('Importante', 'Debe completar todo el formulario', 'warning');
      return;
    }

    const idAux = this.atributoConfiguracion.id;
    this.atributoConfiguracion = this.reactiveForm.value;
    this.atributoConfiguracion.id = idAux;

    if (this.atributoConfiguracion.fechaBaja !== undefined &&
        this.atributoConfiguracion.fechaBaja !== null) {
          if (!moment(this.atributoConfiguracion.fechaBaja).isValid()) {
            this.atributoConfiguracion.fechaBaja = new Date();
          }
      }

    console.log(`Atributo Configuracion to save ${this.atributoConfiguracion.id}. ${JSON.stringify(this.atributoConfiguracion)} `)
    this.atributoConfiguracionService.guardar(this.atributoConfiguracion).subscribe(
      (atributoConfiguracion: AtributoConfiguracion) => {
        this.msgs = [];
        this.msgs.push({
          severity: 'info',
          summary: `Registro ${atributoConfiguracion.clave} guardado`,
          detail: atributoConfiguracion.valor
        });
        this.atributoConfiguracion = {};
        setTimeout(() => {
          this.router.navigate([`atributo-configuracion`]);
        }, 2000);
      },
      error => {
        const exception: Exception = this.commonService.handlerError(error);
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: `${exception.title}`,
          detail: exception.body
        });
      }
    );
  }

  cancelar() {
    if (this.atributoConfiguracion && this.atributoConfiguracion.id) {
      this.router.navigate([`atributo-configuracion`]);
    } else {
      this.reactiveForm.reset();
      this.submitted = false;
    }
  }
}
