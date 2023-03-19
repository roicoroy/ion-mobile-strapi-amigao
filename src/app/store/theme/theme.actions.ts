

export namespace ThemeActions {
    export class SetDarkMode {
        static readonly type = '[ThemeActions] Set Dark Mode';
        constructor(public payload: any) { }
    }
    export class GetDarkMode {
        static readonly type = '[ThemeActions] Get Dark Mode';
    }
}
