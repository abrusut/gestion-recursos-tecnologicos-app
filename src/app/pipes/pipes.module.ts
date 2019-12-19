import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DateCustomPipe } from './date.custom.pipe';
import { RoleGuardPipe } from './role-guard.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
    ImagenPipe,
    DateCustomPipe,
    RoleGuardPipe
  ],
  exports: [
    ImagenPipe,
    DateCustomPipe,
    RoleGuardPipe
  ]
})
export class PipesModule { }
