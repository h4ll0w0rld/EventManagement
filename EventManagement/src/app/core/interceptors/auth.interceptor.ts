import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshQueue = new BehaviorSubject<string | null>(null);

  constructor(
    private injector: Injector,
    private token: TokenService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.get();

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error.status === 401) {
          return this.handle401(authReq, next);
        }
        if (error.status === 403) {
          this.handleForbidden();
        }
        return throwError(() => error);
      })
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshQueue.next(null);

      // 🔑 Lazy resolve — NO DI cycle
      const authService = this.injector.get(AuthService);

      return authService.refreshToken().pipe(
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
        if (!token) {
          return throwError(() => new Error('Token not refreshed'));
        }
        const newReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(newReq);
      })
    );
  }

  private handleForbidden() {
    this.token.clear();
    this.router.navigate(['/authLanding']);
  }
}
