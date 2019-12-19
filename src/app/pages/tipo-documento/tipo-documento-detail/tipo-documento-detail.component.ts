import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Message } from 'primeng/api';
import { AtributoConfiguracion } from 'src/app/domain/atributo.configuracion.domain';
import { Exception } from 'src/app/domain/exception.domain';
import { TipoDocumento } from 'src/app/domain/tipo.documento.domain';
import { CommonService, TipoDocumentoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';



declare function init_plugins();

@Component({
  selector: "app-tipo-documento-detail",
  templateUrl: "./tipo-documento-detail.component.html",
  styleUrls: ["./tipo-documento-detail.component.scss"]
})
export class TipoDocumentoDetailComponent implements OnInit {
  public yearRangeValue: any;
  public es: any;
  submitted = false;
  tipoDocumento: TipoDocumento = {};
  public reactiveForm: FormGroup;
  public msgs: Message[];

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public tipoDocumentoService: TipoDocumentoService
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.reactiveForm.controls;
  }

  ngOnInit() {
    init_plugins();
    this.reactiveForm = this.fb.group({
      tipo: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(10)
          ]
        }
      ],
      fechaBaja: [null]
    });

    // Levanto el Usuario por parametro
    this.activatedRoute.params.subscribe(params => {
      const id: string = params.id;
      if (id !== undefined && id !== "nuevo") {
        this.cargar(id);
      }
    });

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado"
      ],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
      ],
      monthNamesShort: [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sep",
        "oct",
        "nov",
        "dic"
      ],
      today: "Hoy",
      clear: "Borrar"
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
    this.tipoDocumentoService
      .findById(Number(id))
      .subscribe((tipoDocumento: TipoDocumento) => {
        this.tipoDocumento = tipoDocumento;
        console.log(
          `Atributo Configuracion ${
            this.tipoDocumento.id
          }. ${JSON.stringify(this.tipoDocumento)} `
        );
        if (!moment(this.tipoDocumento.fechaBaja).isValid()) {
          this.tipoDocumento.fechaBaja = null;
        }
        this.reactiveForm.patchValue(this.tipoDocumento);
      });
  }

  // ==================================
  // Guardar Nuevo
  // ==================================
  guardar() {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      Swal.fire("Importante", "Debe completar todo el formulario", "warning");
      return;
    }

    const idAux = this.tipoDocumento.id;
    this.tipoDocumento = this.reactiveForm.value;
    this.tipoDocumento.id = idAux;

    if (
      this.tipoDocumento.fechaBaja !== undefined &&
      this.tipoDocumento.fechaBaja !== null
    ) {
      if (!moment(this.tipoDocumento.fechaBaja).isValid()) {
        this.tipoDocumento.fechaBaja = new Date();
      }
    }

    console.log(
      `Tipo Documento to save ${
        this.tipoDocumento.id
      }. ${JSON.stringify(this.tipoDocumento)} `
    );
    this.tipoDocumentoService
      .guardar(this.tipoDocumento)
      .subscribe(
        (tipoDocumento: TipoDocumento) => {
          this.msgs = [];
          this.msgs.push({
            severity: "info",
            summary: `Registro ${tipoDocumento.tipo} guardado`,
            detail: tipoDocumento.tipo
          });
          this.tipoDocumento = {};
          setTimeout(() => {
            this.router.navigate([`tipo-documento`]);
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
    if (this.tipoDocumento && this.tipoDocumento.id) {
      this.router.navigate([`tipo-documento`]);
    } else {
      this.reactiveForm.reset();
      this.submitted = false;
    }
  }
}
