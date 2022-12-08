import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/home/rutas/info/info.component';
import { OdontologiaComponent } from './components/home/rutas/odontologia/odontologia.component';
import { OftalmologiaComponent } from './components/home/rutas/oftalmologia/oftalmologia.component';
import { PediatriaComponent } from './components/home/rutas/pediatria/pediatria.component';
import { PreguntasComponent } from './components/home/rutas/preguntas/preguntas.component';
import { PrivacidadComponent } from './components/home/rutas/privacidad/privacidad.component';
import { PsicologiaComponent } from './components/home/rutas/psicologia/psicologia.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: '', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'odontologia', component: OdontologiaComponent },
  { path: 'oftalmologia', component: OftalmologiaComponent },
  { path: 'pediatria', component: PediatriaComponent },
  { path: 'psicologia', component: PsicologiaComponent },
  { path: 'privacidad', component: PrivacidadComponent },
  { path: 'preguntas', component: PreguntasComponent },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)
  , canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
