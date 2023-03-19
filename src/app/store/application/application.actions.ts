import { IApplicationStateModel } from './application.state';
import { AppReloadSource, AppActiveState } from './application.const';

/** Reload App action */
export class ReloadApp {
    /** To log the action for debugging */
    public static readonly type = '[Application] Reload App';
    constructor(public payload?: Partial<IApplicationStateModel>, public showSplashScreen?: boolean) { }
}

/** Set App Config Action */
export class SetAppReloadSource {
    /** To log the action for debugging */
    public static readonly type = '[Application] Set Application Source';
    constructor(public payload: AppReloadSource, public isFromLogin: boolean = false) { }
}

/** Set App Active State */
export class SetAppActiveState {
    /** To log the action for debugging */
    public static readonly type = '[Application] Set App Active State';
    constructor(public payload: AppActiveState) { }
}

/** Reset Session Timer Action */
export class ResetSessionTimer {
    /** To log the action for debugging */
    public static readonly type = '[Application] Reset Session Timer';
    constructor() { }
}

/** Open Platform Specific App Store */
export class UpgradeApp {
    /** To log the action for debugging */
    public static readonly type = '[Application] Upgrade App';
    constructor() { }
}

