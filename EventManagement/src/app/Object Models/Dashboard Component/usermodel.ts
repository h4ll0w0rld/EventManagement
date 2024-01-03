import { Time } from "@angular/common";
import { User } from "../user/user";

export class userActivity {

    firstName: string;
    category: string;
    startTime: Time;
    endTime: Time;
    categoryId:number;
    activityId:number;
    userId: number;




    constructor(_firstName: string, _category: string, _startTime: Time, _endTime: Time, _categoryId:number, _activityId: number, _userId:number) {

        this.firstName = _firstName;
        this.category = _category;
        this.startTime = _startTime;
        this.endTime = _endTime;
        this.categoryId = _categoryId;
        this.activityId = _activityId;
        this.userId = _userId;

    }
}
