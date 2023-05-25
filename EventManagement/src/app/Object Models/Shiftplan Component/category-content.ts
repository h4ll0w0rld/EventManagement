import { Shift } from "./shift";

export class CategoryContent {

    id: number;
    name: string;
    description: string;
    interval:number;
    shifts: Shift[];
    
    
    constructor(_id: number, _name: string, _description:string, _interval:number, _shifts: Shift[]) {

        this.id = _id;
        this.name = _name;
        this.description = _description
        this.interval = _interval;
        this.shifts = _shifts;
    }
}
