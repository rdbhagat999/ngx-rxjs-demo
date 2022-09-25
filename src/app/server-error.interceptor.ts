import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (error, retryCount) => timer(retryCount * 1000),
        // delay: 2000,
        // resetOnSuccess: true,
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // refresh token
          return throwError(() => new Error('Unauthorized'));
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
