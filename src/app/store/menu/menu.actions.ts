export class UpdateMenuStatus {
    public static readonly type = '[Menu] Update Menu Status';
    constructor(public isOpen: boolean) { }
}
