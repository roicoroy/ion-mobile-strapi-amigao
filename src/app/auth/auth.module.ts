// import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { HttpClient } from '@angular/common/http';
// import { NgxsFormPluginModule } from '@ngxs/form-plugin';
// import { NgxsModule } from '@ngxs/store';
// import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NgxStripeModule } from 'ngx-stripe';
// // import { LoginComponent } from './login/login.component';

import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { NgxsModule } from "@ngxs/store";
import { environment } from "src/environments/environment";
import { createTranslateLoader } from '../app.module';
import { AuthPageRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    TranslateModule,
    NgxsModule,
    NgxsFormPluginModule,
    NgxsStoragePluginModule
  ],
  exports: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AuthModule { }


