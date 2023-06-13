import { Activity } from "./activityModel";

export class Shift {

    id: number;
    startTime: number;
    endTime: number;
    activities:Activity [];
    
    constructor(_id:number,_startTime: number, _endTime: number, _activities: Activity []) {

        this.id= _id;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.activities = _activities;
    }
}
