import { HttpHeaders } from "@angular/common/http";

export class Config {
    rootUrl = "localhost:3000";
    username = "projektle";
    passwd = "ventit23";

    constructor(){}
    getAuthHeader() {
        let encodedCredentials = btoa(`${this.username}:${this.passwd}`);
        let headers = new HttpHeaders({
            'Authorization': 'Basic ' + encodedCredentials
        });
       
        return { headers: headers };
    }
}