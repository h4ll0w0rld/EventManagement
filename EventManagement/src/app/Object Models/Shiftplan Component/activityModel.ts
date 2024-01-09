import { User } from "../user/user";

export class Activity {

    uuid: number;
    user: User;
    status: string;



    constructor(_uuid: number, _user: User, _status: string) {

        this.uuid = _uuid;
        this.user = _user;
        this.status = _status;

    }
}
