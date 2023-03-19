
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { NavigationService } from '../services/navigation/navigation.service';
import { Observable } from 'rxjs';
import { UtilityService } from '../services/utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanActivateChild {

  urlPath: any;

  isLoggedIn$: Observable<boolean[]>;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private navigation: NavigationService,
    private store: Store,
    private utility: UtilityService
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

    this.isLoggedIn = this.store.selectSnapshot<boolean>((state) => state.strapiState.isLoggedIn);


    if (!this.isLoggedIn) {
      // console.log('isLoggedIn', this.isLoggedIn);
      this.utility.presentAlert('You need to Login first, please.').then((res) => {
        // console.log(res);
      });
      return false;
    }
    return true;
  }
}
