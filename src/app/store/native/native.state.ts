import { State } from '@ngxs/store';
import { KeyboardState } from './states/keyboard/keyboard.state';
import { Injectable } from '@angular/core';
import { SplashScreenState } from './states/splash-screen/splash-screen.state';

export const NativeStates = [
    KeyboardState,
    SplashScreenState,
];

@State({
    name: 'nativeState',
    children: NativeStates
})
@Injectable()
export class NativeStateModule {}
