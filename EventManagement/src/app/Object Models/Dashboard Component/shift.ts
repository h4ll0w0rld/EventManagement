import { Activity } from "./activity";
import { ShiftCategory } from "./shift-category";

export class Shift {
    id: number;
    startTime: Date;
    endTime: Date;
    shift_category_id: number;
    activities: Activity[];
    shift_category: ShiftCategory;

    constructor(
        id: number,
        startTime: string,
        endTime: string,
        shift_category_id: number,
        activities: Activity[],
        shift_category: ShiftCategory
    ) {
        this.id = id;
        this.startTime = new Date(startTime);
        this.endTime = new Date(endTime);
        this.shift_category_id = shift_category_id;
        this.activities = activities;
        this.shift_category = shift_category;
    }
}