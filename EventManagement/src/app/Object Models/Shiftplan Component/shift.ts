import { Activity } from "./activityModel";

export class Shift {

    id: number;
    startTime: Date;
    endTime: Date;
    activities:Activity [];
    isActive:boolean;
    
    constructor(_id:number,_startTime: number, _endTime: number, _activities: Activity [], _isActive:boolean) {

        this.id= _id;
        this.startTime = new Date(_startTime);
        this.endTime = new Date(_endTime);
        this.activities = _activities;
        this.isActive = _isActive;
    }
}
