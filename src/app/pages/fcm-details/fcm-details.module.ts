import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FcmDetailsPageRoutingModule } from './fcm-details-routing.module';

import { FcmDetailsPage } from './fcm-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FcmDetailsPageRoutingModule
  ],
  declarations: [FcmDetailsPage]
})
export class FcmDetailsPageModule {}
