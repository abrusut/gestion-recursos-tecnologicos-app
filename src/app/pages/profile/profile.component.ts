import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../domain/usuario.domain';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare function init_plugins();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  archivoASubir: File;
  imagenTemp: any;
  forma: FormGroup;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.usuario = this.usuarioService.usuario; // Usuario Logueado

    this.forma = new FormGroup({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(7)]),
      newRetypedPassword: new FormControl(null, [Validators.required, Validators.minLength(7)])
    }, { validators: this.sonIguales( 'newPassword', 'newRetypedPassword' ) });
  }

  sonIguales( campo1: string, campo2: string ) {

    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

 // ==================================
  // Actualizacion Password
  // ==================================
  cambiarClaveUsuario() {
    if ( this.forma.invalid ) {
      Swal.fire('Importante', 'Debe completar todo el formulario', 'warning');
      return;
    }

    console.log('Forma Valida', this.forma.valid);
    console.log(this.forma.value);

    const usuarioCambioPassword: Usuario = {};
    usuarioCambioPassword.id = this.usuario.id;
    usuarioCambioPassword.newPassword = this.forma.value.newPassword;
    usuarioCambioPassword.newRetypedPassword = this.forma.value.newRetypedPassword;
    usuarioCambioPassword.oldPassword = this.forma.value.oldPassword;
    this.usuarioService.actualizarPasswordUsuario(usuarioCambioPassword)
      .subscribe( ( resp: any ) => {
        if ( resp ) {
          Swal.fire('Password Actualizada', this.usuario.fullName, 'success');
        }
      });

  }

  // ==================================
  // Actualizacion datos del usuario
  // ==================================
  guardar(usuario: Usuario) {
    console.log(usuario);

    this.usuario.fullName = usuario.fullName;
    this.usuario.email = usuario.email;

    this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe( ( resp: any ) => {
        if ( resp ) {
          Swal.fire('Usuario Actualizado', usuario.fullName, 'success');
        }
      });
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

  subirArchivo() {
    this.usuarioService.uploadImagen(this.archivoASubir, this.usuario.id)
      .then( (resp: any) => {
        if (resp.id !== undefined && resp.id > 0) {
          Swal.fire('Usuario Actualizado', this.usuario.fullName, 'success');
        }

      }).catch( (resp: any) => {
        Swal.fire('Error Actualizado Imagen', this.usuario.fullName, 'error');
    });
  }

}
