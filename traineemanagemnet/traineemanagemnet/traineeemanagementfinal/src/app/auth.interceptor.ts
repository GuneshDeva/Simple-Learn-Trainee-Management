

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const requestWithCredentials = request.clone({
      withCredentials: true
    });

    return next.handle(requestWithCredentials).pipe(

      catchError((error: HttpErrorResponse) => {

        /*
         * JWT expired / invalid
         */
        if (error.status === 401) {

          // Remove saved login information
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('user_data');

          // Go to login page
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })

    );
  }
}
