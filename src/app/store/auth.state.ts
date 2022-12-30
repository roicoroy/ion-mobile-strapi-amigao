import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { IonStorageService } from '../shared/services/ionstorage.service';
import { AuthActions } from './auth.actions';
import { tap } from 'rxjs/operators';
import { StrapiService } from '../shared/services/strapi.service';

export class AuthStateModel {
    user: any;
    isLoggedIn: boolean;
    strapiProfileForm: {
        model?: any;
    };
    token: string;
    userId: string
}
@State<AuthStateModel>({
    name: 'authState',
    defaults: {
        user: null,
        isLoggedIn: null,
        strapiProfileForm: {
            model: null,
        },
        token: null,
        userId: null
    }
})
@Injectable()
export class AuthState {

    constructor(
        private dataService: StrapiService,
        private store: Store,
    ) { }

    @Selector()
    static getStrapiProfileForm(state: AuthStateModel) {
        return state.strapiProfileForm;
    }
    @Selector()
    static getUserState(state: AuthStateModel) {
        return state.user;
    }
    @Selector()
    static getIsLoggedIn(state: AuthStateModel) {
        console.log("state", state);

        return state.isLoggedIn;
    }
    @Action(AuthActions.GetUser)
    getUser({ getState, setState }: StateContext<AuthStateModel>) {
        const state = getState();
        setState({
            ...state,
        });
    }

    @Action(AuthActions.SetUser)
    setUser({ patchState, getState, setState }: StateContext<AuthStateModel>, { payload }: AuthActions.SetUser) {
        const state = getState();
        console.log("payload", payload);
        if (payload?.user?.id !== null) {
            this.dataService.loadUser(payload?.user?.id)
                .subscribe((result: any) => {
                    console.log("result", result);
                    patchState({
                        ...state,
                        user: result,
                        isLoggedIn: true
                    });
                });
        };
    }

    @Action(AuthActions.SetUploadedUser)
    setUploadedUser({ getState, patchState }: StateContext<AuthStateModel>, { payload }: AuthActions.SetUploadedUser) {
        const state = getState();
        console.log("payload", payload);
        if (payload?.id !== null) {
            this.dataService.loadUser(payload?.id)
                .subscribe((result: any) => {
                    // console.log("result", result);
                    patchState({
                        ...state,
                        user: result,
                        isLoggedIn: true
                    });
                });
        };
    }

    @Action(AuthActions.LoadUser)
    loadUser({ getState, patchState }: StateContext<AuthStateModel>, { userId }: AuthActions.LoadUser) {
        const state = getState();
        // console.log("payload", userId);
        if (userId !== null) {
            this.dataService.loadUser(userId)
                .subscribe((result: any) => {
                    // console.log("result", result);
                    patchState({
                        ...state,
                        user: result,
                        isLoggedIn: true
                    });
                });
        };
    }

    @Action(AuthActions.SetIdToken)
    setUserId({ patchState, getState, setState }: StateContext<AuthStateModel>, { userId, token }: AuthActions.SetIdToken) {
        const state = getState();
        console.log("payload", userId);
        if (userId) {
            console.log("payload", userId);
            patchState({
                ...state,
                userId: userId,
                token: token,
                isLoggedIn: true
            });
        };
    }

    @Action(AuthActions.LogOutUser)
    logOutUser({ getState, patchState }: StateContext<AuthStateModel>) {
        const state = getState();
        return patchState({
            user: null,
            strapiProfileForm: null,
            isLoggedIn: false,
            token: null
        });
    }

    @Action(AuthActions.UpdateStrapiUser)
    updateStrapiUser({ getState, patchState }: StateContext<AuthStateModel>, { userId, profileForm }: AuthActions.UpdateStrapiUser) {
        const state = getState();
        return this.dataService.updateStrapiUserProfile(userId, profileForm)
            .pipe(tap((result: any) => {
                this.store.dispatch(new AuthActions.LoadUser(userId)).subscribe((state) => {
                    patchState({
                        user: state.authState.user,
                        isLoggedIn: true
                    });
                });
            }
            ));
    }

    @Action(AuthActions.PatchFormProfileFormStateWithSelectedRegion)
    patchFormProfileFormStateWithSelectedRegion({ getState, patchState }: StateContext<AuthStateModel>, { selectedRegion }: AuthActions.PatchFormProfileFormStateWithSelectedRegion) {
        const state = getState();
        if (selectedRegion) {
            patchState({
                ...state,
                strapiProfileForm: {
                    model: {
                        country_code: selectedRegion,
                    }
                }
            });
        }
    }
}
