import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { User } from 'src/app/Object Models/user/user';
import { ConfigService } from '../../Services/config.service';
import { Router } from '@angular/router';

export interface AuthResponse {
  accessToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private token: TokenService,
    private router: Router,
  ) {


  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<AuthResponse>(`${this.config.rootUrl}/auth`, {
      emailAddress: email,
      password
    }, { withCredentials: true }).pipe(
      tap(res => {
        this.token.save(res.accessToken);
        this.userSubject.next(res.user);
       
        localStorage.setItem('user', JSON.stringify(res.user));

        // Invite logic (direct HTTP call)
        const token = localStorage.getItem('pendingInviteToken');
        if (token) {
          // Go back to inviteLanding with token preserved
          this.router.navigate(['/inviteLanding'], { queryParams: { token: token } });
        } else {
          this.router.navigate(['/']);
        }
        // this.router.navigate(['/']);
      }),
      map(res => res.user)
    );
  }
  registerUser(_fname: string, _sname: string, _email: string, pass: string): Observable<any> {

    const data = {
      firstName: _fname,
      lastName: _sname,
      emailAddress: _email,
      password: pass
    }

    return this.http.post(this.config.rootUrl + "/register/registerNewUser", data)
      
  }


  logout(): Observable<any> {
    this.token.clear();
    sessionStorage.clear();
    localStorage.clear();
    //this.eventHubService.clearEvents();
    return this.http.get(`${this.config.rootUrl}/logout`);
  }

  
  editUserPhone(phone: string | null): Observable<User> {
  return this.http.put<User>(
    `${this.config.rootUrl}/user/edit/user_id/${this.getUser()?.id}`,
    { phone },
    { headers: this.getAuthHeaders() }
  );
}


  refreshToken(): Observable<string> {
    return this.http.get<{ accessToken: string }>(`${this.config.rootUrl}/refresh`, { withCredentials: true })
      .pipe(
        tap(res => this.token.save(res.accessToken)),
        map(res => res.accessToken)
      );
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.token.get();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.getValue();
  }
}
