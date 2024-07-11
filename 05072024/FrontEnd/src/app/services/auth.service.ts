import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UtenteLogin } from '../dto/UtenteLogin';
import { UtenteSignup } from '../dto/UtenteSignup';
import { Observable, catchError, lastValueFrom, map, of, retry, throwError } from 'rxjs';
import { HashedPassword } from '../dto/HashedPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/";

  login(utenteLogin: UtenteLogin) {
    return this.http.post(this.url + "auth/login", utenteLogin).pipe(
      catchError(this.handleError)
    )
  }

  signup(utenteSignup: UtenteSignup) {
    return this.http.post(this.url + "auth/register", utenteSignup).pipe(
      catchError(this.handleError)
    );
  }

  isAuthenticated(): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

    return this.http.get(this.url + 'auth/isLogged', { headers, observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response.status === 200; 
      }),
      catchError((error) => {
        return of(false);  
      })
    );
  }

  verifyPassword(utenteLogin: UtenteLogin): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage['access_token'])
    headers = headers.set('Content-Type', 'application/json')
    return this.http.post<boolean>(this.url + 'auth/verify-password', JSON.stringify(utenteLogin), { headers});
  }

  hashPassword(pass: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json')
    return this.http.post<HashedPassword>(this.url + 'auth/hash-password', pass, { headers })
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
