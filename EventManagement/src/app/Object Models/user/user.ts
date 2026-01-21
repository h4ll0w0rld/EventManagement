import { Roles } from "./roles";

export class User {

    id: number;
    fName: string;
    lName: string;
    email: string;
    isAdmin: boolean = false;
    password:string;


    constructor(_uuid: number, _fName: string, _lName: string,_email:string, _password:string, isAdmin: boolean = false) {

        this.id = _uuid;
        this.fName = _fName;
        this.lName = _lName;
        this.email = _email;
        this.password = _password;
        if (isAdmin) {
            this.isAdmin = isAdmin;
        }

       // this.role = _role;

    }

}