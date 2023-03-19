import { IPoint } from './point.interface';


export class Point implements IPoint {
    id?: string;
    label?: string;
    type?: string;
    value?: number;

    constructor(point: IPoint) {
        this.id = point.id;
        this.label = point.label;
        this.type = point.type;
        this.value = point.value;
    }
}
