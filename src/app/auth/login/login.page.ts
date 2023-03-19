import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { delay, Subject, takeUntil, tap } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation/navigation.service';
import { StrapiService } from 'src/app/shared/services/strapi/strapi.service';
import { IReqAuthLogin } from 'src/app/shared/types/requests/ReqAuthLogin';
import { IErrorRes } from 'src/app/shared/types/responses/AuthError';
import { AuthActions } from 'src/app/store/auth/auth.actions';
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
    this.loginReq = {
      identifier: this.formGroup.get('identifier')?.value,
      password: this.formGroup.get('password')?.value
    };
    this.authService
      .login(this.loginReq.identifier, this.loginReq.password)
      .pipe(
        takeUntil(this.ngUnsubscribe),
      ).subscribe((res: any) => {
        this.user = res;
        console.log(res);
        if (res) {
          this.store.dispatch(new AuthActions.SetIdToken(res?.user?.id, res?.jwt))
          this.store.dispatch(new AuthActions.SetUser(res));
          this.navigation.navigateForward('/home', 'forward');
        }
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
