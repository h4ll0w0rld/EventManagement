import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { User } from 'src/app/Object Models/user/user';
import { ConfigService } from '../../Services/config.service';

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
    private token: TokenService
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<AuthResponse>(`${this.config.rootUrl}/auth`, {
      emailAddress: email,
      password
    }, { withCredentials: true }).pipe(
      tap(res => {
        this.token.save(res.accessToken);
        this.userSubject.next(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));
      }),
      map(res => res.user)
    );
  }

  logout(): Observable<any> {
    this.token.clear();
    sessionStorage.clear();
    localStorage.clear();
    return this.http.get(`${this.config.rootUrl}/logout`);
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
