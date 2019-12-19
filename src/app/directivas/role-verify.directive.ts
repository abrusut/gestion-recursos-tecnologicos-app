import { Directive, OnInit, ElementRef, Input, HostListener } from '@angular/core';
import { SecurityService } from '../services/guards/security.service';
import { UsuarioService } from '../services/service.index';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Directive({
  selector: '[appRoleVerify]'
})
export class RoleVerifyDirective implements OnInit  {

  @Input('appRoleVerify') role: string;

  constructor(private el: ElementRef, private securityService: SecurityService,
              private usuarioService: UsuarioService, public router: Router) {
  }

  ngOnInit() {
    if (this.role === undefined) {
      console.log(`Debe configurar un role en el uso de la directiva appRoleVerify`);
    }
    if (!this.securityService.hasRole(this.role)) {
      this.el.nativeElement.style.display = 'none';
    }
  }

  @HostListener('click') onMouseClick() {
    if (!this.securityService.hasRole(this.role)) {
      console.log('Bloqueado por appRoleVerify');
      Swal.fire(this.usuarioService.usuario.fullName, `Usted ${this.usuarioService.usuario.fullName} no cuenta con los
      permisos adecuados para acceder a esta seccion`, 'error');
      this.router.navigate(['/']);
    }
  }

}
