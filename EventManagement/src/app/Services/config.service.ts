import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  rootUrl = "http://localhost:3000";
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
