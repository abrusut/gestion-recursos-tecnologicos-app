import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/domain/usuario.domain';
import { environment } from '../../../environments/environment';
declare function init_plugins();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  usuario: Usuario;
  ministerio = environment.ATRIBUTE_MINISTERIO;
  sistema = environment.ATRIBUTE_SISTEMA_NAME;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    init_plugins();
  }

}
