declare const i18n: ILibPhoneNumber;
const PHONE_REMOVE_CHARACTER = /[+-/ /]/g;
const VALID_PHONE_NUMBER = /^[0-9+]+$/;

/**
 * Gets a international phone number prefix based on county code.
 * @param countryCode County code.
 * @return International call prefix
 */
export function getPhoneNumberPrefix(countryCode: string): string {
    const myi18n = i18n.phonenumbers.PhoneNumberUtil.getInstance();
    try {
        return countryCode == null
            ? ''
            : (`+${  myi18n.parse('0000000000', countryCode)
                .getCountryCode()
                .toString()}`);
    } catch (error) {
        return '';
    }
}

/**
 * Format the phone number.
 * @param phoneNumber Phone number.
 * @param phoneNumberPrefix International phone number prefix @example '+44' for Switzerland
 * @return Formatted phone number with international code prefix.
 */
export function formatPhoneNumber(phoneNumber: string | number, phoneNumberPrefix?: string): IFormattedPhoneNumber {
    const value = clearPhoneNumberFormatting(phoneNumber, phoneNumberPrefix);
    try {
        if (!isValidPhoneNumberRegex(value)) { throw new Error(PhoneNumberStatus.InValid); }

        const myi18n = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        const phoneNumberObj = myi18n.parse(value);
        const prefix = `+${  phoneNumberObj.getCountryCode().toString()}`;
        const formattedValue = myi18n.isValidNumber(phoneNumberObj)
            ? myi18n.format(phoneNumberObj, i18n.phonenumbers.PhoneNumberFormat.INTERNATIONAL)
                .substr(prefix.length + 1)
            : value.substr(prefix.length);
        const countryCode = !myi18n.isValidNumber(phoneNumberObj)
            ? null
            : myi18n.getRegionCodeForNumber(phoneNumberObj);

        return new FormattedPhoneNumber(value, formattedValue, prefix, countryCode);
    } catch (e) {
        return new FormattedPhoneNumber(value,
            phoneNumberPrefix == null || !value.startsWith(phoneNumberPrefix)
                ? value
                : value.substr(phoneNumberPrefix.length),
            phoneNumberPrefix, null);
    }
}

/**
 * To clear the phone number formatting.
 * @param phoneNumber Phone number.
 * @param phoneNumberPrefix International phone number prefix @example '+44' for Switzerland
 * @return Phone number without formatting.
 */
export function clearPhoneNumberFormatting(phoneNumber: string | number, phoneNumberPrefix?: string): string {
    let value: string = phoneNumber == null || phoneNumber.toString().trim().length === 0
        ? ''
        : phoneNumber.toString();

    value = value.substr(0, 2) === '00'
        ? `+${  value.substr(2)}`
        : value;

    return value.startsWith('+')
        ? value.substr(0, 1) + value.substr(1).replace(PHONE_REMOVE_CHARACTER, '')
        : phoneNumberPrefix == null
            ? value.replace(PHONE_REMOVE_CHARACTER, '')
            : phoneNumberPrefix + value.replace(PHONE_REMOVE_CHARACTER, '');
}

/**
 * Is valid phone number ?
 * @param phoneNumber Phone number.
 * @param phoneNumberPrefix International phone number prefix @example '+44' for Switzerland
 */
export function isValidPhoneNumber(phoneNumber: string | number, phoneNumberPrefix?: string): boolean {
    const value = clearPhoneNumberFormatting(phoneNumber, phoneNumberPrefix);
    if (!isValidPhoneNumberRegex(value)) { return false; }

    try {
        const myi18n = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        myi18n.parse(value);

        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Is known phone number ?
 * @param phoneNumber Phone number.
 * @param phoneNumberPrefix International phone number prefix @example '+44' for Switzerland
 */
export function isKnownPhoneNumber(phoneNumber: string | number, phoneNumberPrefix?: string): boolean {
    const value = clearPhoneNumberFormatting(phoneNumber, phoneNumberPrefix);
    if (!isValidPhoneNumberRegex(value)) { return false; }

    try {
        const myi18n = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        const phoneNumberObj = myi18n.parse(value);

        return myi18n.isValidNumber(phoneNumberObj);
    } catch (e) {
        return false;
    }
}

/**
 * Is premium rate phone number ?
 * @param phoneNumber Phone number.
 * @param phoneNumberPrefix International phone number prefix @example '+44' for Switzerland
 */
export function isPremiumRatePhoneNumber(phoneNumber: string | number, phoneNumberPrefix?: string): boolean {
    const value = clearPhoneNumberFormatting(phoneNumber, phoneNumberPrefix);
    if (!isValidPhoneNumberRegex(value)) { return false; }

    try {
        const myi18n = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        const phoneNumberObj = myi18n.parse(value);

        return !myi18n.isValidNumber(phoneNumberObj)
            ? false
            : myi18n.getNumberType(phoneNumberObj) === PhoneNumberType.PREMIUM_RATE;
    } catch (e) {
        return false;
    }
}

/**
 * Validate phone number
 * @param phoneNumber Phone number.
 * @param phoneNumberPrefix International phone number prefix @example '+44' for Switzerland
 * @return Validated phone number status.
 */
export function validatePhoneNumber(phoneNumber: string | number, phoneNumberPrefix?: string): PhoneNumberStatus {
    const value = clearPhoneNumberFormatting(phoneNumber, phoneNumberPrefix);
    if (!isValidPhoneNumberRegex(value)) { return PhoneNumberStatus.InValid; }

    try {
        const myi18n = i18n.phonenumbers.PhoneNumberUtil.getInstance();
        const phoneNumberObj = myi18n.parse(value);

        return !myi18n.isValidNumber(phoneNumberObj)
            ? PhoneNumberStatus.UnKnown
            : myi18n.getNumberType(phoneNumberObj) === PhoneNumberType.PREMIUM_RATE
                ? PhoneNumberStatus.Premium
                : PhoneNumberStatus.Valid;
    } catch (e) {
        return PhoneNumberStatus.InValid;
    }
}

/**
 * Gets a region code for phone number prefix.
 * @param phoneNumberPrefix International phone number prefix @example '+44' for Switzerland
 * @return County code.
 */
export function getRegionCodeForPhoneNumber(phoneNumberPrefix: string): string {
    try {
        if (phoneNumberPrefix == null) {
            return '';
        }
        const regionMap = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap;
        const prefix = phoneNumberPrefix.startsWith('+')
            ? parseInt(phoneNumberPrefix.substr(1), 10)
            : parseInt(phoneNumberPrefix, 10);

        return (regionMap == null || regionMap[prefix] == null || regionMap[prefix].length === 0)
            ? ''
            : regionMap[prefix][0];
    } catch (error) {
        return '';
    }
}

function isValidPhoneNumberRegex(phoneNumber: string): boolean {
    return VALID_PHONE_NUMBER.test(phoneNumber);
}

/**
 * The LibPhoneNumber library.
 * LibPhoneNumber is Google's common Java, C++ and JavaScript library for parsing, formatting, and validating international phone numbers.
 */
interface ILibPhoneNumber {
    phonenumbers: IPhoneNumbers;
}

/** The LibPhoneNumber util. */
interface IPhoneNumbers {
    PhoneNumberUtil: {
        getInstance(): ILibPhoneNumberObject;
    };
    PhoneNumberFormat: any;
    metadata: {
        countryCodeToRegionCodeMap: any;
        countryToMetadata: any;
    };
}

/** The Instance of LibPhoneNumber utils. */
interface ILibPhoneNumberObject {
    /** Parse the phone number. */
    parse(phoneNumber: string, countryCode?: string): any;
    /** Gets international phone number prefix. */
    getCountryCode(): string;
    /** Is valid phone number format ? */
    isValidNumber(phoneNumberObj: any): boolean;
    /** Format phoneNumber */
    format(phoneNumberObj: any, formate: any): string;
    /** Get the type of a phone number */
    getNumberType(phoneNumberObj: any): PhoneNumberType;
    /** Gets Country code for phoneNumber object. */
    getRegionCodeForNumber(phoneNumberObj: any): string;
}

enum PhoneNumberType {
    FIXED_LINE,
    MOBILE,
    FIXED_LINE_OR_MOBILE,
    TOLL_FREE,
    PREMIUM_RATE,
    SHARED_COST,
    VOIP,
    PERSONAL_NUMBER,
    PAGER,
    UAN,
    VOICEMAIL,
    UNKNOWN,
}

/** Formatted phone number details */
export interface IFormattedPhoneNumber {
    /** Actual phone number with international call prefix. */
    phoneNumber: string;
    /** Formatted phone number without international call prefix. */
    formattedNumber: string;
    /** International call prefix. */
    prefix: string;
    /** Country Code. It is only exist if phoneNumber isValid else will remain null. */
    countryCode: string;
}

class FormattedPhoneNumber implements IFormattedPhoneNumber {
    constructor(public readonly phoneNumber: string,
                public readonly formattedNumber: string,
                public readonly prefix: string,
                public readonly countryCode: string) {}
}

export enum PhoneNumberStatus {
    /** Valid phone number. */
    Valid = 'VALID',
    /** Phone number is not parsed by google library or invalid characters found in phone number. */
    InValid = 'INVALID',
    /** Phone number is not recognized by google library. Number can still be valid. */
    UnKnown = 'UNKNOWN',
    /** Phone number recognized by google library as premium number. */
    Premium = 'PREMIUM'
}
