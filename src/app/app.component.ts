import { Component, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AppAuthService } from './shared/services/auth.service';
import { IonLanguageService } from './shared/services/language/language.service';
import { StrapiService } from './shared/services/strapi.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user;

  totalCheckoutValue = 104.00 || null;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
  ];

  constructor(
    private authService: AppAuthService,
    private ionLanguageService: IonLanguageService,
    public menu: MenuController,
    private store: Store
  ) {
    this.ionLanguageService.initTranslate();
    const user = this.store.selectSnapshot<boolean>((state) => state.authState.user);
    console.log('user', user);
    this.user = user;
  }
  checkout() {
    this.menu.toggle('end').then(() => {
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
