import { IHours } from './hours.interface';

export class Hours implements IHours {
    id: number;
    value: number;

    constructor(hours: IHours) {
        this.id = hours.id;
        this.value = hours.value;
    }
}
