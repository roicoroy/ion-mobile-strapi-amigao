import { State, Action, Selector, StateContext } from '@ngxs/store';
import { UpdateFormattingPreference, UpdateUser } from './user.actions';
import { Injectable } from '@angular/core';

export interface ISessionUser {
    companyId: any,
    companyShortId: any,
    companyName: any,
    admin: any,
    formattingLocale: any,
    translationLocale: any,
    oldPasswordRequired: any,
    fpc: any,
    participant: any,
    reportingCurrency: any,
    surveyGroup: any,
    companyCss: any,
}


@State<ISessionUser>({
    name: 'user',
    defaults: {
        companyId: '',
        companyShortId: '',
        companyName: '',
        admin: null,
        formattingLocale: 'en-GB',
        translationLocale: '',
        oldPasswordRequired: false,
        fpc: '',
        participant: null,
        reportingCurrency: null,
        surveyGroup: null,
        companyCss: null
    }
})
@Injectable()
export class UserState {
    @Selector()
    public static getState(state: ISessionUser): ISessionUser {
        return state;
    }

    @Selector()
    public static getParticipant(state: ISessionUser): any {
        return state.participant;
    }

    @Selector()
    public static getReportingCurrency(state: ISessionUser): any {
        return state.reportingCurrency;
    }

    @Selector()
    public static getFormattingLocale(state: ISessionUser): string {
        return state.formattingLocale;
    }

    @Selector()
    public static getBrowserSupportedFormattingLocale(state: ISessionUser): string {
        const locale = state.formattingLocale?.split('-').splice(0, 2);

        return locale.join('-');
    }

    @Selector()
    public static getUserSecret(state: ISessionUser): string {
        return state.fpc;
    }

    @Action(UpdateUser)
    public updateUserFromBoot(ctx: StateContext<ISessionUser>, action: UpdateUser): void {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            companyId: action.payload.companyId,
        });
    }

    @Action(UpdateFormattingPreference)
    public updateFormattingPreference(ctx: StateContext<ISessionUser>, action: UpdateFormattingPreference): void {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            formattingLocale: action.payload
        });
    }
}
