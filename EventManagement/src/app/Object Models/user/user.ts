export class User {
    id: number;
    fName: string;
    lName: string;
    email: string;
    phone?: string;   // 👈 optional
    isAdmin: boolean = false;
    password: string;

    constructor(
        _uuid: number,
        _fName: string,
        _lName: string,
        _email: string,
        _password: string,
        _phone?: string,
        isAdmin: boolean = false
    ) {
        this.id = _uuid;
        this.fName = _fName;
        this.lName = _lName;
        this.email = _email;
        this.password = _password;

        if (_phone !== undefined) {
            console.log("Setting phone for user", _fName, _phone);
            this.phone = _phone;
        }

        if (isAdmin) {
            this.isAdmin = isAdmin;
        }
    }
}
