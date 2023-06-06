import { Time } from "@angular/common";
import { User } from "../user/user";

export class userActivity {

    firstName: string;
    category: string;
    startTime: Time;
    endTime: Time;




    constructor(_firstName: string, _category: string, _startTime: Time, _endTime: Time) {

        this.firstName = _firstName;
        this.category = _category;
        this.startTime = _startTime;
        this.endTime = _endTime;

    }
}
