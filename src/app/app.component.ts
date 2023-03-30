import { Component, NgZone, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppFacade } from './app-facade';
import { AppAuthService } from './shared/services/auth/auth.service';
import { IonLanguageService } from './shared/services/language/language.service';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { Platform } from '@ionic/angular';
import { ThemeService } from './shared/services/theme/theme-settings.service';
import { FcmService } from './shared/services/fcm/fcm.serivce';
import { NativeAppService } from './shared/services/native/native-app/native-app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  viewState$: Observable<any>;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
  ];

  constructor(
    private authService: AppAuthService,
    private ionLanguageService: IonLanguageService,
    public menu: MenuController,
    private navigation: NavigationService,
    private facade: AppFacade,
    private platform: Platform,
    private theme: ThemeService,
    private fcm: FcmService,
    private zone: NgZone,
    private native: NativeAppService
  ) {
    this.initApp();
  }
  async initApp() {
    this.platform.ready().then(async () => {
      const device = await this.native.getDeviceInfo();

      this.viewState$ = this.facade.viewState$;
      this.theme.themeInit();
      this.ionLanguageService.initTranslate();

      if (device.platform == 'web') {

      }
      if (device.platform === 'android' || device.platform === 'ios') {
        (await this.native.initNative()).appUrlOpen;
        await this.fcm.initListerners();
      }
    }).catch(e => {
      throw e;
    });;
  }
  logout(): void {
    this.authService.logout();
  }
  profilePage() {
    this.navigation.navigateFlip('/auth/profile/strapi');
  }
  loginPage() {
    this.navigation.navigateFlip('/auth/login');
  }
}
