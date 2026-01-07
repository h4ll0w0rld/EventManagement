import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { EventService } from '../features/events/event.service';
import { EventModel } from 'src/app/Object Models/EventModel';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshQueue = new BehaviorSubject<string | null>(null);

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
    private eventService:EventService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.token.get();

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error.status === 401) return this.handle401(authReq, next);
        if (error.status === 403) this.handleForbidden();
        return throwError(() => error);
      })
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      this.refreshQueue.next(null);

      return this.auth.refreshToken().pipe(
        switchMap(newToken => {
          this.isRefreshing = false;
          this.refreshQueue.next(newToken);

          const newReq = req.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` }
          });

          return next.handle(newReq);
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.token.clear();
          this.router.navigate(['/authLanding']);
          return throwError(() => err);
        })
      );
    }

    return this.refreshQueue.pipe(
      switchMap(token => {
        if (!token) return throwError(() => new Error('Token not refreshed'));
        const newReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        return next.handle(newReq);
      })
    );
  }

  private handleForbidden() {
    this.token.clear();
    this.router.navigate(['/authLanding']);
  }
}

