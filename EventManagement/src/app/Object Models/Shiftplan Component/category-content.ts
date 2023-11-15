import { Shift } from "./shift";

export class CategoryContent {

    id: number;
    name: string;
    description: string;
    intervall: number;
    shifts: Shift[];
    
    
    constructor(_id: number, _name: string, _description:string, _intervall:number, _shifts: Shift[]) {

        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.intervall = _intervall;
        this.shifts = _shifts;

    }
}
