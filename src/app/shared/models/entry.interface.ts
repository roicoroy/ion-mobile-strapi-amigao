import { Waiter } from '.';

export interface IEntry {
    id: string | any;
    date: number | any;
    tipsMade: number | any;
    waiters: Waiter[] | any;
}
