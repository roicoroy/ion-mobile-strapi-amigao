import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map} from 'rxjs/operators';
import { AuthActions } from '../store/auth/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class HomePageFacade {

    @Select(AuthActions.GetUser) getUser$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(

    ) {
        this.viewState$ = combineLatest(
            [
                this.getUser$
            ]
        ).pipe(
            map(([
                getUser
            ]) => ({
                getUser
            }))
        );
    }
}
