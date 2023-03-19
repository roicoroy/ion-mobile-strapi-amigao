import { ShowOptions } from '@capacitor/splash-screen';


/** Show Splash Screen */
export class ShowSplashScreen {
    public static readonly type = '[SplashScreen] Show Splash Screen';
    constructor(public options?: ShowOptions) { }
}

/** Hide Splash Screen */
export class HideSplashScreen {
    public static readonly type = '[SplashScreen] Hide Splash Screen';
    constructor() { }
}
