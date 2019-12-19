import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService  } from '../../services/service.index';
import {Usuario} from '../../domain/usuario.domain';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarService: SidebarService,
              public usuarioService: UsuarioService) { }

  ATRIBUTE_MINISTERIO = environment.ATRIBUTE_MINISTERIO;
  ATRIBUTE_SISTEMA_NAME = environment.ATRIBUTE_SISTEMA_NAME;

  usuario: Usuario;

  navbarOpen = false;

  toggleNavbar () {
    this.navbarOpen =! this.navbarOpen;
  }
  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.sidebarService.cargarMenu();
  }

}
