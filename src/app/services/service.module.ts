import { NgModule, ModuleWithProviders } from '@angular/core';

import {SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        AdminGuard,
        LoginGuardGuard,
        VerificaTokenGuard,
        SubirArchivoService,
        ModalUploadService,
        CommonService,
        RouterExtService,
        TipoDocumentoService
} from './service.index';
import { ServiceConfig } from './serviceconfig';
import { SuperAdminGuard } from './guards/super.admin.guard';

@NgModule({})
export class ServiceModule {
    static forRoot(serviceConfig: ServiceConfig = {context: '', debug: false}): ModuleWithProviders {
        return {
            ngModule: ServiceModule,
            providers: [
                {provide: ServiceConfig, useValue: serviceConfig},
                SettingsService,
                SidebarService,
                SharedService,
                UsuarioService,
                LoginGuardGuard,
                AdminGuard,
                SuperAdminGuard,
                VerificaTokenGuard,
                SubirArchivoService,
                ModalUploadService,
                CommonService,
                RouterExtService,
                TipoDocumentoService

            ]
        };
    }
}
