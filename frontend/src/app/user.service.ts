import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Users } from './models/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { Urlsettings } from './urlsettings';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})



export class UserService {
  private usersUrl = Urlsettings.LOCALHOST+Urlsettings.UserUrl;
  private regUrl = this.usersUrl+Urlsettings.POSTUrl;

  constructor(private http: HttpClient) { }

  getUsers (): Observable<Users[]> {
    return this.http.get<Users[]>(this.usersUrl,)
      .pipe(
        tap(_ => console.log('fetched Users')),
        catchError(this.handleError<Users[]>('getUsers', []))
      );
  }


  addUser (user: User): Observable<User> {
    console.log("yup",user);
    return this.http.post<User>(this.regUrl, user, httpOptions).pipe(
      tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
