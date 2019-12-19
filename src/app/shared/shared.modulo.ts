import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import {PipesModule} from '../pipes/pipes.module';
import {ModalUploadComponent} from '../components/modal-upload/modal-upload.component';
import { BreadcrumpngComponent } from './breadcrumpng/breadcrumpng.component';
import { CommonsAppModule } from '../commons/commons.app.module';

@NgModule({
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        ModalUploadComponent,
        BreadcrumpngComponent
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        ModalUploadComponent,
        BreadcrumpngComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        CommonsAppModule, // Modulos basicos (RouterModule,FormsModule,ReactiveFormsModule,HttpClientModule,etc)
    ]
})
export class SharedModule { }
