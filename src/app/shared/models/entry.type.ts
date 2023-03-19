import { Waiter } from '.';
import { IEntry } from './entry.interface';

export class Entry implements IEntry {
    id: string | any;
    date: number | any;
    tipsMade: number | any;
    waiters: Waiter[];

    constructor(entry: IEntry) {
        this.id = entry.id;
        this.date = entry.date;
        this.tipsMade = entry.tipsMade;
        this.waiters = entry.waiters;
    }
}

export class EntryList {
    entryList: Entry[];
    constructor(entryList: EntryList) {
        this.entryList = entryList.entryList;
    }
}
