import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FcmDetailsPage } from './fcm-details.page';

const routes: Routes = [
  {
    path: '',
    component: FcmDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FcmDetailsPageRoutingModule {}
