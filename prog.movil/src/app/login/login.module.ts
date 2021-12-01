import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    RouterTestingModule.withRoutes([
      {path: "", component: LoginPageModule}
    ]),
    RouterModule.forRoot([
      {path: "login", component: LoginPageModule}
    ]),
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
