export class Shift {

    startTime: number;
    endTime: number;
    activities: [];
    constructor(_startTime: number, _endTime: number, _activities: []) {

        this.startTime = _startTime;
        this.endTime = _endTime;
        this.activities = _activities;
    }
}
