import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './shared/modules/materials.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/home/rutas/info/info.component';
import { OdontologiaComponent } from './components/home/rutas/odontologia/odontologia.component';
import { OftalmologiaComponent } from './components/home/rutas/oftalmologia/oftalmologia.component';
import { PediatriaComponent } from './components/home/rutas/pediatria/pediatria.component';
import { PreguntasComponent } from './components/home/rutas/preguntas/preguntas.component';
import { PrivacidadComponent } from './components/home/rutas/privacidad/privacidad.component';
import { PsicologiaComponent } from './components/home/rutas/psicologia/psicologia.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InfoComponent,
    OdontologiaComponent,
    OftalmologiaComponent,
    PediatriaComponent,
    PreguntasComponent,
    PrivacidadComponent,
    PsicologiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
