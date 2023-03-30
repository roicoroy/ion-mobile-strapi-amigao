import { AppReloadSource } from '../application/application.const';
import { IUser } from "../../shared/types/models/User";

export namespace AuthActions {
    export class GetUser {
        static readonly type = '[AuthActions] Get';
    }
    export class SetUser {
        static readonly type = '[AuthActions] Set user on state';
        constructor(public payload) { }
    }
    export class SetUploadedUser {
        static readonly type = '[AuthActions] Set uploaded User';
        constructor(public payload) { }
    }
    export class LogOutUser {
        static readonly type = '[AuthActions] Out';
    }
    export class PatchFormProfileFormStateWithSelectedRegion {
        static readonly type = '[AuthActions] Patch Profile form State with Selected Region';
        constructor(public selectedRegion: any) { }
    }
    export class UpdateStrapiUser {
        static readonly type = '[AuthActions] Update Strapi User';
        constructor(public userId?: string, public profileForm?: any) { }
    }
    export class SetIdToken {
        static readonly type = '[AuthActions] Set User Strapi Id and Token';
        constructor(public userId: string, public token: string) { }
    }
    export class LoadUser {
        static readonly type = '[AuthActions] Load User';
        constructor(public userId: string) { }
    }
}

export class SetLoginMode {
    public static readonly type = '[Auth] Set Login Mode';
    constructor(public payload: any) { };
}

export class SetUserIdAndEnvironment {
    public static readonly type = '[Auth] Set User Id And Environment';
    constructor(public userId?: string, public returningUser: boolean = false, public language?: any) { };
}

export class DoLogin {
    public static readonly type = '[Auth] Do Login';
    constructor(public ignoreCertificateCheck = false, public isFromChangePassword = false) { };
}

export class DoLogout {
    public static readonly type = '[Auth] Do Logout';
    constructor(public logoutSource?: AppReloadSource) { };
}

export class DoNevisLogout {
    public static readonly type = '[Auth] Do Nevis Logout';
    constructor() { };
}

export class UpdateAuthStatus {
    public static readonly type = '[Auth] Update Auth Status';
    constructor(public payload: boolean) { };
}

export class UpdateNevisAuthStatus {
    public static readonly type = '[Auth] Update Nevis Status';
    constructor(public payload: any) { };
}

export class RestartLogin {
    public static readonly type = '[Auth] Restart Login';
    constructor() { }
}

export class SetFPC {
    public static readonly type = '[Auth] Set FPC for Biometric';
    constructor(public payload: string) { };
}
