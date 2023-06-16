import { Activity } from "./activityModel";

export class Shift {

    id: number;
    startTime: number;
    endTime: number;
    activities:Activity [];
    isActive:boolean;
    
    constructor(_id:number,_startTime: number, _endTime: number, _activities: Activity [], _isActive:boolean) {

        this.id= _id;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.activities = _activities;
        this.isActive = _isActive;
    }
}
