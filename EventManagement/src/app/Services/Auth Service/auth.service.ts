import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/app/Object Models/user/user';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //rootUrl = "https://localhost:3000";
  private loggedInUserSubject = new BehaviorSubject<User>(new User(-1, "", "", "", "")); // Example with user data
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  routeFromInviteLanding = false;

  constructor(private https: HttpClient, private conf: ConfigService, public router: Router) { }


  setLoggedInUser(user: User) {
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUser(){
    return this.loggedInUser$;
  }

  registerUser(_fname: string, _sname: string, _email: string, pass: string): Observable<any> {

    const data = {
      firstName: _fname,
      lastName: _sname,
      emailAddress: _email,
      password: pass
    }

    return this.https.post(this.conf.rootUrl + "/register/registerNewUser", data)
    .pipe(
      map((res) => {
      console.log(res)}
      )
    )
  }

  loginUser(_email: string, _pass: string): Observable<any> {

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
      //this.router.navigate(["/hub"])
      return res;

    }), 
    catchError(err => {
      console.log("Error: ", err.message);
      throw err;
    })
    );

  }

  logoutUser(): boolean {

    let status = false;

    this.https.get(this.conf.rootUrl + "/logout").subscribe((res) => {

      sessionStorage.removeItem('jwtToken');
      console.log("Erfolgreich ausgeloggt!");
      status = true;
    });

    return status;
  }

  saveToken(token: string): void {
    sessionStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwtToken');
  }

  delToken(){
    return sessionStorage.clear()
  }

  validateToken() {

  }

  refreshAccess() {
    console.log("I am starting off")
    this.https.get(this.conf.rootUrl + "/refresh", { withCredentials: true }).subscribe(
      (res: any) => {
        // Process the successful response
        this.saveToken(res.accessToken);
      
        console.log("YEAAAAA");
        console.log(res);
      },
      (error) => {
        // Handle HTTP errors (e.g., network issues)
        console.error("Error during refreshAccess:", error);
        // Check if the error status is 401
        if (error.status === 401) {
          console.log("Received 401 Unauthorized error");
          this.delToken()
          this.router.navigate(["/authLanding"])
          // Handle 401 error here if needed
        }
      }
    );
  }

  getAuthHeader() {

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.getToken()
    });

    return { headers: headers};
  }
}
