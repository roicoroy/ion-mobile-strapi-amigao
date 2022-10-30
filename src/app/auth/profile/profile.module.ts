import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { StrapiComponent } from './strapi/strapi.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { SettingsComponent } from './settings/settings.component';
import { ImagePickerComponent } from './strapi/image-picker/image-picker.component';
import { LanguageComponent } from 'src/app/shared/services/language/language-component/language.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
// import { ProfilePage } from './profile.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    NgxsStoragePluginModule,
    TranslateModule,
  ],
  declarations: [
    StrapiComponent,
    SettingsComponent,
    ImagePickerComponent,
    LanguageComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProfilePageModule { }
