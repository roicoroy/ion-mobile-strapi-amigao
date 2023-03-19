export const ReloadedAppFromTimeoutAction = 'reloaded-app-from-timeout';
export const ReloadedAppFromLogoutAction = 'reloaded-app-from-logout';
export const ONE_HOUR_IN_MILLISECONDS = 36e5; // 36e5 is the scientific notation for 60*60*1000

/** Reloaded application from. */
export enum AppReloadSource {
    /** App freshly started or none of the other option selected. */
    NONE = 'none',
    /** App reloaded due to logout. */
    LOGOUT = 'logout',
    /** App reloaded due to timeout. */
    TIMEOUT = 'timeout',
    /** App reloaded due to could not deserialize response and session had been killed. */
    GENERAL_ERROR = 'general-error',
    /** App reloaded due to could not deserialize response while login. */
    LOGIN_ERROR = 'login-error',
}

/** App's active state (whether the app is in the foreground or background) */
export enum AppActiveState {
    FOREGROUND = 'foreground',
    BACKGROUND = 'background'
}

/** Platform link to respective app store */
export enum AppStoreLink {
    iOS = 'https://itunes.apple.com/app/id951722877',
    Android = 'https://play.google.com/store/apps/details?id=com.equatex.mobile',
}
