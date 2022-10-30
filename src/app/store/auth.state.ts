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
    token: string
}
@State<AuthStateModel>({
    name: 'authState',
    defaults: {
        user: null,
        isLoggedIn: null,
        strapiProfileForm: {
            model: null,
        },
        token: null
    }
})
@Injectable()
export class AuthState {

    constructor(
        private dataService: StrapiService,
        private ionStorageService: IonStorageService,
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
    setUser({ patchState, getState }: StateContext<AuthStateModel>, { payload }: AuthActions.SetUser) {
        const state = getState();
        if (payload?.user) {
            this.dataService.loadUser(payload.user?.id).subscribe((result: any) => {
                console.log("result", result);
                return patchState({
                    ...state,
                    user: result,
                    token: payload?.jwt,
                    isLoggedIn: true
                });
            });
        };
    }

    @Action(AuthActions.SetUploadedUser)
    setUploadedUser({ getState, patchState }: StateContext<AuthStateModel>, { payload }: AuthActions.SetUploadedUser) {
        const state = getState();
        if (payload?.user.id !== null) {
            this.dataService.loadUser(payload?.user.id)
                .pipe(tap((result: any) => {
                    patchState({
                        ...state,
                        user: result,
                        isLoggedIn: true
                    });
                    // this.ionStorageService.storageSet('user', result);
                }
                ));


            // .subscribe((result: any) => {
            //     this.ionStorageService.storageSet('user', result);
            //     patchState({
            //         user: result,
            //         token: payload?.jwt,
            //         isLoggedIn: true
            //     });
            // });
        };
    }
    @Action(AuthActions.LogOutUser)
    logOutUser({ getState, patchState }: StateContext<AuthStateModel>) {
        const state = getState();
        return patchState({
            user: null,
            strapiProfileForm: null,
            isLoggedIn: false
        });
    }

    @Action(AuthActions.AuthenticateMedusaUser)
    authenticateMedusaUser({ getState, patchState }: StateContext<AuthStateModel>, { payload }: AuthActions.AuthenticateMedusaUser) {
        const state = getState();
        console.log("payload", payload);
        // return this.medusaService.AuthenticateMedusaUser(payload)
        //     .pipe(tap((result: any) => {
        //         console.log(result);
        //         // patchState({
        //         //     ...state,
        //         //     user: result,
        //         //     isLoggedIn: true
        //         // });
        //     }
        //     ));
    }

    @Action(AuthActions.UpdateStrapiUser)
    updateStrapiUser({ getState, patchState }: StateContext<AuthStateModel>, { userId, profileForm }: AuthActions.UpdateStrapiUser) {
        const state = getState();
        return this.dataService.updateStrapiUserProfile(userId, profileForm)
            .pipe(tap((result: any) => {
                patchState({
                    ...state,
                    user: result,
                    isLoggedIn: true
                });
                this.ionStorageService.storageSet('user', result);
            }
            ));
    }
    @Action(AuthActions.PatchFormStateWithProfileAddress)
    patchFormStateWithProfileAddress({ getState, patchState }: StateContext<AuthStateModel>, { profileForm }: AuthActions.PatchFormStateWithProfileAddress) {
        const state = getState();
        return patchState({
            ...state,
            strapiProfileForm: {
                model: {
                    username: profileForm?.username,
                    email: profileForm?.email,
                    first_name: profileForm?.first_name,
                    last_name: profileForm?.last_name,
                    address_1: profileForm?.address_1,
                    address_2: profileForm?.address_2,
                    city: profileForm?.city,
                    region_code: profileForm?.country_code,
                    country: profileForm?.country,
                    phone: profileForm?.phone,
                    postal_code: profileForm?.postal_code,
                }
            }
        });
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
