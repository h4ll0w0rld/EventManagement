export class User {

    uuid: number;
    fName: string;
    lName: string;
    email: string


    constructor(_uuid: number, _fName: string, _lName: string) {

        this.uuid = _uuid;
        this.fName = _fName;
        this.lName = _lName;
        this.email = "blabla@hallo.de"

    }

}