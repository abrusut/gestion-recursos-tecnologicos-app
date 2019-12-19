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
import { CommonService, TipoDocumentoService } from 'src/app/services/service.index';
import { TipoDocumento } from 'src/app/domain/tipo.documento.domain';

declare function init_plugins();

@Component({
  selector: 'app-tipo-documento-list',
  templateUrl: './tipo-documento-list.component.html',
  styleUrls: ['./tipo-documento-list.component.scss']
})
export class TipoDocumentoListComponent  implements OnInit {

  @ViewChild('filterSearch', { static: true }) filterSearch: ElementRef<any>;
  public inputObservable: Observable<any>;
  filterSearchInput: string;

  itemsRecordsPerPage: MenuItem[];
  cantidadRegistrosPorPaginaList: any;
  selectedItem: TipoDocumento;
  totalRecords: number;
  nroFilasPorPagina: number = environment.REGISTROS_PER_PAGE;
  paginaActual = 0;
  public msgs: Message[];

  loading = false;
  tiposDocumentos: TipoDocumento[] = [];
  cols: any[];

  multiSortMeta: SortMeta[];

  constructor(public tipoDocumentoService: TipoDocumentoService,
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
                  { field: 'tipo', header: 'Tipo' },
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
            console.log( `carga : ${element.target.value}`);
            this.tipoDocumentoService.findAll(this.paginaActual, this.nroFilasPorPagina, element.target.value, undefined)
              .subscribe( (resp: any) => {
                  this.loading = false;
                  this.tiposDocumentos = resp['hydra:member'];
                  this.totalRecords = resp['hydra:totalItems'];

                  console.log(resp);
                });
          });
  }

  ordenarTabla(event: SortEvent) {
    console.log(event);
  }

  enabledAtributoConfiguacion(tipoDocumento: TipoDocumento) {
    console.log(`enabled ${tipoDocumento}` );
    this.tipoDocumentoService.guardar(tipoDocumento).subscribe(
      (tipoDocumentoResp: TipoDocumento) => {
        this.msgs = [];
        let accionTxt = 'Habilitado';
        if (tipoDocumentoResp.fechaBaja !== undefined && tipoDocumentoResp.fechaBaja !== null) {
          accionTxt = 'Deshabilitado';
        }
        this.msgs.push({
          severity: 'info',
          summary: `Configuracion ${tipoDocumentoResp.tipo} ${accionTxt}`,
          detail: tipoDocumentoResp.tipo
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
    this.router.navigate(['tipo-documento',  id]);
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
    this.tipoDocumentoService.findAll(
      this.paginaActual, this.nroFilasPorPagina, this.filterSearchInput, this.multiSortMeta)
      .subscribe( (resp: any) => {
        this.loading = false;
        this.tiposDocumentos = resp['hydra:member'];
        this.totalRecords = resp['hydra:totalItems'];

        console.log(resp);
      });
  }

  borrar(tipoDocumento: TipoDocumento) {

    Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta apunto de desactivar a ' + tipoDocumento.tipo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    })
    .then((result) => {
      if (result.value) {
        // no se borra fisicamente solo se desactiva
        tipoDocumento.fechaBaja = new Date();
        this.tipoDocumentoService.borrar(tipoDocumento)
            .subscribe( (resp: any) => {
              Swal.fire('Tipo Documento Deshabilitada', tipoDocumento.tipo, 'success');
              this.cargarRegistros();
            });
      }
    });
  }

}
