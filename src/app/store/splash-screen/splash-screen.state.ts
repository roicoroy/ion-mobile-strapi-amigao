import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HideSplashScreen, ShowSplashScreen } from './splash-screen.actions';
import { SplashScreenService } from 'src/app/shared/services/native/splash-screen/splash-screen.service';

@State({
    name: 'splashScreen',
    defaults: {}
})
@Injectable()
export class SplashScreenState {

    constructor(
        private readonly splashScreenService: SplashScreenService
    ) {
    }

    @Action(ShowSplashScreen)
    async showSplashScreen(ctx: StateContext<unknown>, action: ShowSplashScreen): Promise<void> {
        await this.splashScreenService.show(action.options);
    }

    @Action(HideSplashScreen)
    async hideSplashScreen(): Promise<void> {
        await this.splashScreenService.hide();
    }
}
