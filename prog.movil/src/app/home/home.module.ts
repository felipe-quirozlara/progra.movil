import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ExperienciaLaboralComponent } from '../experiencia-laboral/experiencia-laboral.component';
import { CertificacionesComponent } from '../certificaciones/certificaciones.component';
import { MisDatosComponent } from '../mis-datos/mis-datos.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // See: HomePageRoutingModule
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ExperienciaLaboralComponent,
    CertificacionesComponent,
    MisDatosComponent],
  entryComponents:[]
})
export class HomePageModule {}
