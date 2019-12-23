import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/domain/usuario.domain";
import {
  CommonService,
  UsuarioService,
  AgenteService,
  TipoDocumentoService
} from "src/app/services/service.index";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Message, SelectItem, SortMeta } from "primeng/api";
import Swal from "sweetalert2";

import { switchMap, debounceTime, map } from "rxjs/operators";

import { Observable, combineLatest } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Exception } from "src/app/domain/exception.domain";
import { userInfo } from "os";
import { Agente } from "src/app/domain/agente.domain";
import { TipoDocumento } from "src/app/domain/tipo.documento.domain";
import * as moment from "moment";

declare function init_plugins();

@Component({
  selector: "app-agente-detail",
  templateUrl: "./agente-detail.component.html",
  styleUrls: ["./agente-detail.component.scss"]
})
export class AgenteDetailComponent implements OnInit {
  public apiUriEntityPathTipoDocumento: string = 'tipo-documentos';
  public apiUriEntityPathAgente: string = 'agentes';
  public yearRangeValue: any;
  public yearRangeValueFechaNacimiento: any;
  public es: any;
  submitted = false;
  agente: Agente = {};
  public reactiveForm: FormGroup;
  public msgs: Message[];
  soloNumeros: RegExp = new RegExp("^([0-9])*$");

  public tiposDocumento: TipoDocumento[];
  // Array FILTRADO de Opciones del Deplegable de TipoDocumento
  public filterOptionsTipoDocumento: any[];

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public agenteService: AgenteService,
    public tipoDocumentoService: TipoDocumentoService
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.reactiveForm.controls;
  }

  ngOnInit() {
    init_plugins();
    this.cargarTiposDocumento();
    this.reactiveForm = this.fb.group({
      nombre: [
        "",
        {
          validators: [Validators.required, Validators.minLength(1)]
        }
      ],
      apellido: ["", [Validators.required, Validators.minLength(1)]],
      fechaNacimiento: [null],
      domicilioCalle: [null],
      domicilioNumero: [null, [Validators.pattern(this.soloNumeros)]],
      tipoDocumento: [null, [Validators.required]],
      numeroDocumento: [
        null,
        [Validators.required, Validators.pattern(this.soloNumeros)]
      ],
      sexo: [null, [Validators.required]],
      telefono: [null, [Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
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
    this.setYearRangeValueFechaNacimiento();
  }

  cargarTiposDocumento() {
    const nroFilasPorPagina: number = environment.REGISTROS_PER_PAGE;
    const paginaActual: number = 1;
    const multiSortMeta: SortMeta[] = [];
    this.tipoDocumentoService
      .findAll(paginaActual, nroFilasPorPagina, null, multiSortMeta, "json")
      .subscribe(
        (respTiposDocumentos: any) => {
          if (
            respTiposDocumentos !== undefined &&
            respTiposDocumentos !== null &&
            respTiposDocumentos.length > 0
          ) {
            this.tiposDocumento = respTiposDocumentos as TipoDocumento[];
            this.tiposDocumento = this.commonService.normalizeIdPropertyToUri(this.tiposDocumento, this.apiUriEntityPathTipoDocumento)
            console.log(
              `Tipo documentos encontrados ${JSON.stringify(
                this.tiposDocumento
              )} `
            );
          } else {
            console.log(`Sin datos para autocomplete de Tipos Documento`);
          }
        },
        error => {
          console.error(`no puedo traer datos de Tipos Documento`);
        }
      );
  }

  // ==================================
  // Carga el rango de años de los calendarios
  // ==================================
  setYearRangeValueFechaNacimiento() {
    const yearMin: number = 1800;
    const yearMaxTmp = new Date();
    yearMaxTmp.setFullYear(yearMaxTmp.getFullYear() + 10);
    const yearMax = yearMaxTmp.getFullYear();

    this.yearRangeValueFechaNacimiento = `${yearMin}:${yearMax}`;
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
    this.agenteService.findById(Number(id)).subscribe((agente: Agente) => {
      this.agente = agente;
      console.log(`Agente ${this.agente.id}. ${JSON.stringify(this.agente)} `);
      if (!moment(this.agente.fechaBaja).isValid()) {
        this.agente.fechaBaja = null;
      }
      this.commonService.normalizePropertyDate(this.agente);
      this.reactiveForm.patchValue(this.agente);
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

    const idAux = this.agente.id;
    this.agente = this.reactiveForm.value;
    this.agente.id = idAux;

    this.agente.id =this.commonService.normalizeIdPropertyToUri(this.agente.id, this.apiUriEntityPathAgente);

    if (this.agente.fechaBaja !== undefined && this.agente.fechaBaja !== null) {
      if (!moment(this.agente.fechaBaja).isValid()) {
        this.agente.fechaBaja = new Date();
      }
    }
    console.log(
      `Agente to save ${this.agente.nombre}. ${JSON.stringify(this.agente)} `
    );
    this.agenteService.guardar(this.agente).subscribe(
      (agente: Agente) => {
        this.msgs = [];
        this.msgs.push({
          severity: "info",
          summary: `Registro ${agente.nombre} guardado`,
          detail: agente.nombre
        });
        this.agente = {};
        setTimeout(() => {
          this.router.navigate([`agente`]);
        }, 2000);
      },
      error => {
        const exception: Exception = this.commonService.handlerError(error);
        this.msgs = [];
        this.msgs.push({
          severity: "error",
          summary: `${exception.title}`,
          detail: exception.body
        });
      }
    );
  }

  cancelar() {
    if (this.agente && this.agente.id) {
      this.router.navigate([`agente`]);
    } else {
      this.reactiveForm.reset();
      this.submitted = false;
    }
  }

  /**
   * Filtra entre las opciones del componente en base a lo que va tipeando el usuario
   * @param event
   */
  filtrar(event) {
    this.filterOptionsTipoDocumento = [];
    for (let i = 0; i < this.tiposDocumento.length; i++) {
      let option = this.tiposDocumento[i];

      // campo a concatenar para comparar
      let comparar: any = option["tipo"].toLowerCase();
      let query: any = event.query.toLowerCase();
      if (comparar.search(query) != -1) {
        this.filterOptionsTipoDocumento.push(option);
      }
    }
  }
}
