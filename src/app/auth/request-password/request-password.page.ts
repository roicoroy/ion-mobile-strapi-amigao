import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StrapiService } from 'src/app/shared/services/strapi/strapi.service';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.page.html',
  styleUrls: ['./request-password.page.scss'],
})
export class RequestPasswordPage {

  public formGroup: FormGroup = new UntypedFormGroup({
    username: new UntypedFormControl('roicoroy@yahoo.com.br', [Validators.required, Validators.email])
  });

  public error: any;

  constructor(
    protected cd: ChangeDetectorRef,
    protected router: Router,
    protected authService: StrapiService,
    protected translate: TranslateService
  ) { }

  public requestPasswordReset(): void {

    this.authService
      .requestPasswordReset(this.formGroup.value.username)
      .then(() => {
        this.formGroup.get('email')?.setValue('');
        this.router.navigateByUrl('home');
      })
      .catch((err: HttpErrorResponse) => {
        this.error = err.error;
      });
  }

}
