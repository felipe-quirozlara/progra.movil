import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiPagePageRoutingModule } from './api-page-routing.module';

import { ApiPagePage } from './api-page.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiPagePageRoutingModule,
    HttpClientModule,
    HttpClientTestingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [ApiPagePage]
})
export class ApiPagePageModule {}
