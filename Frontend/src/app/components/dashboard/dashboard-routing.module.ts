import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from './medicos/medicos.component';
import { DashboardComponent } from './dashboard.component';
import { PerfilMedicoComponent } from './perfil-medico/perfil-medico.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { Role } from 'src/app/shared/models/role';
import { PacientesComponent } from './pacientes/pacientes.component';
import { Error403Component } from './error403/error403.component';
import { ChangePasswComponent } from './change-passw/change-passw.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', component: PerfilMedicoComponent},
    {path: 'error403', component: Error403Component},
    {path: 'passw', component: ChangePasswComponent, canActivate: [AuthGuard]},
    {path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard], data: {roles:[Role.Medico]}},
    {path: 'medicos', component: MedicosComponent, canActivate: [AuthGuard], data: {roles:[Role.Admin]}}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
