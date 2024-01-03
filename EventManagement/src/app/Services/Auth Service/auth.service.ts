import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/app/Object Models/user/user';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //rootUrl = "https://localhost:3000";
  private loggedInUserSubject = new BehaviorSubject<User>(new User(-1, "", "", "", "")); // Example with user data
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  routeFromInviteLanding = false;

  constructor(private https: HttpClient, private conf: ConfigService) { }


  setLoggedInUser(user: User) {
    this.loggedInUserSubject.next(user);
  }
  getLoggedInUser(){
    return this.loggedInUser$;
  }

  loginUser(_email: string, _pass: string): Observable<any> {
    console.log("Loggin with: ", _email, _pass)

    const data = {
      emailAddress: _email,
      password: _pass

    }


    return this.https.post<any>(this.conf.rootUrl + "/auth", data, { withCredentials: true } )
    .pipe(
      map(res => {
      console.log("HUUUULLLLLIII", res)
      this.saveToken(res.accessToken)
      this.setLoggedInUser(res.user)
    
      localStorage.setItem("user", JSON.stringify(new User(res.user.id, res.user.firstName, res.user.lastName, "", "")))
      
      return res;

    }), 
    catchError(err => {
      console.log("Error: ", err.message);
      throw err;
    })
    );

  }


  registerUser(_fname: string, _sname: string, _email: string, pass: string) {

    const data = {
      firstName: _fname,
      lastName: _sname,
      emailAddress: _email,
      password: pass
    }

    this.https.post(this.conf.rootUrl + "/register/registerNewUser", data).subscribe((res) => {
      console.log(res)
    })

  }


  saveToken(token: string): void {
    sessionStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  validateToken() {

  }

  refreshAccess() {
    console.log("I am starting off")
    this.https.get(this.conf.rootUrl + "/refresh", { withCredentials: true }).subscribe((res:any) => {
      this.saveToken(res.accessToken)
      console.log(res)
    })
  }

  getAuthHeader() {

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });

    return { headers: headers};
  }


  logout() {

  }
}
