import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { Usuario } from '../../../domain/usuario.domain';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem, LazyLoadEvent, MenuItem, SortEvent, SortMeta, Message } from 'primeng/api';
import { debounceTime } from 'rxjs/operators';
import { Input } from '@angular/compiler/src/core';
import { Exception } from 'src/app/domain/exception.domain';
import { CommonService, AgenteService } from 'src/app/services/service.index';
import { Agente } from 'src/app/domain/agente.domain';
declare function init_plugins();


@Component({
  selector: 'app-agente-list',
  templateUrl: './agente-list.component.html',
  styleUrls: ['./agente-list.component.scss']
})
export class AgenteListComponent implements OnInit {

  @ViewChild('filterSearch', { static: true }) filterSearch: ElementRef<any>;
  public inputObservable: Observable<any>;
  filterSearchInput: string;

  itemsRecordsPerPage: MenuItem[];
  cantidadRegistrosPorPaginaList: any;
  selectedItem: Agente;
  totalRecords: number;
  nroFilasPorPagina: number = environment.REGISTROS_PER_PAGE;
  paginaActual = 0;
  public msgs: Message[];

  loading = false;
  agentes: Agente[] = [];
  cols: any[];

  multiSortMeta: SortMeta[];

  constructor(public agenteService: AgenteService,
              private route: ActivatedRoute,
              private router: Router,
              private commonService: CommonService) {
                this.itemsRecordsPerPage = [
                  {label: '5', icon: 'pi pi-bars',
                  command: () => {
                    this.onChangeRecordsPerPage(5);
                  }},
                  {label: '10', icon: 'pi pi-bars',
                    command: () => {
                      this.onChangeRecordsPerPage(10);
                    }},
                  {label: '20', icon: 'pi pi-bars',
                    command: () => {
                      this.onChangeRecordsPerPage(20);
                    }},
                  {label: '30', icon: 'pi pi-bars',
                  command: () => {
                    this.onChangeRecordsPerPage(30);
                  }},
                  {label: '50', icon: 'pi pi-bars',
                  command: () => {
                    this.onChangeRecordsPerPage(50);
                  }},
                  {label: '100', icon: 'pi pi-bars',
                    command: () => {
                    this.onChangeRecordsPerPage(100);
                  }}
                ];

                this.cols = [
                  { field: 'id', header: 'Id' },
                  { field: 'nombre', header: 'Nombre' },
                  { field: 'apellido', header: 'Apellido' },
                  { field: 'numeroDocumento', header: 'Numero Documento' },
                  { field: 'sexo', header: 'Sexo' },
                  { field: 'telefono', header: 'Telefono' },
                  { field: 'numeroDocumento', header: 'Numero Documento' },
                  { field: 'updatedAt', header: 'Actualizado' },
                  { field: 'createdAt', header: 'Creado' },
                  { field: 'fechaBaja', header: 'Fecha Baja' },
                  { field: 'accion', header: 'Acciones' }
                ];
              }

  ngOnInit() {
    init_plugins();
    this.inputObservable = fromEvent(this.filterSearch.nativeElement, 'input');
    this.inputObservable.pipe(
         debounceTime(1000))
         .subscribe(element => {
            console.log( `carga agentes: ${element.target.value}`);
            this.agenteService.findAll(this.paginaActual, this.nroFilasPorPagina, element.target.value, undefined)
              .subscribe( (resp: any) => {
                  this.loading = false;
                  this.agentes = resp['hydra:member'];
                  this.totalRecords = resp['hydra:totalItems'];

                  console.log(resp);
                });
          });
  }

  ordenarTabla(event: SortEvent) {
    console.log(event);
  }

  enabledAtributoConfiguacion(agente: Agente) {
    console.log(`enabled ${agente}` );
    this.agenteService.guardar(agente).subscribe(
      (agenteResp: Agente) => {
        this.msgs = [];
        let accionTxt = 'Habilitado';
        if (agenteResp.fechaBaja !== undefined && agenteResp.fechaBaja !== null) {
          accionTxt = 'Deshabilitado';
        }
        this.msgs.push({
          severity: 'info',
          summary: `Agente ${agenteResp.nombre} ${accionTxt}`,
          detail: agenteResp.apellido
        });
      },
      error => {
        const exception: Exception
              =  this.commonService.handlerError(error);
        this.msgs = [];
        this.msgs.push({
          severity: 'error',
          summary: `${exception.title}`,
          detail: exception.body
        });
      }
    );
  }

  editar(id: string) {
    console.log(` Editar ${id}`);
    this.router.navigate(['agente',  id]);
  }

  loadLazy(event: LazyLoadEvent) {
    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value
    this.paginaActual = (event.first / this.nroFilasPorPagina) + 1;
    this.multiSortMeta = event.multiSortMeta;

    this.cargarRegistros();
  }

  onChangeRecordsPerPage(value: any) {
    this.nroFilasPorPagina = value;
    console.log(`Ver registros por pagina ${this.nroFilasPorPagina}`);
    this.cargarRegistros();
 }

  cargarRegistros() {
    this.loading = true;
    this.agenteService.findAll(
      this.paginaActual, this.nroFilasPorPagina, this.filterSearchInput, this.multiSortMeta)
      .subscribe( (resp: any) => {
        this.loading = false;
        this.agentes = resp['hydra:member'];
        this.totalRecords = resp['hydra:totalItems'];

        console.log(resp);
      });
  }

  borrar(agente: Agente) {

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta apunto de desactivar a ' + agente.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    })
    .then((result) => {
      if (result.value) {
        // no se borra fisicamente solo se desactiva
        agente.fechaBaja = new Date();
        this.agenteService.borrar(agente)
            .subscribe( (resp: any) => {
              Swal.fire('Agente Deshabilitado', agente.nombre, 'success');
              this.cargarRegistros();
            });
      }
    });
  }



}
