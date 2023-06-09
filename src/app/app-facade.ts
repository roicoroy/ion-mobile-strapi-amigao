import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map} from 'rxjs/operators';
import { AuthState } from './store/auth/auth.state';

@Injectable({
    providedIn: 'root'
})
export class AppFacade {

    @Select(AuthState.getUserState) userState$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(

    ) {
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
        );
    }
}
