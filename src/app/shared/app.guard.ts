import { Injectable, ViewChild } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  NavigationEnd,
  RouterEvent
} from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AuthState } from '../store/auth.state';
import { IonStorageService } from './services/ionstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanActivateChild {

  urlPath: any;

  isLoggedIn$: Observable<boolean[]>;

  constructor(
    private router: Router,
    private store: Store,
    private modalCtrl: ModalController
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthState();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthState();
  }

  checkAuthState(): boolean {

    this.router.events.subscribe((e: any) => {
      // console.log('e', e.route?.path);
      this.urlPath = e.route?.path;
    });

    const token = this.store.selectSnapshot<boolean>((state) => state.authState.isLoggedIn);
    console.log('token', token);
    // const authState = this.authService.isAuthenticated;
    // const authState = this.authService.isAuthenticated;
    this.isLoggedIn$ = this.store.select(state => state.autState.isLoggedIn);
    // console.log(this.isLoggedIn$);
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      console.log('isLoggedIn', isLoggedIn);
    });

    // if (!authState && !this.urlPath) {
    //   // console.log('this.urlPath', this.urlPath);
    //   this.router.navigateByUrl('/home');
    //   return false;
    // }
    // if (!authState && this.urlPath === 'product-list') {
    //   // console.log('this.urlPath', this.urlPath);
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
    // this.router.navigateByUrl('/shop/tabs/product-list');
    return true;
  }

  // async openModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: ModalExampleComponent,
  //   });
  //   modal.present();

  //   const { data, role } = await modal.onWillDismiss();

  //   if (role === 'confirm') {
  //     this.message = `Hello, ${data}!`;
  //   }
  // }
}
