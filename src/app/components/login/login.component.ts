import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService, CommonService } from '../../services/service.index';
import { Usuario } from '../../domain/usuario.domain';
import { UserLogin } from '../../domain/userLogin.domain';
import { environment } from '../../../environments/environment';

import Swal from 'sweetalert2';
import { Exception } from 'src/app/domain/exception.domain';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ATRIBUTE_MINISTERIO = environment.ATRIBUTE_MINISTERIO;
  ATRIBUTE_SISTEMA_NAME = environment.ATRIBUTE_SISTEMA_NAME;

  username: string = '';
  userLogin: UserLogin = {};
  recuerdame: boolean = false;
  auth2: any;
  error: any = null;

  constructor(public router: Router, public commonService: CommonService,
              public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.username = localStorage.getItem('user') || '';
    if ( this.username.length > 0) // Si tengo algo en localStorage es por que ya se logueo y puso recordar
    {
      this.recuerdame = true;
    }
  }


  ingresar(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }
    console.log('Forma valida', forma.valid);
    console.log('Forma', forma.value);

    this.userLogin.username = forma.value.username;
    this.userLogin.password = forma.value.password;

    this.usuarioService.login(this.userLogin, forma.value.recuerdame)
      .subscribe( ( loginCorrecto: any ) => {
        console.log(loginCorrecto);
        this.router.navigate(['/dashboard']);

      },
        error => {
          const exception: Exception
              =  this.commonService.handlerError(error);
          Swal.fire(exception.title, exception.body, 'error');
        }
      );
  }
}
