// import { Injectable } from '@angular/core';
// import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
// import { tap } from 'rxjs/operators';
// import { StrapiService } from '../../shared/services/strapi/strapi.service';
// import { AuthActions } from './auth.actions';

// export class IStrapiStateModel {
//     user: any;
//     isLoggedIn: boolean;
//     strapiProfileForm: {
//         model?: any;
//     };
//     token: string;
//     userId: string
// }
// @State<IStrapiStateModel>({
//     name: 'strapiState',
//     defaults: {
//         user: null,
//         isLoggedIn: null,
//         strapiProfileForm: {
//             model: null,
//         },
//         token: null,
//         userId: null
//     }
// })
// @Injectable()
// export class StrapiState {

//     constructor(
//         private dataService: StrapiService,
//         private store: Store,
//     ) { }

//     @Selector()
//     static getStrapiProfileForm(state: IStrapiStateModel) {
//         return state.strapiProfileForm;
//     }
//     @Selector()
//     static getUserState(state: IStrapiStateModel) {
//         return state.user;
//     }
//     @Selector()
//     static getIsLoggedIn(state: IStrapiStateModel) {
//         console.log("state", state);

//         return state.isLoggedIn;
//     }
//     @Action(AuthActions.GetUser)
//     getUser({ getState, setState }: StateContext<IStrapiStateModel>) {
//         const state = getState();
//         setState({
//             ...state,
//         });
//     }

//     @Action(AuthActions.SetUser)
//     setUser({ patchState, getState, setState }: StateContext<IStrapiStateModel>, { payload }: AuthActions.SetUser) {
//         const state = getState();
//         console.log("payload", payload);
//         if (payload?.user?.id !== null) {
//             this.dataService.loadUser(payload?.user?.id)
//                 .subscribe((result: any) => {
//                     console.log("result", result);
//                     patchState({
//                         ...state,
//                         user: result,
//                         isLoggedIn: true
//                     });
//                 });
//         };
//     }

//     @Action(AuthActions.SetUploadedUser)
//     setUploadedUser({ getState, patchState }: StateContext<IStrapiStateModel>, { payload }: AuthActions.SetUploadedUser) {
//         const state = getState();
//         console.log("payload", payload);
//         if (payload?.id !== null) {
//             this.dataService.loadUser(payload?.id)
//                 .subscribe((result: any) => {
//                     // console.log("result", result);
//                     patchState({
//                         ...state,
//                         user: result,
//                         isLoggedIn: true
//                     });
//                 });
//         };
//     }

//     @Action(AuthActions.LoadUser)
//     loadUser({ getState, patchState }: StateContext<IStrapiStateModel>, { userId }: AuthActions.LoadUser) {
//         const state = getState();
//         // console.log("payload", userId);
//         if (userId !== null) {
//             this.dataService.loadUser(userId)
//                 .subscribe((result: any) => {
//                     // console.log("result", result);
//                     patchState({
//                         ...state,
//                         user: result,
//                         isLoggedIn: true
//                     });
//                 });
//         };
//     }

//     @Action(AuthActions.SetIdToken)
//     setUserId({ patchState, getState, setState }: StateContext<IStrapiStateModel>, { userId, token }: AuthActions.SetIdToken) {
//         const state = getState();
//         console.log("payload", userId);
//         if (userId) {
//             console.log("payload", userId);
//             patchState({
//                 ...state,
//                 userId: userId,
//                 token: token,
//                 isLoggedIn: true
//             });
//         };
//     }

//     @Action(AuthActions.LogOutUser)
//     logOutUser({ getState, patchState }: StateContext<IStrapiStateModel>) {
//         const state = getState();
//         return patchState({
//             user: null,
//             strapiProfileForm: null,
//             isLoggedIn: false,
//             token: null
//         });
//     }

//     @Action(AuthActions.UpdateStrapiUser)
//     updateStrapiUser({ getState, patchState }: StateContext<IStrapiStateModel>, { userId, profileForm }: AuthActions.UpdateStrapiUser) {
//         const state = getState();
//         return this.dataService.updateStrapiUserProfile(userId, profileForm)
//             .pipe(tap((result: any) => {
//                 this.store.dispatch(new AuthActions.LoadUser(userId)).subscribe((state) => {
//                     patchState({
//                         user: state.authState.user,
//                         isLoggedIn: true
//                     });
//                 });
//             }
//             ));
//     }

//     @Action(AuthActions.PatchFormProfileFormStateWithSelectedRegion)
//     patchFormProfileFormStateWithSelectedRegion({ getState, patchState }: StateContext<IStrapiStateModel>, { selectedRegion }: AuthActions.PatchFormProfileFormStateWithSelectedRegion) {
//         const state = getState();
//         if (selectedRegion) {
//             patchState({
//                 ...state,
//                 strapiProfileForm: {
//                     model: {
//                         country_code: selectedRegion,
//                     }
//                 }
//             });
//         }
//     }
// }
