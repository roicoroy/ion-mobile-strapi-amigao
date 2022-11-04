import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppFacade } from './app-facade';
import { AppAuthService } from './shared/services/auth.service';
import { IonLanguageService } from './shared/services/language/language.service';
import { NavigationService } from './shared/services/navigation.service';
import { FcmService } from './shared/services/strapi-fcm.serivce';
import { StrapiService } from './shared/services/strapi.service';
import { AuthStateModel } from './store/auth.state';
import {
  PushNotifications,
  Token,
  PushNotification,
  PushNotificationActionPerformed,
  PushNotificationToken,
} from '@capacitor/push-notifications';

// import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  viewState$: Observable<any>;

  user;
  avatar: string;
  email: string;

  totalCheckoutValue = 104.00 || null;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
  ];

  constructor(
    private authService: AppAuthService,
    private ionLanguageService: IonLanguageService,
    public menu: MenuController,
    private store: Store,
    private navigation: NavigationService,
    private router: Router,
    private facade: AppFacade,
    private alertCtrl: AlertController,
    private fcmService: FcmService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {

    // this.fcmService.initPush();

    this.ionLanguageService.initTranslate();

    this.viewState$ = this.facade.viewState$;
    this.viewState$.subscribe((state) => {
      // console.log(state);s
      this.user = state.userState;
      this.avatar = state.userState?.avatar?.url;
      this.email = state.userState?.email;
      // console.log('user', this.user, this.avatar);
    });

    // this.user = this.store.selectSnapshot<AuthStateModel>((state) => state.authState.user);
    // console.log('user', this.user);

    this.initApp();
  }

  async initApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByName('green');
      this.splashScreen.hide();
    });
    // await SplashScreen.hide();

    // // Show the splash for an indefinite amount of time:
    // await SplashScreen.show({
    //   autoHide: false,
    // });

    // // Show the splash for two seconds and then automatically hide it:
    // await SplashScreen.show({
    //   showDuration: 2000,
    //   autoHide: true,
    //   // backgroundColor: "#FF5722"
    // });
    // await SplashScreen. 
  }


  checkout() {
    this.menu.toggle('end').then(() => {
    });
  }
  logout(): void {
    this.authService.logout();
  }
  profilePage() {
    this.navigation.navigateFlip('/auth/profile/strapi');
  }
  loginPage() {
    this.navigation.navigateFlip('/auth/login');
    // this.router.navigateByUrl('/auth/login');
  }
}
