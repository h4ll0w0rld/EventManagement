import { User } from "../user/shiftplanModel";

export class Activity {

    uuid: number;
    user: User;
    status: boolean;
    
    
    
    constructor(_uuid: number, _user: User, _status:boolean) {

        this.uuid = _uuid;
        this.user = _user;
        this.status = _status;
       
    }
}
