import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HomePageFacade {

    // @Select(ShopState.getFullCart) shopMedusaFullCart$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(

    ) {
        // this.viewState$ = combineLatest(
        //     [
        //         // this.shopMedusaFullCart$ 
        //     ]
        // ).pipe(
        //     map(([
        //         // shopMedusaFullCart
        //     ]) => ({
        //         // shopMedusaFullCart
        //     }))
        // );
    }
}

