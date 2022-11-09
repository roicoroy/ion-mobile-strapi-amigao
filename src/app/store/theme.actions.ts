
export namespace ThemeActions {
    export class GetTheme {
        static readonly type = '[ThemeActions] Get User';
    }
    export class SetTheme {
        static readonly type = '[ThemeActions] Set Theme on State';
        constructor(public payload) { }
    }
}
