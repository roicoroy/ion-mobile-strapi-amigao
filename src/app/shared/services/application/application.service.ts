import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SetAppReloadSource } from 'src/app/store/application/application.actions';
import { AppActiveState, AppReloadSource } from 'src/app/store/application/application.const';
import { IApplicationStateModel } from 'src/app/store/application/application.state';

import { NativeAppService } from '../native/native-app/native-app.service';
@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    private sessionTimeout = 600;
    private timerSubscription: Subscription;
    private sessionTimerStarted: Date = null;

    constructor(
        private readonly store: Store,
        private readonly nativeAppService: NativeAppService
    ) {
        this.nativeAppService.appStateChange.subscribe((activeState) => {
            if (activeState === AppActiveState.FOREGROUND) {
                this.calculateAndValidateSessionTime(this.sessionTimerStarted, new Date());
            }
        });
    }

    reloadApp(appState: Partial<IApplicationStateModel>): void {
        if (appState == null) { return; }

        this.clearSessionTimeout();
        window.location.href = this.getReturnUrl(appState.source);
    }

    getReturnUrl(source: AppReloadSource): string {
        return source === AppReloadSource.NONE
            ? `?source=${AppReloadSource.LOGOUT}`
            : `?source=${source}`;
    }

    /** To reset session timeout timer. */
    resetSessionTimer(): void {
        // if (!environment.considerSessionTimer) { return; }
        // this.logService.Info('Reset session timer.');
        // if (this.timerSubscription != null) {
        //     this.timerSubscription.unsubscribe();
        // }
        // this.sessionTimeout = this.store.selectSnapshot(ConfigState.getState).sessionTimeout / 1000;
        // this.sessionTimerStarted = new Date();

        // this.timerSubscription = interval(1000)
        //     .pipe(
        //         take(this.sessionTimeout)
        //     )
        //     .subscribe(counter => {
        //         this.calculateAndValidateSessionTime(this.sessionTimerStarted, new Date(), counter >= (this.sessionTimeout - 2));
        //     });
    }


    /** Reset app source */
    resetAppReloadSource(): void {
        this.store.dispatch(new SetAppReloadSource(AppReloadSource.NONE));
    }

    /** Clear session timeout. */
    private clearSessionTimeout(): void {
        // this.logService.Info('Clearing timeout.');
        if (this.timerSubscription != null) {
            this.timerSubscription.unsubscribe();
        }
        this.sessionTimeout = 600;
        this.sessionTimerStarted = null;
    }
    private calculateAndValidateSessionTime(start: Date, end: Date, forceTimeout = false): void {
        if (start == null || end == null) { return; }

        const gap = Math.round((end.getTime() - start.getTime()) / 1000);
        if ((gap >= (this.sessionTimeout - 1)) || forceTimeout) {
            this.logoutAndSetAppConfig();
        }
    }

    private logoutAndSetAppConfig(): void {
        // if (this.store.selectSnapshot(AuthState.isLoggedIn)) {
        //     this.store.dispatch(new DoLogout(AppReloadSource.TIMEOUT));
        // }
    }
}
