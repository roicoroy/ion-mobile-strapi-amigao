import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, MenuController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppAuthService } from '../shared/services/auth/auth.service';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { StrapiService } from '../shared/services/strapi/strapi.service';
import { UtilityService } from '../shared/services/utility/utility.service';

import { HomePageFacade } from './home-facade'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  video_cover: string;

  slideOpts = {
    slidesPerView: 1,
    initialSlide: 0,
    speed: 400,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  }
  viewState$: Observable<any>;
  collections: any;
  bannerImages: any;
  strapiCompanies: any;
  logo: string;

  userId: string;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    protected authService: AppAuthService,
    protected router: Router,
    private facade: HomePageFacade,
    private navigation: NavigationService,
    private utitity: UtilityService,
    private strapi: StrapiService,
    public menu: MenuController,
    public store: Store,
  ) { }

  ngOnInit() {
    // const userId = this.store.selectSnapshot<string>((state) => state.authState.userId);
    // this.store.dispatch(new AuthActions.LoadUser(userId));
  }

  getAppInfo() {
    // this.strapi.getAppInfo()
    //   .pipe(
    //     takeUntil(this.ngUnsubscribe),
    //   ).subscribe((info: any) => {
    //     this.logo = info.data.attributes.logo.data.attributes.url;
    //     this.bannerImages = info.data.attributes.slider.data;
    //     this.video_cover = info.data.attributes.video_cover.data.attributes.url;
    //   });
  }
  closeMenu() {
    this.menu.toggle();
  }
  enterShop() {
    this.router.navigateByUrl('shop/products-list');
  }
  authPage() {
    this.navigation.navigateForward('/auth/login');
  }
  profilePage() {
    this.navigation.navigateForward('/auth/profile/strapi');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
