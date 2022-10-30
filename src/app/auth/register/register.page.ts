import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { IonStorageService } from 'src/app/shared/services/ionstorage.service';
import { StrapiService } from 'src/app/shared/services/strapi.service';
import { IReqAuthRegister } from 'src/app/shared/types/requests/ReqAuthRegister';
import { IErrorRes } from 'src/app/shared/types/responses/AuthError';
import Validation from 'src/app/shared/utils/validation';
import { AuthActions } from 'src/app/store/auth.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerReq: IReqAuthRegister;
  public formGroup: UntypedFormGroup = new UntypedFormGroup({
    first_name: new UntypedFormControl('first_name', [Validators.required]),
    last_name: new UntypedFormControl('last_name', [Validators.required]),
    email: new UntypedFormControl('test@test.com', [
      Validators.required,
      Validators.email
    ]),
    username: new UntypedFormControl('test', [Validators.required]),
    phone: new UntypedFormControl('123456789', [Validators.required]),
    password: new UntypedFormControl('Rwbento123!', [Validators.required]),
    passwordConfirmation: new UntypedFormControl('Rwbento123!', [Validators.required])
  },
    {
      validators: [Validation.match('password', 'passwordConfirmation')]
    }
  );

  public error: IErrorRes;

  constructor(
    protected router: Router,
    protected authService: StrapiService,
    protected translate: TranslateService,
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  public register(): void {
    this.registerReq = this.formGroup.value;
    this.authService
      .register(this.registerReq)
      .subscribe((res: any) => {
        console.log(res);
        this.router.navigateByUrl('/home').then(() => {
          this.store.dispatch(new AuthActions.SetUser(res.user)).subscribe((state) => {
          });
        });
      })
  }
}
