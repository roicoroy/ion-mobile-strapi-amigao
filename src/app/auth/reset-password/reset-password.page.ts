import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StrapiService } from 'src/app/shared/services/strapi.service';
import { IReqPasswordReset } from 'src/app/shared/types/requests/ReqPasswordReset';
import Validation from 'src/app/shared/utils/validation';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  private passwordResetReq: IReqPasswordReset;

  public formGroup: FormGroup = new UntypedFormGroup(
    {
      password: new UntypedFormControl('', [Validators.required]),
      passwordConfirmation: new UntypedFormControl('', [Validators.required]),
      code: new UntypedFormControl('', [Validators.required])
    },
    {
      validators: [Validation.match('password', 'passwordConfirmation')]
    }
  );

  public error: any;

  constructor(
    protected cd: ChangeDetectorRef,
    protected router: Router,
    protected route: ActivatedRoute,
    protected authService: StrapiService,
    protected translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      const code = this.route.snapshot.queryParamMap.get('code');

      if (code) {
        this.formGroup.get('code')?.setValue(code);
      } else {
        console.error('Reset token not found!');
      }
    });

    console.log(this.formGroup.value);
  }

  /**
   * Reset password
   */
  public resetPassword(): void {
    this.passwordResetReq = this.formGroup.value;

    this.authService
      .resetPassword(this.passwordResetReq)
      .then(() => {
        this.router.navigateByUrl('login');
      })
      .catch((err: HttpErrorResponse) => {
        this.error = err.error;
      });
  }

}
