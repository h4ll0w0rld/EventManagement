import { Shift } from "./shift";

export class CategoryContent {

    uuid: number;
    name: string;
    shifts: Shift[];
    
    
    constructor(_uuid: number, _name: string, _shifts: Shift[]) {

        this.uuid = _uuid;
        this.name = _name;
        this.shifts = _shifts;
    }
}
