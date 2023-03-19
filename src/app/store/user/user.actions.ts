
/** Set initial user information action. */
export class UpdateUser {
    public static readonly type = '[User] Update User';
    constructor(public payload: any) { }
}

/** Update user formatting preference in the state. */
export class UpdateFormattingPreference {
    public static readonly type = '[User] Update Formatting Preference';
    constructor(public payload: string) { }
}

export class AddSettings {
    public static readonly type = '[User] Add Settings';
    constructor(public payload: any) { }
}
