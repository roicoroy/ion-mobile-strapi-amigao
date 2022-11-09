import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { IonStorageService } from '../shared/services/ionstorage.service';
import { AuthActions } from './auth.actions';
import { tap } from 'rxjs/operators';
import { StrapiService } from '../shared/services/strapi.service';
import { ThemeService } from '../shared/services/theme-settings.service';
import { ThemeActions } from './theme.actions';

export class ThemeStateModel {
    theme: any;
}
@State<ThemeStateModel>({
    name: 'themeState',
    defaults: {
        theme: null,
    }
})
@Injectable()
export class ThemeState {

    constructor(
        private themeService: ThemeService,
        private store: Store,
        private strapi: StrapiService,
    ) { }

    @Selector()
    static getStrapiProfileForm(state: ThemeStateModel) {
        return state.theme;
    }

    @Action(ThemeActions.GetTheme)
    getTheme({ patchState, getState, setState }: StateContext<ThemeStateModel>) {
        const state = getState();
        // console.log("payload", payload);
        this.strapi.getAppTheme()
            .pipe(tap((theme: any) => {
                console.log("result", theme);
                patchState({
                    ...state,
                    theme: theme,
                });
            }
            ));
    }

    @Action(ThemeActions.SetTheme)
    setTheme({ patchState, getState, setState }: StateContext<ThemeStateModel>, { payload }: ThemeActions.SetTheme) {
        const state = getState();
        console.log("payload", payload);
        if (payload?.user) {
            patchState({
                ...state,
                theme: payload,
            });
        };
    }

}
