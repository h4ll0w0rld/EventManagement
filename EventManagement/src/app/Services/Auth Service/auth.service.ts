import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/app/Object Models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = "http://localhost:3000";
  private loggedInUserSubject = new BehaviorSubject<User>(new User(-1, "", "", "", "")); // Example with user data
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor(private http: HttpClient) { }


  setLoggedInUser(user: User) {
    this.loggedInUserSubject.next(user);
  }
  getLoggedInUser(){
    return this.loggedInUser$;
  }

  loginUser(_email: string, _pass: string) {
    console.log("Loggin with: ", _email, _pass)

    const data = {
      emailAddress: _email,
      password: _pass

    }


    this.http.post<any>(this.rootUrl + "/auth", data, { withCredentials: true } ).subscribe(res => {
      console.log("HUUUULLLLLIII", res)
      this.saveToken(res.accessToken)
      this.setLoggedInUser(res.user)
    
      localStorage.setItem("user", JSON.stringify(new User(res.user.id, res.user.firstName, res.user.lastName, "", "")))
      


    }, err => {
      console.log("Error: ", err.message)
    })

  }


  registerUser(_fname: string, _sname: string, _email: string, pass: string) {

    const data = {
      firstName: _fname,
      lastName: _sname,
      emailAddress: _email,
      password: pass
    }

    this.http.post(this.rootUrl + "/register/registerNewUser", data).subscribe((res) => {
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
    this.http.get(this.rootUrl + "/refresh", { withCredentials: true }).subscribe((res:any) => {
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
