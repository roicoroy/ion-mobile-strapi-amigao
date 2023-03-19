import { Component, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppFacade } from './app-facade';
import { AppAuthService } from './shared/services/auth/auth.service';
import { IonLanguageService } from './shared/services/language/language.service';
import { NavigationService } from './shared/services/navigation/navigation.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './shared/services/theme/theme-settings.service';

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
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private theme: ThemeService,
  ) {
    this.initApp();
  }
  async initApp() {
    this.platform.ready().then(() => {
      this.theme.themeInit();
      this.ionLanguageService.initTranslate();
      this.viewState$ = this.facade.viewState$;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
