import { Roles } from "./roles";

export class User {

    uuid: number;
    fName: string;
    lName: string;
    email: string;
    //role: Roles
    password:string;


    constructor(_uuid: number, _fName: string, _lName: string,_email:string, _password:string) {

        this.uuid = _uuid;
        this.fName = _fName;
        this.lName = _lName;
        this.email = _email;
        this.password = _password;
       // this.role = _role;

    }

}