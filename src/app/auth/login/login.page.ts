import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { delay, Subject, takeUntil, tap } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { StrapiService } from 'src/app/shared/services/strapi.service';
import { IReqAuthLogin } from 'src/app/shared/types/requests/ReqAuthLogin';
import { IErrorRes } from 'src/app/shared/types/responses/AuthError';
import { AuthActions } from 'src/app/store/auth.actions';
import { authFlow, AUTH_ROUTES } from '../navigation.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  public loginReq: IReqAuthLogin;
  user;
  public formGroup: UntypedFormGroup = new UntypedFormGroup({
    identifier: new UntypedFormControl('test@test.com', [
      Validators.required,
      Validators.email
    ]),
    password: new UntypedFormControl('Rwbento123!', [Validators.required])
  });

  public error: IErrorRes;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    protected authService: StrapiService,
    protected translate: TranslateService,
    private store: Store,
    private navigation: NavigationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Login for local registered users
   */
  public login(): void {
    const payload = {
      "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY3MjI5MjI2LCJleHAiOjE2Njk4MjEyMjZ9.sCQxad1qTwm4AXR8E_AS59_F2stT93Kip_fjAm6ts6I",
      "user": {
        "id": 7,
        "username": "test",
        "email": "test@test.com",
        "provider": "local",
        "confirmed": true,
        "blocked": false,
        "createdAt": "2022-10-22T06:51:20.245Z",
        "updatedAt": "2022-10-30T14:04:29.911Z",
        "address_1": "",
        "address_2": "",
        "city": "",
        "region_code": "reg_01GGFY0H7F9KE4JK1QRF8G4PGT",
        "country": "gb",
        "first_name": "",
        "last_name": "",
        "phone": "",
        "postal_code": "",
        "device_token": null
      }
    }

    // this.store.dispatch(new AuthActions.SetUser(payload));
    // .subscribe((state) => {
    //   console.log(state);
    //   // this.navigation.navigateForward('/home', 'forward');
    // });
    // this.navigation.navigateForward('/home', 'forward');
    this.loginReq = {
      identifier: this.formGroup.get('identifier')?.value,
      password: this.formGroup.get('password')?.value
    };
    // console.log(this.loginReq);
    this.authService
      .login(this.loginReq.identifier, this.loginReq.password)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap((user) => {
          // this.user = user;
        })).subscribe((res: any) => {
          this.user = res;
          console.log(res.user.id);
          this.store.dispatch(new AuthActions.SetIdToken(res.user.id, res.jwt))
            .pipe(
              delay(500),
              takeUntil(this.ngUnsubscribe),
              tap((user) => {
                // this.user = user;
              })).subscribe((state) => {
                console.log(state);
                // this.store.dispatch(new AuthActions.LoadUser(res.user.id));
                this.navigation.navigateForward('/home', 'forward');
              });
        });
  }
  resetPassword(): void {
    this.navigation.navigateForward(authFlow + AUTH_ROUTES.resetPassword, 'forward');
  }
  requestPassword(): void {
    this.navigation.navigateForward(authFlow + AUTH_ROUTES.requestPassword, 'forward');
  }
  back(): void {
    this.navigation.navControllerDefault('/home');
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
