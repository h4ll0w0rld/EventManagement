import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  currentRoute: string = "";

  constructor(private authService:AuthService, public router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401  Unauthorized responses here
          console.log("current Route: ", this.currentRoute)
          if(localStorage.getItem("jwt")) this.authService.refreshAccess()
          else this.router.navigate(['/authLanding'])
          // Call a dedicated function or perform actions
          // Example: this.authService.logout();
          // Example: this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }


  
}
