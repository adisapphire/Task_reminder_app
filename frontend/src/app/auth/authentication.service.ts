import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import {Urlsettings} from '../urlsettings';

@Injectable({ providedIn: 'root' })


export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private authUrl = Urlsettings.LOCALHOST+Urlsettings.AuthURL;
    private refreshurl = this.authUrl+Urlsettings.AUTHREFRESHURL;
    
    
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.authUrl}`, { username, password })
            .pipe(map(user => {
                // console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.refresh && user.access) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
  
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    

    refreshToken() : Observable<any> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.refresh;
        
        return this.http.post<any>(`${this.refreshurl}`, { 'refresh': token })
          .pipe(
            map(user => {
     
              if (user && user.access) {
                  let access = user.access;
                localStorage.setItem('currentUser', JSON.stringify({refresh:token,access}));
              }
     
              return user;
          }));
      }

    logout() {
        // remove user from local storage to log user out
        
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}