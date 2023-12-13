import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  rootUrl = "http://localhost:3000";
  // username = "nil.begann@hsfurtwangen.de";
  // passwd = "qwerty12345678";
  username = 'projektle';
  passwd = "ventit23";
  
  
  constructor(private http:HttpClient){}


  loginUser(_email:string, _pass:string){
    const data = {
      emailAdress: _email,
      password: _pass

    }
    this.http.post(this.rootUrl + "/auth", data).subscribe((res) => {
      console.log(res)

    })

  }


  registerUser(_fname:string, _name:string, _email:string, pass:string){

    const data = {
      firstName: _fname,
      lastName: _name,
      emailAddress: _email,
      password: pass
    }

    this.http.post(this.rootUrl + "/register/registerNewUser", data).subscribe((res) => {
      console.log(res)
    })

  }

  getAuthHeader() {
      let encodedCredentials = btoa(`${this.username}:${this.passwd}`);
      let headers = new HttpHeaders({
          'Authorization': 'Basic ' + encodedCredentials
      });
     
      return { headers: headers };
  }

}
