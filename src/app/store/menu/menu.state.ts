import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { UpdateMenuStatus } from './menu.actions';

export interface IMenuStateModel {
    isOpen: boolean;
}

@State<IMenuStateModel>({
    name: 'menu',
    defaults: {
        isOpen: false
    }
})
@Injectable()
export class MenuState {

    constructor(
        public store: Store
    ) { }

    @Selector()
    public static getState(state: IMenuStateModel): IMenuStateModel {
        return state;
    }

    @Selector()
    public static isOpen(state: IMenuStateModel): boolean {
        return state.isOpen;
    }

    @Action(UpdateMenuStatus)
    public updateMenuStatus(ctx: StateContext<IMenuStateModel>, action: UpdateMenuStatus): void {
        ctx.patchState({
            isOpen: action.isOpen
        });
    }
}
