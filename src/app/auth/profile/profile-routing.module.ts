import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { StrapiComponent } from './strapi/strapi.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'strapi',
        pathMatch: 'full'
      },
      {
        path: 'strapi',
        component: StrapiComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: '',
        redirectTo: '/strapi',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/strapi',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
