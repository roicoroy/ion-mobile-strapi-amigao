import { Injectable } from '@angular/core';
import { State, Selector, Store } from '@ngxs/store';

@State({
    name: 'appState',
    defaults: {
        appForm: {
            model: [],
            dirty: false,
            status: '',
            errors: {}
        }
    }
})
@Injectable()
export class AppState {
    constructor(
        private store: Store
    ) { }
    @Selector()
    static getAppForm(state: any) {
        // console.log(state);
        return state;
    }
}
