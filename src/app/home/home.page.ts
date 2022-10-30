import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, MenuController } from '@ionic/angular';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppAuthService } from '../shared/services/auth.service';
import { NavigationService } from '../shared/services/navigation.service';
import { StrapiService } from '../shared/services/strapi.service';
import { SettingsService } from '../shared/services/theme-settings.service';
import { UtilityService } from '../shared/services/utility.service';
import { HomePageFacade } from './home-facade';

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

  private readonly ngUnsubscribe = new Subject();

  constructor(
    protected authService: AppAuthService,
    protected router: Router,
    private facade: HomePageFacade,
    private navigation: NavigationService,
    private utitity: UtilityService,
    private strapi: StrapiService,
    private settings: SettingsService,
    public menu: MenuController,
  ) {
    this.viewState$ = this.facade.viewState$;
  }
  ngOnInit() {
    this.strapi.getAppTheme()
      .pipe(
        takeUntil(this.ngUnsubscribe),
      ).subscribe((theme: any) => {
        // console.log('theme', theme.data.attributes);
        this.settings.setTheme(theme.data.attributes);
      });
    this.getAppInfo();
    this.getTheme();
  }
  getTheme() {
    this.strapi.getAppTheme()
      .pipe(
        takeUntil(this.ngUnsubscribe),
      ).subscribe((companies: any) => {
        // console.log('companies', companies);
        this.strapiCompanies = companies.data;
      });
  }

  getAppInfo() {
    this.strapi.getAppInfo()
      .pipe(
        takeUntil(this.ngUnsubscribe),
      ).subscribe((info: any) => {
        this.logo = info.data.attributes.logo.data.attributes.url;
        this.bannerImages = info.data.attributes.slider.data;
        this.video_cover = info.data.attributes.video_cover.data.attributes.url;
      });
  }
  closeMenu() {
    this.menu.toggle();
  }
  profilePage() {
    this.router.navigateByUrl('profile');
  }
  enterShop() {
    this.router.navigateByUrl('shop/products-list');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
