import { Component, OnInit } from '@angular/core';
import {SubirArchivoService} from '../../services/subir-archivo/subir-archivo.service';
import {ModalUploadService} from './modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  archivoASubir: File;
  imagenTemp: any;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.archivoASubir = null;
    this.imagenTemp = null;
    this.modalUploadService.ocultarModal();
  }

  // ==================================
  // Subida de archivos
  // ==================================
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.archivoASubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      Swal.fire('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.archivoASubir = null;
      return;
    }

    this.archivoASubir = archivo;

    // Cargar vista previa
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      // Imagen en base64
      this.imagenTemp = reader.result;
    };
  }


  subirImagen() {
    this.subirArchivoService.subirArchivo(this.archivoASubir, this.modalUploadService.tipo, this.modalUploadService.id)
      .then( (resp) => {
        console.log('Imagen Subida');

        // Notificar a los otros componentes
        this.modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
      })
      .catch( (err) => {
        console.log('Error en la carga ', err);
    });

  }
}
