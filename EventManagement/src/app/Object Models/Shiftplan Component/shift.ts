import { Activity } from "./activityModel";

export class Shift {

    startTime: number;
    endTime: number;
    activities:Activity [];
    constructor(_startTime: number, _endTime: number, _activities: Activity []) {

        this.startTime = _startTime;
        this.endTime = _endTime;
        this.activities = _activities;
    }
}
