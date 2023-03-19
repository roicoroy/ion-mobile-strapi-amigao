// eslint-disable-next-line @typescript-eslint/tslint/config
/* eslint-disable id-blacklist */

export const callCenterContacts = [{
    location: 'global.label.CallCentreLocation_INTL',
    number: '+41 844 00 44 55',
    tollFree: true
}, {
    location: 'global.label.CallCentreLocation_AU',
    number: '+61 3 9415 4291',
    tollFree: true
}, {
    location: 'global.label.CallCentreLocation_NZ',
    number: '+64 9488 8744',
    tollFree: true
}, {
    location: 'global.label.CallCentreLocation_CH',
    number: '+41 844 00 44 55',
    tollFree: true
}, {
    location: 'global.label.CallCentreLocation_UK',
    number: '+44 370 702 0189',
    tollFree: true
}, {
    location: 'global.label.CallCentreLocation_US',
    number: '+1 781 575 4534',
    tollFree: true
}];

/** Required date format for nevis payload. */
export const DATE_OF_BIRTH_NEVIS_FORMAT = 'dd-MM-yyyy';

/** State path to the ngxs forms at user identification */
export const USER_IDENTIFICATION_FORM_PATH = 'authState.userIdentification.form';

/** State path to the ngxs form at one time password */
export const ONE_TIME_PASSWORD_FORM_PATH = 'authState.oneTimePassword.form';

/** State path to the ngxs form at recover password */
export const RECOVER_PASSWORD_FORM_PATH = 'authState.recoverPassword.form';

/** Contains the backend API service name for the login flow calls */
export const AUTH_API_SERVICE = 'mobile';
