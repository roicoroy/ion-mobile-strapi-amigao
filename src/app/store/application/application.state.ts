import { Platform } from '@ionic/angular';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ReloadApp, SetAppReloadSource, ResetSessionTimer, SetAppActiveState, UpgradeApp } from './application.actions';
import { AppReloadSource, AppActiveState, ONE_HOUR_IN_MILLISECONDS } from './application.const';
import { Injectable } from '@angular/core';
import { ShowSplashScreen } from '../splash-screen/splash-screen.actions';
import { ApplicationService } from 'src/app/shared/services/application/application.service';

export interface IApplicationStateModel {
    source: AppReloadSource;
    appActiveState: AppActiveState;
    sleepTime: Date;
    wakeTime: Date;
    backgroundTimeDuration: number;
}

@State<IApplicationStateModel>
    ({
        name: 'application',
        defaults: {
            source: AppReloadSource.NONE,
            appActiveState: AppActiveState.FOREGROUND,
            sleepTime: null,
            backgroundTimeDuration: null,
            wakeTime: null
        }
    })
@Injectable()
export class ApplicationState {

    constructor(
        private readonly appService: ApplicationService,
        private readonly platform: Platform
    ) { }

    @Selector()
    public static getState(state: IApplicationStateModel): IApplicationStateModel {
        return state;
    }

    @Selector()
    public static getAppActiveState(state: IApplicationStateModel): AppActiveState {
        return state.appActiveState;
    }

    @Selector()
    public static getBackgroundTimeDurationInHours(state: IApplicationStateModel): number {
        return state.backgroundTimeDuration == null
            ? null
            : Math.floor(state.backgroundTimeDuration / ONE_HOUR_IN_MILLISECONDS);
    }

    @Selector()
    public static getBackgroundTimeDuration(state: IApplicationStateModel): number {
        return state.backgroundTimeDuration;
    }

    @Action(ReloadApp)
    public reloadApp(ctx: StateContext<IApplicationStateModel>, action: ReloadApp): void {
        if (action.showSplashScreen) {
            ctx.dispatch(new ShowSplashScreen());
        }

        const appState = action.payload == null
            ? ctx.getState()
            : action.payload;

        this.appService.reloadApp(appState);
    }

    @Action(SetAppReloadSource)
    public setAppConfig(ctx: StateContext<IApplicationStateModel>, action: SetAppReloadSource): void {
        const source = action.payload;
        ctx.patchState({
            source
        });

        if (action.isFromLogin) {
            // if (source === AppReloadSource.TIMEOUT) {
            //     ctx.dispatch(new QueueAlert({
            //         id: 'app-starting-alert',
            //         headerNlsKey: 'global.title.InactivityTimeout',
            //         subheader: 'global.error.InactivityTimeout',
            //         actions: [ { textKey: 'global.button.Ok', action: ReloadedAppFromTimeoutAction } ],
            //         alertLevel: 'ERROR'
            //     }));
            // } else if (source === AppReloadSource.GENERAL_ERROR || source === AppReloadSource.LOGIN_ERROR) {
            //     ctx.dispatch(new QueueAlert({
            //         id: 'app-starting-alert',
            //         headerNlsKey: 'global.error.GenericAlertHeader',
            //         subheader: source === AppReloadSource.GENERAL_ERROR ? 'global.error.GeneralError' : 'global.error.ErrorInLogin',
            //         actions: [ { textKey: 'global.button.Ok', action: ReloadedAppFromLogoutAction } ],
            //         alertLevel: 'ERROR'
            //     }));
            // }
        }
    }

    @Action(SetAppActiveState)
    public setAppActiveState(ctx: StateContext<IApplicationStateModel>, action: SetAppActiveState): void {
        const today = new Date();
        let sleepTime = null;
        let wakeTime = null;
        let backgroundTime = null;

        if (action.payload === AppActiveState.BACKGROUND) {
            // app going in background
            sleepTime = today;
            wakeTime = null;
            backgroundTime = null;
        } else if (action.payload === AppActiveState.FOREGROUND) {
            // app coming into foreground / waking up
            const state = ctx.getState();
            sleepTime = null;
            wakeTime = today;
            backgroundTime = state.sleepTime != null ? (today.getTime() - state.sleepTime.getTime()) : null;
        }

        ctx.patchState({
            appActiveState: action.payload,
            sleepTime,
            wakeTime,
            backgroundTimeDuration: backgroundTime
        });
    }

    @Action(ResetSessionTimer)
    public resetSessionTimer(ctx: StateContext<IApplicationStateModel>, action: ResetSessionTimer): void {
        this.appService.resetSessionTimer();
    }

    @Action(UpgradeApp)
    public OpenStore(ctx: StateContext<IApplicationStateModel>, action: UpgradeApp): void {
        // based on platform choose a link
        // ctx.dispatch(new HandleExternalLinkRequest(this.platform.is('android') ? AppStoreLink.Android : AppStoreLink.iOS));
    }

}
