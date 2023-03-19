import { NevisAuthStatus, INevisLoginResponse } from "src/app/shared/utils/auth-utils/auth-utils.interface";

/** The state definition of the auth. */
export interface IAuthStateModel {
    userId: string;
    fpc: string;
    loginMode: LoginMode;
    isLoggedIn: boolean;
    isLoading: boolean;
    userForm?: any;
    environment: string;
}

/** Login mode - login as a new user or as a returning user */
export enum LoginMode {
    NEW_USER = 'new-user',
    SAVED_USER = 'saved-user'
}

/** payload model required for changing user password */
export interface IChangePasswordModel {
    isiwebuserid: string;
    isiwebpasswd: string;
    isiwebnewpwd: string;
}

/** Parsed user ID object with user ID and environment split */
export interface IParsedUserId {
    id: string;
    environment: any;
}

/** WebApi post/get controller-action pair */
export interface IControllerAction {
    controller: string;
    action: string;
}

/** Contains all backend API actions required for the login flow calls */
export enum AUTH_API_ACTION {
    LOGIN = '?login&originator=mobile',
    LOGOUT = 'logout',
    CHANGE_PASSWORD = 'changePw?dummy=1',
    RECOVER_PASSWORD = 'recoverPw?login&originator=mobile',
    RECOVER_PASSWORD_QUESTION = 'recoverPw?login&originator=mobile&language=',
    TWO_FACTOR_AUTHENTICATION = 'twoFactorChannel?login&originator=mobile',
    REQUEST_PASSWORD_LETTER = 'requestPwdl?login&originator=mobile',
    FORGOT_PASSWORD = 'forgotPw?login&originator=mobile'
}
