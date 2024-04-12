import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  rootUrl = "http://localhost:3000";

  
  
  constructor(private https:HttpClient){}


  loginUser(_email:string, _pass:string){
    const data = {
      emailAdress: _email,
      password: _pass

    }
    this.https.post(this.rootUrl + "/auth", data).subscribe((res) => {
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

    this.https.post(this.rootUrl + "/register/registerNewUser", data).subscribe((res) => {
      console.log(res)
    })

  }

  getAuthHeader() {
      //let encodedCredentials = btoa(`${this.username}:${this.passwd}`);
      let headers = new HttpHeaders({
          'Authorization': 'Basic ' 
      });
     
      return { headers: headers };
  }

}
