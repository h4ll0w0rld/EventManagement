import { User } from "../user/shiftplanModel";

export class user {

    firstName: string;
    category: string;
    startTime: number;
    endTime: number;
    
    
    
    
    constructor(_firstName: string, _category: string, _startTime: number, _endTime: number) {

        this.firstName = _firstName;
        this.category = _category;
        this.startTime = _startTime;
        this.endTime = _endTime;
       
    }
}
