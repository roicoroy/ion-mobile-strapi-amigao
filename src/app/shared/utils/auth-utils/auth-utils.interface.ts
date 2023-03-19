/** Nevis authentication codes. */
export enum NevisAuthCode {
    /** Login failed. */
    LOGIN_FAILED = 'LOGIN_FAILED',

    /** Authentication failed. */
    AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',

    /** Account is temporarily locked. */
    ACCOUNT_TEMP_LOCKED = 'ACCOUNT_TEMP_LOCKED',

    /** Login succeeded, but a new password is required now. */
    NEEDS_NEW_PASSWORD = 'NEEDS_NEW_PASSWORD',

    /** An unhandled error happened. */
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',

    /** Requires to verify one time password. */
    EMAIL_CODE_INPUT_REQUIRED = 'EMAIL_CODE_INPUT_REQUIRED',

    /** TwoFA is not enabled and CCP value is EMAIL_OTP for forgot password flow. */
    TWOFA_NOT_ENABLED = '2FA_NOT_ENABLED',

    /** TwoFA is not enabled and CCP value is PASSWORD_LETTER for forgot password flow. */
    TWOFA_REC_FAILED_MISSING_MOBILE_NUMBER = '2FA_REC_FAILED_MISSING_MOBILE_NUMBER',

    /** Requires 2-factor authentication flow. */
    SMS_CODE_INPUT_REQUIRED = 'SMS_CODE_INPUT_REQUIRED',

    /** Requires the 2-factor challenge to be provided. */
    ENTER_OTP_CODE = 'ENTER_OTP_CODE',

    /** Operation not allowed because the user is not authenticated. */
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',

    /** Wrong 2FA code inserted. */
    MTAN_WRONG_CODE = 'MTAN_WRONG_CODE',

    /** Wrong 2FA code due to it being expired. */
    MTAN_OUTDATED = 'MTAN_OUTDATED',

    /** Maximum limit of code requests crossed. Does not matter via which channel code was requested (SMS / CALL). */
    TOO_MANY_SMS_SENT = 'TOO_MANY_SMS_SENT',

    /** Password letter already requested. */
    PASSWORD_LETTER_ALREADY_REQUESTED = 'PASSWORD_LETTER_ALREADY_REQUESTED',

    /** Password letter request not successful */
    FAILED_TO_GET_PASSWORD_LETTER = 'FAILED_TO_GET_PASSWORD_LETTER',

    /** Failed to send an OTP */
    SMS_SEND_ERROR = 'SMS_SEND_ERROR',

    /** Failed to set new password due to password policy failure */
    POLICY_VIOLATED = 'POLICY_VIOLATED',

    /** Requires identity challenge questionnaire */
    QUESTION = 'QUESTION',

    /** Wrong answer for identity question */
    USER_ANSWER_RETRY = 'USER_ANSWER_RETRY',

    /** User reached limit for maximum answer verification for identity question */
    USER_ANSWER_FAILED = 'USER_ANSWER_FAILED',

    /** System can not identify question */
    USER_QUESTION_UNAVAILABLE = 'USER_QUESTION_UNAVAILABLE'
}

/** Nevis authentication active status. */
export enum NevisAuthStatus {
    /** User authenticated successfully. Session is being generated for user. */
    AUTHENTICATED = 'AUTHENTICATED',
    /** User is not authenticated yet. */
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    /** Requires identity challenge questionnaire */
    IDENTITY_QUESTIONNAIRE_REQUIRED = 'IDENTITY_QUESTIONNAIRE_REQUIRED',
    /** One time  password required. */
    ONE_TIME_PASSWORD_REQUIRED = 'ONE_TIME_PASSWORD_REQUIRED',
    /** Request password letter. */
    REQUEST_PASSWORD_LETTER = 'REQUEST_PASSWORD_LETTER',
    /** Two factor authentication required. */
    TWO_FACTOR_AUTHENTICATION_REQUIRED = 'TWO_FACTOR_AUTHENTICATION_REQUIRED',
    /** New password required. */
    NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED',
    /** New password required at recovery flow. */
    RECOVER_PASSWORD = 'RECOVER_PASSWORD',
    /** Send password letter requested successfully */
    SUCCESSFULLY_REQUESTED_PASSWORD_LETTER = 'SUCCESSFULLY_REQUESTED_PASSWORD_LETTER',
    /** Access to mobile app is not activated. */
    NON_ELIGIBLE_USER = 'NON_ELIGIBLE_USER',
    /** User needs to fill in tax form(s) */
    MISSING_TAX_FORMS = 'MISSING_TAX_FORMS',
    /** User needs to upgrade his app */
    FORCED_UPGRADE = 'FORCED_UPGRADE',
    /** Access to mobile app is activated and boot is complete */
    BOOT_COMPLETE = 'BOOT_COMPLETE'
}

/** Nevis authentication names. */
export enum NevisAuthName {
    /** Present phone number set for use with 2FA */
    MOBILE = 'mobile'
}

/** Nevis response status. */
export interface INevisAuth {
    name: string;

    type: string;

    /** Authorization value. */
    value: NevisAuthCode | string;

    /** Authorization text in English. */
    label: string;
}

/** A response from Nevis. */
export interface INevisLoginResponse {
    /** Nevis authorization codes. */
    auth: INevisAuth[];

    /** Information about the status of the service. */
    serviceStatus: {
        /** DEPRECATED: The CSRF token used in the old mobile services. */
        clientCSRFToken: string;
    };

    /** User should be immediately logged out. */
    forceLogoutUser: boolean;

    /** Any outstanding messages to display upon login?? */
    mobileAccessStatus: string;

    /** DEPRECATED: Information of the runtime of the old mobile services. */
    serverVersion: string[];
}

interface INevisBaseRequest {
    /** The originator of Nevis request. @example 'mobile' */
    originator: string;
}

/** Base request object for all mobile-only Nevis requests */
export interface INevisMobileRequest extends INevisBaseRequest {
    /** Higher app version. */
    mobileVersion: string;

    /** Unique build number to identify app on Play and App store. */
    mobileVersionBuild: number;

    /** User login without any prefixes. */
    isiwebuserid?: string;
}

/** Request object for Nevis Login request */
export interface INevisLoginRequest extends INevisMobileRequest {
    /** User password, if the authentication is taking place using login/password (no biometrics). */
    isiwebpasswd: string;

    /** User biometrics password, if the authentication is not taking place using login/password. */
    fpc: string;
}

/** Request object for Nevis user identification request */
export interface INevisVerifyIdentityRequest extends INevisMobileRequest {
    /** User email required for identification */
    email: string;

    /** Second user answer required for identification */
    userAnswer?: unknown;

    /** Optional action for the request, e.g. 'newcode' */
    result?: string;
}

/** Request object for Nevis OTP request */
export interface INevisOTPRequest extends INevisBaseRequest {
    /** Action to verify OTP. @example 'verify' */
    result: string;

    /** OTP code provided by the user */
    otpCode: string;
}

export interface INevisNewPasswordRequest extends INevisBaseRequest {
    /** Action to verify new password. @example 'verify' */
    result: string;

    /** New password provided by the user */
    // cspell:disable-next-line
    newpassword: string;
}
