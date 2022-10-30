/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { IonStorageService } from './ionstorage.service';
import { AuthActions } from '../../store/auth.actions';
import { NavigationService } from './navigation.service';

@Injectable({
    providedIn: 'root'
})
export class AppAuthService {

    constructor(
        private iosStorage: IonStorageService,
        private store: Store,
        private navigation: NavigationService
    ) { }

    public async logout(): Promise<void> {
        this.iosStorage.storageRemove('token');
        this.iosStorage.storageRemove('user');
        this.store.dispatch(new AuthActions.LogOutUser());
        this.navigation.navigateForward('/auth/login', 'back');
    }
}
