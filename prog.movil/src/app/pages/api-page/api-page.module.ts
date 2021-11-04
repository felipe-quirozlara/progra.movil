import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApiPagePageRoutingModule } from './api-page-routing.module';

import { ApiPagePage } from './api-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApiPagePageRoutingModule
  ],
  declarations: [ApiPagePage]
})
export class ApiPagePageModule {}
