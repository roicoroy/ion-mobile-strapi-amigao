import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonStorageService } from '../services/storage/ionstorage.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StrapiAuthInterceptor implements HttpInterceptor {
    tokenObservable: any;
    message: any = 'error message';
    constructor(
        private storage: IonStorageService,
        public toastController: ToastController,
        private router: Router
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        return this.storage.getKeyAsObservable('token').pipe(
            mergeMap(token => {
                const clonedReq = this.addToken(request, token);
                return next.handle(clonedReq) || null;
            }),
            catchError((response: HttpErrorResponse) => throwError(response))
        );
    }
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            // console.log(token);
            const clone: HttpRequest<any> = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }
        // if (!token) {
        //     this.router.navigateByUrl('/auth/login');
        // }
        return request;
    }
}
