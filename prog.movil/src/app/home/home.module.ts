import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MisDatosComponent } from '../mis-datos/mis-datos.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // See: HomePageRoutingModule
    HomePageRoutingModule,
    FormsModule
  ],
  declarations: [HomePage],
  entryComponents:[
    MisDatosComponent,
  ]
})
export class HomePageModule {}
