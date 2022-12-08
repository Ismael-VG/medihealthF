import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialsModule } from 'src/app/shared/modules/materials.module';
import { DashboardComponent } from './dashboard.component';
import { PerfilMedicoComponent } from './perfil-medico/perfil-medico.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { Error403Component } from './error403/error403.component';
import { ChangePasswComponent } from './change-passw/change-passw.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { RefreshTokenInterceptor } from 'src/app/shared/helpers/refresh-token.interceptor';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MedicosComponent } from './medicos/medicos.component';
import { OrderModule } from 'ngx-order-pipe';
import { AppComponent } from 'src/app/app.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PerfilMedicoComponent,
    NavbarComponent,
    PacientesComponent,
    Error403Component,
    ChangePasswComponent,
    MedicosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    HttpClientModule,
    OrderModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi : true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class DashboardModule { 
  constructor (libreria : FaIconLibrary){
    libreria.addIconPacks(fas);
  }
}
