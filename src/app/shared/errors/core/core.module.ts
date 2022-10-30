import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { StrapiAuthInterceptor } from '../../strapi.interceptor';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { HttpLoadingInterceptor } from './errors/http-loading.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: StrapiAuthInterceptor,
    //   multi: true
    // },
  ],
})
export class CoreModule {}
