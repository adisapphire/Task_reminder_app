import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpUserEvent, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, switchMap, finalize, filter, take } from 'rxjs/operators';

import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    // private authUrl = "http://127.0.0.1:8000/api/token/refresh"

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
 
        return next.handle(request)
          .pipe(
            catchError(err => {
              if (err instanceof HttpErrorResponse) {
                switch ((<HttpErrorResponse>err).status) {
                  case 401:
                    return this.authenticationService.refreshToken().pipe(
                        switchMap(user => {
                          if(user) {
                            // localStorage.setItem('currentUser', JSON.stringify(user));
                            return next.handle(this.addTokenToRequest(request, user.access));
                          }
               
                          return <any>this.authenticationService.logout();
                        }),
                        catchError(err => {
                          return <any>this.authenticationService.logout();
                        })
                      );
                  case 400:
                    return <any>this.authenticationService.logout();
                }
              } else {
                return throwError(err);
              }
            }));
      }

      

    private addTokenToRequest(request: HttpRequest<any>, token: string) : HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
      }

    }

    
    

    
