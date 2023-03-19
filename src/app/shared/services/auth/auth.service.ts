/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { NavigationService } from '../navigation/navigation.service';

@Injectable({
    providedIn: 'root'
})
export class AppAuthService {

    constructor(
        private store: Store,
        private navigation: NavigationService
    ) { }

    public async logout(): Promise<void> {
        this.store.dispatch(new AuthActions.LogOutUser());
        this.navigation.navigateFlip('/home');
    }
}
