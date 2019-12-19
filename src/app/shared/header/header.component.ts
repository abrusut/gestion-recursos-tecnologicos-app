import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import {Usuario} from '../../domain/usuario.domain';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }
}
