import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../domain/usuario.domain';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2' ) });

    // Datos DUMMY
    this.forma.setValue({
      nombre: 'test',
      apellido: 'test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
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

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      Swal.fire('Importante', 'Debe aceptar condiciones', 'warning');
      console.log('Debe aceptar condiciones');
      return;
    }
    console.log('Forma Valida', this.forma.valid);
    console.log(this.forma.value);

    const usuario: Usuario = {};
    usuario.fullName = this.forma.value.nombre + ` ` + this.forma.value.apellido;
    usuario.email = this.forma.value.correo;
    usuario.password = this.forma.value.password;


    this.usuarioService.guardarUsuario(usuario)
      .subscribe( (resp: any) => {
        Swal.fire('Usuario Creado', usuario.email, 'success');
        this.router.navigate(['/login']);
      },
      error => {
        Swal.fire(error.error.mensaje, error.error.errors.message, 'error');
       }
     );


  }


}
