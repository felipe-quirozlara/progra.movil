import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DBTaskService } from './services/dbtask.service';
import { AuthGardService } from './services/auth-gard.service';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    CommonModule,
    HttpClientModule,
    FormsModule,
    HttpClient,
    HttpClientTestingModule,
    RouterTestingModule,
    Storage,
    // SQLite
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // SQLite,
    DBTaskService,
    AuthGardService,
    AuthenticationService,
    Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
