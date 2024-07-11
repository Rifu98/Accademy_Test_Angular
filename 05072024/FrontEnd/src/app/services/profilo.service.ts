import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Utente } from '../dto/Utente';
import { UtenteUpdate } from '../dto/UtenteUpdate';

@Injectable({
  providedIn: 'root'
})
export class ProfiloService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/api/";

  getProfilo(email: string): Observable<Utente> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage['access_token'])
    return this.http.get<Utente>(this.url + "utenti/" + email, { headers });
  }
  updateProfilo(utente: UtenteUpdate) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage['access_token'])
    headers = headers.set('Content-Type', 'application/json')
    return this.http.put(this.url + "utenti/update", JSON.stringify(utente), { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
