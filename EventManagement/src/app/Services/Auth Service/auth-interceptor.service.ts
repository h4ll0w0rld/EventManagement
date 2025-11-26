import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        // ===============================
        // 🔹 HANDLE 401 (Unauthorized)
        // ===============================
        if (error.status === 401) {
          console.log("401 → Trying to refresh token...");

          return this.authService.refreshAccess().pipe(
            switchMap((res: any) => {

              console.log("New Access Token:", res.accessToken);
              this.authService.saveToken(res.accessToken);

              // 🔥 CLONE request with new token
              const updatedRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`
                }
              });

              // Retry request with new token
              return next.handle(updatedRequest);
            }),

            catchError(err => {
              console.log("Refresh failed → Logging out.");
              this.authService.delToken();
              this.router.navigate(['/authLanding']);
              return throwError(() => err);
            })
          );
        }

        // ===============================
        // 🔹 HANDLE 402 (Forbidden-like)
        // ===============================
        if (error.status === 402) {
          console.log("402 → Logging out");
          this.authService.delToken();
          this.router.navigate(['/authLanding']);
        }

        return throwError(() => error);
      })
    );
  }
}
