/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, map, Observable } from 'rxjs';
import { AuthActions } from 'src/app/store/auth/auth.actions';
import { AuthState } from 'src/app/store/auth/auth.state';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProfileStateModel {

}
@Injectable({
    providedIn: 'root'
})
export class ProfileFacade {
    @Select(AuthState.getUserState) userState$: Observable<any>;

    readonly viewState$: Observable<IProfileStateModel>;

    constructor(
        private store: Store
    ) {
        this.store.dispatch(new AuthActions.GetUser())
            .subscribe((res) => {
                // console.log("form", res);
            });
        this.viewState$ = combineLatest(
            [
                this.userState$
            ]
        ).pipe(
            map(([
                userState
            ]) => ({
                userState
            }))
        ) as Observable<IProfileStateModel>;;
    }
}
